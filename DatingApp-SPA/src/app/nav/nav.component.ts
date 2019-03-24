import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public model: any = {};

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  public login(): void {
    this.authService.login(this.model).subscribe(
      next => this.alertify.success('logged in'),
      error => this.alertify.error(error)
    )
  }

  loggedIn() {
    return this.authService.loggedIn();
    // return !!token; // short hand for if statement
  }

  loggedOut() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }

}
