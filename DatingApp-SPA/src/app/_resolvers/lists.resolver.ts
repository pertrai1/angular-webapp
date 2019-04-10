import { Injectable } from '@angular/core'
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;
    likesParam = 'Likers';

    constructor(
        private alertify: AlertifyService,
        private router: Router,
        private userService: UserService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService
                    .getUsers(this.pageNumber, this.pageSize, null, this.likesParam)
                    .pipe(
                        catchError(_ => {
                            this.alertify.error('Problem retrieving data');
                            this.router.navigate(['/home']);
                            return of(null);
                        })
                    );
    }
}