import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept',req)

    const cloned = req.clone({
      headers: req.headers.append('auth','authKek')
    })

    return next.handle(cloned).pipe(
      tap(event => {
        if(event.type ===HttpEventType.Sent){
          console.log('inSents')
        }
      })
    );
  }

}