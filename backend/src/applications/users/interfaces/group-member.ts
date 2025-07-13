/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import type { MEMBER_TYPE } from '../constants/member'
import type { Group } from '../schemas/group.interface'
import type { Member } from './member.interface'

export type GroupMember = Pick<Group, 'id' | 'name' | 'description' | 'createdAt' | 'modifiedAt'> & { type: MEMBER_TYPE; counts?: { users: number } }

export type GroupWithMembers = GroupMember & {
  members: Member[]
}
