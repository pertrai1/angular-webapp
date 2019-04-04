import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public model: any = {};
  photoUrl: string;

  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photo => this.photoUrl = photo);
  }

  public login(): void {
    this.authService.login(this.model).subscribe(
      next => this.alertify.success('logged in'),
      error => this.alertify.error(error),
      () => this.router.navigate(['/members'])
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
    // return !!token; // short hand for if statement
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  loggedOut() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home'])
  }

}
