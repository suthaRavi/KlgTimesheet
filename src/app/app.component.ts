import { Component } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bsdatePickerConfig: Partial<BsDatepickerConfig>
  title = 'app';
  constructor(){
    setTheme('bs3');
    this.bsdatePickerConfig = Object.assign({},
    {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'yyyy-M-dd',
      showWeekNumbers: false
    });
    
  }
}
