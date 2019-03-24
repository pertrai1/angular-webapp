import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancel = new EventEmitter<any>();

  model: any = {};

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register() {
    this.authService
      .register(this.model)
      .subscribe(
        () => this.alertify.success('registration successful'),
        error => this.alertify.error(error)
      );
  }

  onCancel() {
    this.cancel.emit(false)
  }

}
