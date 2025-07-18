/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { join } from 'node:path'
import type { Options } from 'pino-http'
import { APP_LOGS_PATH } from './config.constants'
import type { LoggerConfig } from './config.validation'

export const configLogger = (loggerConfig: LoggerConfig) =>
  ({
    level: loggerConfig.level,
    autoLogging: true,
    quietReqLogger: true,
    customProps: (req: any) => ({
      context: 'HTTP',
      user: req.user,
      userAgent: req.headers['user-agent']
    }),
    customSuccessMessage: (req: any, res: any) => {
      return `${req.method} ${req.url} (${req.protocol.toUpperCase()}/${req['httpVersion']} ${res.statusCode}) ${req.ip}`
    },
    customErrorMessage: (req: any, res: any) => {
      return `${req.method} ${req.url} (${req.protocol.toUpperCase()}/${req['httpVersion']} ${res.statusCode}) ${req.ip}`
    },
    customLogLevel: (_req, res, err) => {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn'
      } else if (res.statusCode >= 500 || err) {
        return 'error'
      }
      return 'info'
    },
    customErrorObject: (_req, _res, _error, val) => {
      // avoid logging object error for 404 status
      return val.res.statusCode === 404 ? null : val
    },
    serializers: {
      res(reply) {
        return {
          contentLength: reply.raw['_contentLength']
        }
      },
      req() {
        return undefined
      }
    },
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'hostname,context,reqId,req,res,user,userAgent,responseTime',
        hideObject: false,
        singleLine: false,
        colorize: loggerConfig.colorize,
        colorizeObjects: false,
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
        messageFormat: `[{context}]{if user} <{user}> {end} ${
          loggerConfig.colorize ? '\x1b[37m' : ''
        }{msg}{if res} ({res.contentLength} bytes in {responseTime}ms) {userAgent}{end}{if reqId} | {reqId}{end}`,
        destination: loggerConfig.stdout ? 1 : join(APP_LOGS_PATH, 'server.log'),
        mkdir: true,
        sync: false
      }
    }
  }) satisfies Options
