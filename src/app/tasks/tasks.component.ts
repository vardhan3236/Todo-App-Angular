import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Task, Tasks } from '../model/task';
import { TaskList } from '../model/task-list';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  myForm: FormGroup;
  tasks: any[] = [];

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    this.myForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['Random'],
    });
  }

  ngOnInit() {
    this.getTasks();
  }
  add() {
    this.api.createTask(this.myForm).subscribe((value) => {
      if (value.success == true) this.getTasks()
    });
  }

  getTasks() {
    this.tasks = [];
    this.myForm.get('title')?.setValue('');
    this.api.getTasks().subscribe((value) => {
      value.tasks.forEach((item) => {
        this.tasks.push({ id: item._id, title: item.title, isCompleted: item.isCompleted });
      });
    });
  }

  delete(t: any) {
    this.api.deleteTask(t).subscribe((value) => {
      if (value.success == true) {
        const index = this.tasks.findIndex((value) => value.id == t.id);
        this.tasks.splice(index, 1);
      }
    });
  }

  update(t: any) {
  this.api.updateTask(t);
}
}
