/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { SPACE_ALIAS } from '@sync-in-server/backend/src/applications/spaces/constants/spaces'

import type { SpaceTrash } from '@sync-in-server/backend/src/applications/spaces/interfaces/space-trash.interface'
import { getNewly } from '../../../common/utils/functions'
import { dJs } from '../../../common/utils/time'

export class TrashModel implements SpaceTrash {
  alias: string
  id: number
  mtime: number
  ctime: number
  name: string
  nb: number

  // Computed
  hTimeAgo: string

  // States
  newly = 0
  isPersonal = false

  constructor(props: SpaceTrash) {
    Object.assign(this, props)
    this.isPersonal = this.alias === SPACE_ALIAS.PERSONAL
    this.hTimeAgo = dJs(this.mtime).fromNow(true)
    this.newly = getNewly(this.mtime)
  }
}
