import { Component } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bsdatePickerConfig: Partial<BsDatepickerConfig>
  title = 'app';
  constructor(){
    this.bsdatePickerConfig = Object.assign({},
    {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'yyyy-mm-dd',
      showWeekNumbers: false
    });
  }
}
