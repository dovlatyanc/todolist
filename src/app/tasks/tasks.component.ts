import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from './Task';
import { WorklistService } from './worklist.service';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  providers: [WorklistService],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedDate: Date = new Date();

  //  constructor(service: WorklistService) {
    // this.tasks = service.tasks_from_service();
    constructor(){
    this.tasks = [
    new Task('Погулять с собакой', 'User 1', new Date(2024, 0, 1)),
    new Task('Разобраться с сервером', 'User 2', new Date(2025, 0, 2)),
    new Task('Изменить резюме', 'User 1', new Date(2023, 5, 3)),
     new Task('Сделать домашку', 'User 1', new Date(2024, 5, 3)),
      new Task('Отсортировать задачи по дате', 'User 2', new Date(2025, 6, 3)),
       new Task('Сходить к врачу', 'User 2', new Date(2025, 6, 3)),
        new Task('Купить продукты', 'User 1', new Date(2025, 6, 30))
  ]
    this.filteredTasks = [...this.tasks];
  }



  getTaskStatus(task: Task): string {
    return task.complete ? 'Completed' : 'In Progress';
  }

  sortAndFilterTasks(filterDate?: Date) {
    let result = [...this.tasks];

    // Фильтрация по дате (если указана)
    if (filterDate) {
      result = result.filter(task =>
        task.date.toDateString() === filterDate.toDateString()
      );
    }
    // Сортировка по дате (от старых к новым)
    result.sort((a, b) => a.date.getTime() - b.date.getTime());

    this.filteredTasks = result;
  }
  toggleTaskState(task: Task) {
    task.toggleTaskState();
    this.sortAndFilterTasks(); // Обновляем фильтрацию после изменения состояния
  }
}