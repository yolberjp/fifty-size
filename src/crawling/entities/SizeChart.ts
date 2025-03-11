import { Category } from "./Category";
import { Size } from "./Size";

export class SizeChart {
    private sizes: Size[] = [];
    constructor(private categories: Category[]) {
    }

    setSize(size: Size){
        this.sizes.push(size);
    }

    public getSizes(){
        return this.sizes;
    }

    public getSizeSystems(){
        const sizeSystems = this.sizes.map(size => size.getSize().sizeSystem)
        return new Set(sizeSystems);  
    }

    public getSizesBySizeSystem(sizeSystem: string){
        return this.sizes.filter(size => size.getSize().sizeSystem === sizeSystem);
    }

    public getSizesJson(): {sizeSystem: string, sizes: {size: string, sizePosition: number}[]}[]{
        const sizeSystems = this.getSizeSystems();
        const sizesJson: {sizeSystem: string, sizes: {size: string, sizePosition: number}[]}[] = [];

        sizeSystems.forEach(sizeSystem => {
            const sizes = this.getSizesBySizeSystem(sizeSystem);
            sizesJson.push({
                sizeSystem: sizeSystem,
                sizes: sizes.map(size => ({
                    size: size.getSize().size,
                    sizePosition: size.getSize().sizePosition
                }))
            });
        });
        return sizesJson;
    }
}