import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbIconModule,
  NbListModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbTabsetModule,
  NbUserModule,
} from '@nebular/theme';

@NgModule({
  exports: [
    NbCardModule,
    NbButtonModule,
    NbSidebarModule,
    NbAccordionModule,
    NbButtonModule,
    NbUserModule,
    NbIconModule,
    NbActionsModule,
    NbSearchModule,
    NbActionsModule,
    NbCardModule,
    NbListModule,
    NbChatModule,
    NbSelectModule,
    NbTabsetModule,
  ],
  imports: [CommonModule],
})
export class NebularModule {}
