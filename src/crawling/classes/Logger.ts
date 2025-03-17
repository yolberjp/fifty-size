export class Logger{
    constructor (private verbose: boolean = false){}

    newLine(lines = 1){
        this.verbose && console.log("\n".repeat(lines))
    }

    info(message: string){
        this.verbose && console.log(message)
    }

    success(message: string){
        this.verbose && console.log(message)
    }

    warn(message: string){
        this.verbose && console.warn(message)
    }

    error(message: string){
        console.error(message)
    }
}