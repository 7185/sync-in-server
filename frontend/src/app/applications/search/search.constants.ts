/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { AppMenu } from '../../layout/layout.interfaces'

export const SEARCH_PATH = {
  BASE: 'search'
} as const

export const SEARCH_TITLE = 'Search'
export const SEARCH_ICON: IconDefinition = faMagnifyingGlass

export const SEARCH_MENU: AppMenu = {
  title: SEARCH_TITLE,
  link: SEARCH_PATH.BASE,
  icon: SEARCH_ICON,
  level: 2,
  submenus: []
} as const
