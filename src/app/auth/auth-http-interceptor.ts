import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEventType
} from "@angular/common/http";
import { tap, filter } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Modify or log the outgoing request
        const modifiedReq = req.clone({
            withCredentials: true,
        });

        return next.handle(modifiedReq);
        // .pipe(
        //     filter(val => val.type === HttpEventType.Sent),
        //     tap(val => {
        //         if (val.type === HttpEventType.Sent) {
        //             console.log('Sent the request');
        //         }
        //     })
        // );
    }
}
