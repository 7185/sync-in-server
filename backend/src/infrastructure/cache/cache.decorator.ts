/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Inject } from '@nestjs/common'
import { Cache } from './services/cache.service'

export function CacheDecorator(TTL = 120, updateCache: boolean = false) {
  // if updateCache is true, we update the value in the cache on each call
  const injector = Inject(Cache)

  return (target: any, _key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => {
    injector(target, 'cache')
    const originalMethod = descriptor.value

    const memoize = async function (...args: any[]): Promise<any> {
      try {
        const cacheKey = this.cache.genSlugKey(this.constructor.name, originalMethod.name, ...args)
        const cacheResult = await this.cache.get(cacheKey)
        if (cacheResult !== undefined) {
          if (updateCache) {
            originalMethod.apply(this, args).then((r: any) => {
              this.cache.set(cacheKey, r, TTL).catch((e: Error) => this.logger.error(`${memoize.name} - ${e}`))
            })
          }
          return cacheResult
        }
        const r: any = await originalMethod.apply(this, args)
        this.cache.set(cacheKey, r, TTL).catch((e: Error) => this.logger.error(`${memoize.name} - ${e}`))
        return r
      } catch (e) {
        console.error(e)
        return originalMethod(args)
      }
    }
    // keep the original function name
    Object.defineProperty(memoize, 'name', {
      value: originalMethod.name,
      writable: false
    })

    // assign memoize function
    descriptor.value = memoize
  }
}
