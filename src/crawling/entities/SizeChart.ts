import { Category } from "./Category";
import { Size } from "./Size";

export class SizeChart {
    private sizes: Size[] = [];

    constructor(private categories: Category[], private rawCategories: string, private collection?: string) {}

    setSize(size: Size){
        this.sizes.push(size);
    }
    public getCategories(){
        return this.categories;
    }

    public getRawCategories(){
        return this.rawCategories
    }

    public getCollection(){
        return this.collection
    }

    public getCanonicalCollection(){
        if(this.collection){
            return this.generateCanonical(this.collection)
        }
    }

    public getCanonicalCategories(){
        const sortedCategories = this.categories.sort((a, b) => a.getCategory().localeCompare(b.getCategory()))
        const canonicalCategories = sortedCategories.map(category => {
            return `${category.geCanonicalCategory()}:${category.geCanonicalSubCategory()}`
        })
        return canonicalCategories.join(';')
    }

    public getSizes(){
        return this.sizes;
    }

    public getSizeSystems(){
        const sizeSystems = this.sizes.map(size => size.getSizeSystem())
        return new Set(sizeSystems);  
    }

    public getSizesBySizeSystem(sizeSystem: string){
        return this.sizes.filter(size => size.getSizeSystem() === sizeSystem);
    }

    public getSizesJson(): {sizeSystem: string, sizes: {size: string, sizePosition: number}[]}[]{
        const sizeSystems = this.getSizeSystems();
        const sizesJson: {sizeSystem: string, sizes: {size: string, sizePosition: number}[]}[] = [];

        sizeSystems.forEach(sizeSystem => {
            const sizes = this.getSizesBySizeSystem(sizeSystem);
            sizesJson.push({
                sizeSystem: sizeSystem,
                sizes: sizes.map(size => ({
                    size: size.getSize(),
                    sizePosition: size.getSizePosition()
                }))
            });
        });
        return sizesJson;
    }

    private generateCanonical(string: string) {
        return string
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }
}