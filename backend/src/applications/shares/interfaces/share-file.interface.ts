/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { FileSpace } from '../../files/interfaces/file-space.interface'
import type { Share } from '../schemas/share.interface'

export class ShareFile implements Pick<Share, 'id' | 'name' | 'description' | 'alias' | 'createdAt' | 'modifiedAt'> {
  id: number
  name: string
  alias: string
  externalPath: boolean
  description: string
  enabled: boolean
  createdAt: Date
  modifiedAt: Date
  parent: Pick<Share, 'id' | 'alias' | 'name'>
  file: FileSpace
  hasComments: boolean
  counts: { users: number; groups: number; links: number; shares: number }
  syncs: { clientId: string; clientName: string; id: number }[] = []
}
