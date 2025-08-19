/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Params, RouterLink } from '@angular/router'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faKey, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { L10N_LOCALE, L10nLocale, L10nTranslateDirective, L10nTranslatePipe } from 'angular-l10n'
import { linkProtected, logoUrl } from '../../../files/files.constants'
import { LinksService } from '../../services/links.service'

@Component({
  selector: 'app-public-link-auth',
  imports: [RouterLink, FormsModule, FaIconComponent, L10nTranslatePipe, L10nTranslateDirective],
  templateUrl: 'public-link-auth.component.html'
})
export class PublicLinkAuthComponent {
  protected readonly locale = inject<L10nLocale>(L10N_LOCALE)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly linksService = inject(LinksService)
  protected readonly logoUrl = logoUrl
  protected readonly linkProtected = linkProtected
  protected readonly icons = { faKey, faSignInAlt }
  private uuid: string
  protected password = ''

  constructor() {
    this.activatedRoute.params.subscribe((p: Params) => (this.uuid = p.uuid))
  }

  validPassword() {
    if (this.password) {
      this.linksService.linkAuthentication(this.uuid, this.password).subscribe(() => (this.password = ''))
    }
  }
}
