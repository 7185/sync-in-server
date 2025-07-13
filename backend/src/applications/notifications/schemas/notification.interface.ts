/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { NotificationContent } from '../interfaces/notification-properties.interface'
import { notifications } from './notifications.schema'

type NotificationSchema = typeof notifications.$inferSelect

export class Notification implements NotificationSchema {
  id: number
  toUserId: number
  fromUserId: number
  content: NotificationContent
  wasRead: boolean
  createdAt: Date
}
