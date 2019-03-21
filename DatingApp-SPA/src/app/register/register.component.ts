import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancel = new EventEmitter<any>();

  model: any = {};

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.model);
  }

  onCancel() {
    this.cancel.emit(false)
  }

}
