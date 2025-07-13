/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Inject, Input, OnInit, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faFileArchive } from '@fortawesome/free-solid-svg-icons'
import { tarExtension, tarGzExtension } from '@sync-in-server/backend/src/applications/files/constants/compress'
import type { CompressFileDto } from '@sync-in-server/backend/src/applications/files/dto/file-operations.dto'
import { L10N_LOCALE, L10nLocale, L10nTranslateDirective, L10nTranslatePipe } from 'angular-l10n'
import { AutofocusDirective } from '../../../../common/directives/auto-focus.directive'
import { LayoutService } from '../../../../layout/layout.service'
import { FilesService } from '../../services/files.service'

@Component({
  selector: 'app-files-compression-dialog',
  templateUrl: 'files-compression-dialog.component.html',
  imports: [FaIconComponent, FormsModule, AutofocusDirective, L10nTranslateDirective, L10nTranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesCompressionDialogComponent implements OnInit {
  @Input() archiveProps: CompressFileDto = { name: '', files: [], compressInDirectory: true, extension: tarExtension }
  @Output() submitEvent = new EventEmitter()
  public disableInDirCompression = false
  protected compression = false
  protected readonly icons = { faFileArchive }
  protected submitted = false

  constructor(
    @Inject(L10N_LOCALE) protected readonly locale: L10nLocale,
    protected readonly layout: LayoutService,
    private readonly filesService: FilesService
  ) {}

  ngOnInit() {
    if (this.disableInDirCompression) {
      this.archiveProps.compressInDirectory = false
    }
  }

  @HostListener('document:keyup.enter')
  onEnter() {
    this.onSubmit()
  }

  onSubmit() {
    if (this.archiveProps.name && !this.submitted) {
      this.submitted = true
      this.filesService.compress(this.archiveProps)
      this.submitEvent.emit()
      this.layout.closeDialog()
    }
  }

  setCompression(enable: boolean) {
    this.archiveProps.extension = enable ? tarGzExtension : tarExtension
  }
}
