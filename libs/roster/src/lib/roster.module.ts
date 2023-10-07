import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PageComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: PageComponent }])],
  exports: [PageComponent],
})
export class RosterModule {}
