import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbSidebarModule } from '@nebular/theme';

@NgModule({
  exports: [NbCardModule, NbButtonModule, NbSidebarModule],
  imports: [CommonModule],
})
export class NebularModule {}
