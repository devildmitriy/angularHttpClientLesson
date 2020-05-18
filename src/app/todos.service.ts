import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { delay, catchError, map, tap } from 'rxjs/operators';

export interface Todo {
  completed: boolean,
  title: string,
  id?: number
}

@Injectable({ providedIn: 'root' })
export class TodosService {

  url = 'https://jsonplaceholder.typicode.com/todos'
  constructor(private http: HttpClient) { }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo,{
      headers: new HttpHeaders({
        'myCustomHeader': 'kek'
      })
    })
  }

  fetchTodo(): Observable<Todo[]> {
    let params = new HttpParams();
    params = params.append('_limit','5');
    params = params.append('kekParams','kek');

    return this.http.get<Todo[]>(`${this.url}`,{
      params,
      observe: 'response'
    })
      .pipe(
        map((res) =>  {
         // console.log(res)
          return res.body
        }),
        delay(1000),
        catchError(error => {
          console.log(error)
          return throwError(error);
        })
        )
  }

  removeTodo(id: number): Observable<any> {
    return this.http.delete<void>(`${this.url}/${id}`,{
      observe:'events'
    }).pipe(
      tap(event => {
        console.log(event)
        if( event.type === HttpEventType.Sent){
          console.log('sent')
        }
        if(event.type ===HttpEventType.Response){
          console.log('response')
        }
      })
    )
  }

  completeTodo(id: number): Observable<Todo> {
   return this.http.put<Todo>(`${this.url}/${id}`,{completed:true}, {
     responseType: 'json'
   })
  }

}