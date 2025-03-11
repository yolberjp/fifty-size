import { chromium } from "playwright";
import { Brand } from "./entities/Brand";
import { SizeChart } from "./entities/SizeChart";
import { Category } from "./entities/Category";
import { Size } from "./entities/Size";
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://sizecharts.looksize.com/brand-size-chart/';

function parseCategories(categoryHeader: string) {

    if(!categoryHeader) {
        return []
    }

    const categories = categoryHeader.split('):')[1]
    return categories.split(';').map(category => {
        const [name, gender] = category.split(')')
        return {name: name.trim(), gender: gender.trim()}
    });
}

const run = async(brandId: string) => {

    const browser = await chromium.launch({
        headless: true
    });
    const page = await browser.newPage();

    const brandUrl = `${process.env.CRAWLINGBASE_URL}${brandId}`
    await page.goto(brandUrl);

    // Name
    const title = await page.$$eval('#content', ()=>{
        return document.querySelector('h1')?.textContent;
    })
    const brandName = title ? title.replace('size guide', '').trim() : brandId.replace(/-/g, ' ').trim();

    // Size chart
    const sizeCharts = await page.$$eval('#content .block', (results)=>{
        return results.map((sizeChart) => {

            const categoryHeader = sizeChart.querySelector('.brand_type_category')?.textContent?.trim()
            const categories = categoryHeader?.split('):')[1].split(';').map(category => {
                const match = category.match(/(.*?)\((.*?)\)/);

                if(match){
                    return {name: match[1].trim(), gender: match[2].trim()}
                }

                return null
            }).filter(category => category !== null);


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

    const brand = new Brand(brandId, brandName, brandUrl);

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

    console.dir(brand, { depth: null });

    await browser.close();
}

run('ralf-ringer');


