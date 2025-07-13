/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Pipe, PipeTransform } from '@angular/core'
import { pathSlice } from '../utils/functions'

@Pipe({ name: 'pathSlice' })
export class PathSlice implements PipeTransform {
  transform(value: string, start = 0, end: number = undefined): string {
    return pathSlice(value, start, end)
  }
}
