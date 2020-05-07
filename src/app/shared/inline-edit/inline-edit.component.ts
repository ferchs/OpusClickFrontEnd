import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.css']
})
export class InlineEditComponent implements OnInit {

  @Input() value;
  editing:boolean;
  mText:string;
  @Output() 
  newValue: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
    this.editing=false;
    this.mText=this.value;
  }

  edit(){
    this.editing=true;
  }

  confirm(){
    this.newValue.emit(this.mText);
    this.editing=false;
  }
  cancel(){
    this.editing=false;
    this.mText=this.value;
  }

}
