import { BusyService } from './../Services/busy.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
@Injectable()

export class loadingInterceptor implements HttpInterceptor{
    constructor(private BusyService :BusyService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.url.includes('emailexists')) {
            return next.handle(req);
        }
      if(req.method === 'GET'){
            this.BusyService.busy();
       }  
            return next.handle(req).pipe(
                  finalize(() =>{
                        this.BusyService.delay();
                  }) )
      }}