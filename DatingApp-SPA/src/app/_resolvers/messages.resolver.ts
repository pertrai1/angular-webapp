import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Message } from '../_models/Message';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(
        private alertify: AlertifyService,
        private authService: AuthService,
        private router: Router,
        private userService: UserService

    ) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer)
            .pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving messages');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
    }
}