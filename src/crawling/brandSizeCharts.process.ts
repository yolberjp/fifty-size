import { prisma } from "@/lib/prisma"
import { Browser } from "./classes/Browser"
import { BrandCrawler } from "./classes/BrandCrawler"

/**
 * This process crawls a brand, extracts all size charts, 
 * and stores it in the database.
 */

async function init(brandId: string){

    console.log(`Initializing process for ${brandId}`)

    const browser = new Browser()

    const brand = new BrandCrawler(brandId, browser)
    await brand.init()

    const brandLogo = brand.getBrandLogoUrl()

    if(brandLogo){
        console.log(`Saving brand logo`)
        await prisma.brand.update({
            where: {
                id: brandId,
            },
            data: {
                imageUrl: brandLogo
            }
        })
    }

    const sizeCharts = await brand.getSizeCharts()
    console.log(`${sizeCharts.length} size charts founded`)

    for(const sizeChart of sizeCharts){
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

    await brand.close()
}


init('ermenegildo-zegna')