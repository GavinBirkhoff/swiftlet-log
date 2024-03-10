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

export type LogListener = (logLevel: LogLevel, message: string) => void

export type LogMiddleware = (
  ctx: {
    message: string
    level: LogLevel
  },
  next: (message?: string, level?: LogLevel) => void
) => string
