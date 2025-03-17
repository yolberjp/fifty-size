export class Category {

    constructor(private category: string, private subCategory: string) {}

    public getCategory() {
        return this.category;
    }

    public getSubCategory() {
        return this.subCategory;
    }

    public geCanonicalCategory() {
        return this.generateCanonical(this.category);
    }

    public geCanonicalSubCategory() {
        return this.generateCanonical(this.subCategory);
    }

    private generateCanonical(string: string) {
        return string
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }

}