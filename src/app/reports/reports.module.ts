import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BootstrapModule } from '../bootstrap/bootstrap.module';

import { ReportsRoutingModule } from './reports-routing.module';
import { TimestudyComponent } from './timestudy/timestudy.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReportsRoutingModule,
    BootstrapModule
  ],
  declarations: [TimestudyComponent]
})
export class ReportsModule { }
