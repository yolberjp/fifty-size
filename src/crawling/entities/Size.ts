export class Size {
    constructor(private sizeSystem: string, private size: string, private sizePosition: number) {
    }

    public getSize(){
        return {
            sizeSystem: this.sizeSystem,
            size: this.size,
            sizePosition: this.sizePosition
        }
    }
}