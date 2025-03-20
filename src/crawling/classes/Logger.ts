export class Logger {
  constructor(private verbose: boolean = false) {}

  newLine(lines = 1) {
    if (this.verbose) {
      console.log('\n'.repeat(lines));
    }
  }

  info(message: string) {
    if (this.verbose) {
      console.log(message);
    }
  }

  success(message: string) {
    if (this.verbose) {
      console.log(message);
    }
  }

  warn(message: string) {
    if (this.verbose) {
      console.warn(message);
    }
  }

  error(message: string) {
    console.error(message);
  }
}
