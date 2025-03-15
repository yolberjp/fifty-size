import dotenv from 'dotenv';
import { chromium } from "playwright";
import { Brand } from "./entities/Brand";
import { SizeChart } from "./entities/SizeChart";
import { Category } from "./entities/Category";
import { Size } from "./entities/Size";
import { prisma } from '@/lib/prisma';
import brands from './brands.json';

dotenv.config();

const getBrandSizeCharts = async(brandId: string) => {

    const browser = await chromium.launch({
        headless: true
    });
    const page = await browser.newPage();

    const brandUrl = `${process.env.CRAWLING_BASE_URL}/brand-size-chart/${brandId}`
    await page.goto(brandUrl);

    // Brand Name
    const title = await page.$$eval('#content', ()=>{
        return document.querySelector('h1')?.textContent;
    })
    const brandName = title ? title.replace('size guide', '').trim() : brandId.replace(/-/g, ' ').trim();

    // Brand image
    const imageUrl = await page.$$eval('#content ', ()=>{
        return document.querySelector('img')?.src;
    })


    // Size charts
    const sizeCharts = await page.$$eval('#content .block', (results)=>{
        return results.map((sizeChart) => {

            // Categories
            const categoryHeader = sizeChart.querySelector('.brand_type_category')?.textContent?.trim()
            const categories = categoryHeader?.split('):')[1].split(';').map(category => {
                const match = category.match(/(.*?)\((.*?)\)/);

                if(match){
                    return {name: match[1].trim(), gender: match[2].trim()}
                }

                return null
            }).filter(category => category !== null) || [];


            // Sizes
            const sizes: {sizeSystem: string, sizeValues: string[]}[] = []
            sizeChart.querySelectorAll('table.table tbody tr').forEach((row) => {
                const sizeSystem = row.querySelector('th')?.textContent?.trim() || 'Unknown'
                const sizeValues: string[] = []

                row.querySelectorAll('td').forEach((td) => {
                    const size = td.textContent?.trim()
                    if(size){
                        sizeValues.push(size)
                    }
                })

                sizes.push({sizeSystem, sizeValues})
            })


            return {
                categories,
                sizes
            }
            
        });
    })

    await browser.close();

    const brand = new Brand(brandId, brandName, brandUrl);
    if(imageUrl){
        brand.setImageUrl(imageUrl);
    }

    sizeCharts.forEach((chart)=>{
        const categories = chart?.categories?.map(category => new Category(category.name, category.gender));
        const sizeChart = new SizeChart(categories || []);

        chart?.sizes?.forEach(size => {
            size.sizeValues.forEach((sizeValue, index)=>{
                sizeChart.setSize(new Size(size.sizeSystem, sizeValue, index));
            })
            
        })
        brand.setSizeChart(sizeChart);
    })

    return brand;
}


const processBrand = async(id: string) => {

    console.log(`Processing brand: [${id}]`);

    const brand = await getBrandSizeCharts(id);
    const brandId = brand.getId();

    console.log(`Brand crawled successfully`);

    // Save brand
    await prisma.brand.create({
        data: {
            id: brandId,
            name: brand.getName(),
            url: brand.getUrl(),
            imageUrl: brand.getImageUrl()
        }
    });

    for (const sizeChart of brand.getSizeCharts()) {

        // Save size chart
        const createdSizeChart = await prisma.sizeChart.create({
            data: {
                brandId: brandId
            }
        });
    
        const sizeChartId = createdSizeChart.id;

        // Save categories
        const categories = sizeChart.getCategories().map(category => ({
            name: category.getName(),
            gender: category.getGender(),
            sizeChartId: sizeChartId
        }));
    
        if (categories.length > 0) {
            await prisma.category.createMany({
                data: categories
            });
        }

        // Save sizes
        const sizes = sizeChart.getSizes().map(size => ({
            sizeSystem: size.getSizeSystem(),
            size: size.getSize(),
            sizePosition: size.getSizePosition(),
            sizeChartId: sizeChartId
        }));

        if (sizes.length > 0) {
            await prisma.size.createMany({
                data: sizes
            });
        }
    }

    console.log(`Brand saved in DB\n\n`);
}

const init = async () => {
    const brandsToProcess = brands.d;
    for (const brandId of brandsToProcess) {
        console.log(`(${brandsToProcess.indexOf(brandId) + 1} of ${brandsToProcess.length})`)

        await processBrand(brandId);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

// init();
