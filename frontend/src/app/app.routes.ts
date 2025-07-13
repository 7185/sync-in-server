/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Routes } from '@angular/router'
import { APP_PATH } from './app.constants'
import { adminRoutes } from './applications/admin/admin.routes'
import { linksRoutes } from './applications/links/links.routes'
import { RECENTS_PATH } from './applications/recents/recents.constants'
import { recentsRoutes } from './applications/recents/recents.routes'
import { searchRoutes } from './applications/search/search.routes'
import { spacesRoutes } from './applications/spaces/spaces.routes'
import { syncRoutes } from './applications/sync/sync.routes'
import { userRoutes } from './applications/users/user.routes'
import { authGuard } from './auth/auth.guards'
import { authRoutes } from './auth/auth.routes'
import { LayoutComponent } from './layout/layout.component'

export const routes: Routes = [
  {
    path: APP_PATH.BASE,
    component: LayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [...recentsRoutes, ...searchRoutes, ...spacesRoutes, ...userRoutes, ...syncRoutes, ...adminRoutes]
  },
  ...authRoutes,
  ...linksRoutes,
  { path: '**', redirectTo: RECENTS_PATH.BASE }
]
