import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators'
import { Todo, TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'first';

  todos: Todo[] = [];
  loading = false;
  todoTitle = '';
  error = '';

  constructor(private todosService: TodosService) {

  }


  ngOnInit(): void {
    this.fetchTodos()
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return
    }
    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false
    };

    this.todosService.addTodo(newTodo)
      .subscribe((res) => {
        console.log(res)
        this.todos.push(res)
        this.todoTitle = '';
      })

  }

  fetchTodos() {
    this.loading = true;
    this.todosService.fetchTodo()
      .subscribe((res) => {
        this.loading = false;
        this.todos = res
      },
      (err) => {
        console.log(err)
        this.error = err;
      })
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id)
      .subscribe(res => this.todos = this.todos.filter(item => item.id !== id))
  }

  completeTodo(id:number) {
    this.todosService.completeTodo(id)
    .subscribe(res => {
      // this.todos.map(item => {
      //   if (item.id ===res.id){
      //     item.completed = res.completed
      //   } 
      // })
      this.todos.find(item => item.id ===res.id).completed = res.completed
    })
  }

}
