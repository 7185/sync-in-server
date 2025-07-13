/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {
  transform(items: any[], page: number = 1, itemsPerPage: number): any[] {
    if (!items?.length) {
      return []
    }
    const start = (page - 1) * itemsPerPage
    return items.slice(start, start + itemsPerPage)
  }
}
