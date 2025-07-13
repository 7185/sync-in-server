/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { FastifyAuthenticatedRequest } from '../../../authentication/interfaces/auth-request.interface'
import { SpaceEnv } from '../../spaces/models/space-env.model'
import { DEPTH, LOCK_SCOPE, PROPSTAT } from '../constants/webdav'
import { IfHeader } from './if-header.interface'

export interface WebDAVContext {
  url: string
  body?: any // xml content
  httpVersion?: string
  ifHeaders?: IfHeader[]
  depth?: DEPTH | string
  propfindMode?: PROPSTAT
  lock?: { timeout?: number; lockscope?: LOCK_SCOPE; owner?: any; token?: string }
  proppatch?: { props: Record<string, string>; errors: any[] }
  copyMove?: { overwrite: boolean; destination: string; isMove: boolean }
}

export interface WebDAVLock {
  // webdav uri (null if used with OnlyOffice)
  lockroot: string
  locktoken: string
  lockscope: LOCK_SCOPE
  // owner extra info provided during lock creation
  owner: string
  // locktype: 'write' => already handled by default
}

export interface FastifyDAVRequest extends FastifyAuthenticatedRequest {
  body: any
  dav?: WebDAVContext
  space?: SpaceEnv
}
