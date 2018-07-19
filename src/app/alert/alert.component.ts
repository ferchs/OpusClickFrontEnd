import { Input,Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit{

  @Input() dismissible:boolean;
  @Input() type:string;
  @Input() message:string;
  @Input() staticAlertClosed:boolean;
  @Output()
  staticAlertClosedChange = new EventEmitter<boolean>()

  ngOnInit() {
    this.dismissible=true;
    this.type=null;
    this.message=null;
  }

  closeAlert(){
    this.staticAlertClosedChange.emit(true);
  }
}
