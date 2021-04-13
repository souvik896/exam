import { Injectable } from '@angular/core';
import{HttpClient,HttpErrorResponse} from '@angular/common/http'
import{Observable,throwError} from 'rxjs';
import{catchError} from 'rxjs/operators';
import{Formclass} from './formclass';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
api_url="https://jsonplaceholder.typicode.com/users";
  constructor(private http:HttpClient) { }
  getData(data):Observable<Formclass[]>
  {
   return this.http.post<Formclass[]>(this.api_url,data).pipe(catchError(this.errorHandler))
  }
  errorHandler(error:HttpErrorResponse)
  {
      return throwError(error)
  }
}
