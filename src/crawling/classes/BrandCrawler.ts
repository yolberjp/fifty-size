import { Category } from "../entities/Category";
import { Size } from "../entities/Size";
import { SizeChart } from "../entities/SizeChart";
import { Browser } from "./Browser";

export class BrandCrawler {
    private brandLogoUrl: string | undefined
    private brandSizeCharts: SizeChart[] = []
    
     constructor(private id: string, private browser: Browser){}

     async init(){
        await this.browser.init()
        await this.browser.page.goto(this.getUrl())
        await this.setBrandLogoUrl()
        await this.setBrandSizeCharts()
    }

    async close(){
        await this.browser.close()
    }

    getUrl(){
        return `${process.env.CRAWLING_BASE_URL}/brand-size-chart/${this.id}`
    }

    async setBrandLogoUrl(){
        const logoUrl = await this.browser.page.$$eval('#content', ()=>{
            return document.querySelector('img.brand_img')?.getAttribute('src');
        })
        if(logoUrl) {
            this.brandLogoUrl = logoUrl
        }
    }

    getBrandLogoUrl(){
        return this.brandLogoUrl
    }

    async setBrandSizeCharts(){

        const sizeCharts = await this.browser.page.$$eval('#content .block', (results)=>{
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

        sizeCharts.forEach((chart)=>{
            const categories = chart?.categories?.map(category => new Category(category.name, category.gender));
            const sizeChart = new SizeChart(categories || []);
    
            chart?.sizes?.forEach(size => {
                size.sizeValues.forEach((sizeValue, index)=>{
                    sizeChart.setSize(new Size(size.sizeSystem, sizeValue, index));
                })
                
            })
            this.brandSizeCharts.push(sizeChart);
        })

    }

    async getSizeCharts(){
        return this.brandSizeCharts
    }

}