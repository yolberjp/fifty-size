export class Size {
  constructor(
    private sizeSystem: string,
    private size: string,
    private sizePosition: number,
  ) {}

  public getSize() {
    return this.size;
  }

  public getSizeSystem() {
    return this.sizeSystem;
  }

  public getSizePosition() {
    return this.sizePosition;
  }
}
