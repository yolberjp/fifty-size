export class Category {
    constructor(private name: string, private gender: string) { }

    public getName() {
        return this.name;
    }

    public getGender() {
        return this.gender;
    }
}