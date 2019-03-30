import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private alertify: AlertifyService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService
            .getUser(this.authService.decodedToken.nameid)
            .pipe(
              catchError(error => {
                this.alertify.error('Problem retrieving member');
                this.router.navigate(['/members']);
                return of(null);
              })
            );
  }
}
