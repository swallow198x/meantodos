import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from '../models/todo';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TodosService {

  constructor(public _http: HttpClient) {
  }

  getTodos() : Observable<Todo[]> {
    return this._http.get<Todo[]>('api/v1/todos');
  }

  addTodo(todo) {
    return this._http.post<Todo>('api/v1/todo', JSON.stringify(todo), httpOptions);
  }

  updateTodo(todo) {
    return this._http.put<Todo>('api/v1/todos/'+todo._id, JSON.stringify(todo), httpOptions);
  }

  deleteTodo(id) {
    return this._http.delete('api/v1/todo/'+id);
  }
}
