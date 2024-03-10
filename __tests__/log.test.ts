// import Logger, { LogLevel } from '../src'
import { Logger, LogLevel } from '@/index'

describe('Logger', () => {
  let logger: Logger
  let spy: jest.SpyInstance

  beforeEach(() => {
    logger = new Logger({ level: LogLevel.DEBUG })
    spy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('logs debug messages', () => {
    const msg = 'Debug message'
    logger.debug(msg)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(`\x1b[34m[DEBUG]: \x1b[0m${msg}`))
  })

  it('logs warning messages', () => {
    const msg = 'Warning message'
    logger.warning(msg)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(`\x1b[33m[WARNING]: \x1b[0m${msg}`))
  })

  it('logs error messages', () => {
    const msg = 'Error message'
    logger.error(msg)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(`\x1b[31m[ERROR]: \x1b[0m${msg}`))
  })

  it('logs trace messages', () => {
    const msg = 'Trace message'
    logger.trace(msg)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(`\x1b[36m[TRACE]: \x1b[0m${msg}`))
  })

  it('logs fatal messages', () => {
    const msg = 'Fatal message'
    logger.fatal(msg)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining(`\x1b[35m[FATAL]: \x1b[0m${msg}`))
  })
})
