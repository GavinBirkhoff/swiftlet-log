export enum LogLevel {
  DEBUG,
  INFO,
  WARNING,
  ERROR,
  TRACE,
  FATAL
}

export interface LogOptions {
  level?: LogLevel
  timestamp?: boolean
}

type LogListener = (logLevel: LogLevel, message: string) => void

class Logger {
  private logLevel: LogLevel
  private timestampEnabled: boolean
  private logListeners: LogListener[] = []

  constructor(options: LogOptions = {}) {
    this.logLevel = options.level || LogLevel.DEBUG
    this.timestampEnabled = options.timestamp || false
  }

  private getCurrentTimestamp(): string {
    return new Date().toISOString()
  }

  private log(message: string, level: LogLevel): void {
    if (level >= this.logLevel) {
      const logColor = this.getColor(level)
      const timestampStr = this.timestampEnabled ? `\x1b[90m[${this.getCurrentTimestamp()}] \x1b[0m` : ''
      const levelStr = `${logColor}[${LogLevel[level]}]: \x1b[0m`
      console.log(`${timestampStr}${levelStr}${message}`)
      this.logListeners.forEach((listener) => listener(level, message))
    }
  }

  private getColor(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return '\x1b[34m' // Blue color
      case LogLevel.INFO:
        return '\x1b[32m' // Green color
      case LogLevel.WARNING:
        return '\x1b[33m' // Yellow color
      case LogLevel.ERROR:
        return '\x1b[31m' // Red color
      case LogLevel.TRACE:
        return '\x1b[36m' // Cyan color
      case LogLevel.FATAL:
        return '\x1b[35m' // Purple color
      default:
        return '\x1b[0m' // Default color
    }
  }

  debug(message: string): void {
    this.log(message, LogLevel.DEBUG)
  }

  info(message: string): void {
    this.log(message, LogLevel.INFO)
  }

  warning(message: string): void {
    this.log(message, LogLevel.WARNING)
  }

  error(message: string): void {
    this.log(message, LogLevel.ERROR)
  }

  trace(message: string): void {
    this.log(message, LogLevel.TRACE)
  }

  fatal(message: string): void {
    this.log(message, LogLevel.FATAL)
  }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level
  }

  enableTimestamp(): void {
    this.timestampEnabled = true
  }

  disableTimestamp(): void {
    this.timestampEnabled = false
  }

  addLogListener(listener: LogListener): void {
    this.logListeners.push(listener)
  }

  removeLogListener(listener: LogListener): void {
    this.logListeners = this.logListeners.filter((l) => l !== listener)
  }
}

export default Logger
