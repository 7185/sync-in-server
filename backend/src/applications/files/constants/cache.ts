/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

// cache task key = `ftask-$(userId}-${taskId}` => FileTask
export const CACHE_TASK_PREFIX = 'ftask'
export const CACHE_TASK_TTL = 86400 // 1 day
// cache token key = `flock|token?:${uuid}|path:${path}|ownerId?:${number}|spaceId?:${number}|...props` => FileLock
export const CACHE_LOCK_PREFIX = 'flock'
// cache only office = `office|${fileId}` => docKey
export const CACHE_ONLY_OFFICE = 'foffice'
