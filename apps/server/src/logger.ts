export interface ILogger {
  trace: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  fatal: (...args: any[]) => void;
}

export class Logger implements ILogger {
  trace(...args: any[]) {
    console.log(args);
  }
  debug(...args: any[]) {
    console.log(args);
  }
  info(...args: any[]) {
    console.info(args);
  }
  warn(...args: any[]) {
    console.warn(args);
  }
  error(...args: any[]) {
    console.error(args);
  }
  fatal(...args: any[]) {
    console.error(args);
  }
}
