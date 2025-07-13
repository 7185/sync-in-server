/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { APP_BASE_ROUTE } from '../../applications.constants'

export const PUBLIC_LINKS_ROUTE = {
  BASE: `${APP_BASE_ROUTE}/link`,
  LINK: 'link',
  VALIDATION: 'validation',
  ACCESS: 'access',
  AUTH: 'auth'
}

export const API_PUBLIC_LINK_VALIDATION = `${PUBLIC_LINKS_ROUTE.BASE}/${PUBLIC_LINKS_ROUTE.VALIDATION}`
export const API_PUBLIC_LINK_ACCESS = `${PUBLIC_LINKS_ROUTE.BASE}/${PUBLIC_LINKS_ROUTE.ACCESS}`
export const API_PUBLIC_LINK_AUTH = `${PUBLIC_LINKS_ROUTE.BASE}/${PUBLIC_LINKS_ROUTE.AUTH}`
