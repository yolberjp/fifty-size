import { SizeChart } from "./SizeChart";

export class Brand {
    private sizeCharts: SizeChart[] = []

    constructor(private id: string, private name:string, private url: string) {
    }

    public getName(){
        return this.name;
    }

    setSizeChart(sizeChart: SizeChart){
        this.sizeCharts.push(sizeChart);
    }

    getSizeCharts(){
        return this.sizeCharts;
    }
}