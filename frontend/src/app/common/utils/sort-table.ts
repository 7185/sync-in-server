/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { sortCollectionByType, sortType } from './sort'

interface SortParam {
  column: string
  asc: boolean
}

type SortProps = { prop: string; type: sortType }[]
export type SortSettings = Record<string, SortProps>

export class SortTable {
  private _sortParam: SortParam
  private defaultId = 'default'
  protected keyStore: string
  protected sortSettings: SortSettings

  constructor(keyStore: string, sortSettings: SortSettings) {
    this.keyStore = `sortBy${keyStore}`
    this.sortSettings = sortSettings
    this._sortParam = this.sort
  }

  get sortParam(): SortParam {
    return this._sortParam || this.sort
  }

  get sort(): SortParam {
    const sort = localStorage.getItem(this.keyStore)
    return sort ? JSON.parse(sort) : { column: this.defaultId, asc: false }
  }

  set sort(sortParam: SortParam) {
    this._sortParam = sortParam
    localStorage.setItem(this.keyStore, JSON.stringify(sortParam))
  }

  sortBy<T>(id: string, toUpdate = true, collection: T[]): T[] {
    if (!(id in this.sortSettings)) {
      return collection
    }
    if (toUpdate) {
      if (this.sortParam.asc) {
        this.sortParam.column = this.defaultId
        this.sortParam.asc = false
        id = this.defaultId
      } else {
        if (this.sortParam.column === id) {
          this.sortParam.asc = !this.sortParam.asc
        } else {
          this.sortParam.column = id
          this.sortParam.asc = false
        }
      }
      this.sort = this.sortParam
    }
    for (const sortProp of this.sortSettings[id]) {
      sortCollectionByType(sortProp.type, collection, sortProp.prop, id === this.defaultId ? false : this.sortParam.asc)
    }
    return [...collection]
  }
}
