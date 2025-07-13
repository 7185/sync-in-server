/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { createMock, DeepMocked } from '@golevelup/ts-jest'
import { ExecutionContext, HttpException, Logger } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { USER_PERMISSION, USER_ROLE } from '../constants/user'
import { UserHavePermission } from '../decorators/permissions.decorator'
import { UserModel } from '../models/user.model'
import { generateUserTest } from '../utils/test'
import { UserPermissionsGuard } from './permissions.guard'

describe(UserPermissionsGuard.name, () => {
  let reflector: Reflector
  let permissionsGuard: UserPermissionsGuard
  let userTest: UserModel
  let context: DeepMocked<ExecutionContext>

  beforeAll(async () => {
    reflector = new Reflector()
    permissionsGuard = new UserPermissionsGuard(reflector)
    userTest = new UserModel(generateUserTest())
    Logger.overrideLogger(['fatal'])
  })

  it('should be defined', () => {
    expect(permissionsGuard).toBeDefined()
    expect(userTest).toBeDefined()
  })

  it('should pass with a valid permission', async () => {
    userTest.applications = [USER_PERMISSION.PERSONAL_SPACE]
    context = createMock<ExecutionContext>()
    UserHavePermission(USER_PERMISSION.PERSONAL_SPACE)(context.getHandler())
    context.switchToHttp().getRequest.mockReturnValue({
      user: userTest
    })
    expect(permissionsGuard.canActivate(context)).toBe(true)
  })

  it('should pass if any of the permissions are granted', async () => {
    userTest.applications = [USER_PERMISSION.PERSONAL_SPACE]
    context = createMock<ExecutionContext>()
    UserHavePermission([USER_PERMISSION.SPACES, USER_PERMISSION.PERSONAL_SPACE])(context.getHandler())
    context.switchToHttp().getRequest.mockReturnValue({
      user: userTest
    })
    expect(permissionsGuard.canActivate(context)).toBe(true)
  })

  it('should not pass with a bad permission', async () => {
    userTest.applications = []
    context = createMock<ExecutionContext>()
    UserHavePermission(USER_PERMISSION.PERSONAL_SPACE)(context.getHandler())
    context.switchToHttp().getRequest.mockReturnValue({
      user: userTest
    })
    expect(() => permissionsGuard.canActivate(context)).toThrow(HttpException)
  })

  it('should pass with no permissions but with the admin role', async () => {
    userTest.applications = []
    userTest.role = USER_ROLE.ADMINISTRATOR
    context = createMock<ExecutionContext>()
    UserHavePermission(USER_PERMISSION.PERSONAL_SPACE)(context.getHandler())
    context.switchToHttp().getRequest.mockReturnValue({
      user: userTest
    })
    expect(permissionsGuard.canActivate(context)).toBe(true)
    // reset
    userTest.role = USER_ROLE.USER
  })

  it('should not pass with a missing decorator', async () => {
    userTest.applications = [USER_PERMISSION.PERSONAL_SPACE]
    context = createMock<ExecutionContext>()
    context.switchToHttp().getRequest.mockReturnValue({
      user: userTest
    })
    expect(permissionsGuard.canActivate(context)).toBeFalsy()
  })

  it('should pass with an empty decorator', async () => {
    userTest.applications = [USER_PERMISSION.PERSONAL_SPACE]
    context = createMock<ExecutionContext>()
    UserHavePermission()(context.getHandler())
    context.switchToHttp().getRequest.mockReturnValue({
      user: userTest
    })
    expect(permissionsGuard.canActivate(context)).toBeTruthy()
  })
})
