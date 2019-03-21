import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public model: any = {};

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  public login(): void {
    this.authService.login(this.model).subscribe(
      next => console.log('logged in'),
      error => console.log('Failed to login')
    )
  }

  loggedIn() {
    // need a local name to bind the localstorage to
    const token = localStorage.getItem('token'); // this will either return a token or not
    return !!token; // short hand for if statement
  }

  loggedOut() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
