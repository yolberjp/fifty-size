import { Category } from "./Category";
import { Size } from "./Size";

export class SizeChart {
    private sizes: Size[] = [];
    constructor(private categories: Category[]) {
    }

    setSize(size: Size){
        this.sizes.push(size);
    }
    public getCategories(){
        return this.categories;
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
}