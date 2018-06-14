import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatBadgeModule,
  MatTableModule,
  MatCheckboxModule

} from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatTableModule,
    MatCheckboxModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatTableModule,
    MatCheckboxModule
  ],
})
export class MaterialModule {}
