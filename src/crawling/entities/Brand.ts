import { SizeChart } from './SizeChart';

export class Brand {
  private imageUrl: string | null = null;
  private sizeCharts: SizeChart[] = [];

  constructor(
    private id: string,
    private name: string,
    private url: string,
  ) {}

  public setImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

  public getImageUrl() {
    return this.imageUrl;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getUrl() {
    return this.url;
  }

  setSizeChart(sizeChart: SizeChart) {
    this.sizeCharts.push(sizeChart);
  }

  getSizeCharts() {
    return this.sizeCharts;
  }
}
