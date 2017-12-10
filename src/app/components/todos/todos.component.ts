import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo';
import { catchError, map, tap } from 'rxjs/operators';



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  addTodoText: string;
  todos: Todo[];
  constructor(private _todosService: TodosService) {

  }

  ngOnInit() {
    this.todos = [];
    this._todosService.getTodos().subscribe(todos => this.todos = todos);
  }

  addTodo(): void {
    for (let todo of this.todos) {
      if(todo.text == this.addTodoText)
      {
        return;
      }
    }

    var todo = {
      text: this.addTodoText,
      isCompleted: false
    }

    this._todosService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }

  updateStatus(todo: Todo) {
    var _todo = {
      _id : todo._id,
      text : todo.text,
      isCompleted : !todo.isCompleted
    };

    this._todosService.updateTodo(_todo).subscribe(data => {
      todo.isCompleted = !todo.isCompleted;
    });
  }

  deleteTodo(todo: Todo) {
    var todos = this.todos;
    this._todosService.deleteTodo(todo._id).subscribe(data => {
      for(var i=0; i<todos.length; i++) {
        if(todos[i]._id == todo._id) {
          todos.splice(i, 1);
        }
      }
    });
  }

  clearEditState() {
    for(var i=0; i<this.todos.length; i++) {
      this.todos[i].isEditMode = false;
    }
  }

  setEditState(todo: Todo, state) {
    this.clearEditState();
    if(state) {
      todo.isEditMode = state;
    }
    else {
      delete todo.isEditMode;
    }
  }

  updateTodoText($event, todo) {
    if($event.which == 13) {
      todo.text = $event.target.value;
      var _todo = {
        _id: todo._id,
        text : todo.text,
        isCompleted: todo.isCompleted
      };

      this._todosService.updateTodo(_todo).subscribe(todo => {
        this.setEditState(todo, false);
      });
    }
  }

}
