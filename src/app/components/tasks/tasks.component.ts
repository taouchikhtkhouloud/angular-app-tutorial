import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';
import {enableProdMode} from '@angular/core';

enableProdMode();
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  tasks: Task[] = [];
  constructor(private taskServcie: TaskService){}
  ngOnInit(): void {
   this.taskServcie.getTasks().subscribe((tasks) => this.tasks=tasks)
  }

  deleteTask(task: Task){
    this.taskServcie.deleteTask(task).subscribe(() => this.tasks=this.tasks.filter(t=>t.id !== task.id))

  }
  toggleReminder(task: Task){
    task.reminder= !task.reminder;
    this.taskServcie.updateTaskReminder(task).subscribe()
    console.log(task.reminder)
  };
  addTask(task: Task){
    this.taskServcie.addTask(task).subscribe((task) => (this.tasks.push(task)))

    console.log(task)

  }
}
