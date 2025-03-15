import { prisma } from "@/lib/prisma"
import { BrandLettersCrawler } from "./classes/BrandLettersCrawler"
import { Browser } from "./classes/Browser"

/**
 * This process crawls all brands, extracts their basic information, 
 * and stores it in the database.
 */

async function init(){

    const browser = new Browser()

    const brandLetters = new BrandLettersCrawler(browser)
    await brandLetters.init()

    const letters = brandLetters.getLetters()

    for(const {letter, href} of letters){
        const brands = await brandLetters.getBrandsFromLetter({letter, href})

        console.log(`Found ${brands.length} brands for ${letter}`)

        for(const brand of brands){
            console.log(`Saving ${brand.name} in DB`)
            await prisma.brand.upsert({
                where: {
                    id: brand.id
                },
                update: {
                    name: brand.name,
                    url: brand.url,
                    updatedAt: new Date()
                },
                create: {
                    id: brand.id,
                    name: brand.name,
                    url: brand.url
                }
            });
        }
    }

    await brandLetters.close()
}


init()