import { Injectable } from '@angular/core';
import { Task } from './Task';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorklistService {
  #tasks: Task[] = [];
  #apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.loadTasksFromServer();
  }

  private loadTasksFromServer(): void {
    this.http.get<TaskDTO[]>(`${this.#apiUrl}/getTasks`)
      .subscribe({
        next: (tasks) => {
          this.#tasks = tasks.map(dto => this.fromDTO(dto));
          console.log('Tasks loaded:', this.#tasks);
        },
        error: (err) => console.error('Error loading tasks:', err)
      });
  }

  saveTask(task: Task): Observable<TaskDTO> {
    const dto = this.toDTO(task);
    return this.http.post<TaskDTO>(`${this.#apiUrl}/tasks`, dto).pipe(
      tap(savedTask => {
        this.#tasks.push(this.fromDTO(savedTask));
      })
    );
  }

  tasks_from_service(): Task[] {
    return [...this.#tasks];
  }

  private toDTO(task: Task): TaskDTO {
    return {
      name: task.name,
      userName: task.userName,
      date: task.date.toISOString(),
      complete: task.complete
    };
  }

  private fromDTO(dto: TaskDTO): Task {
    return new Task(
      dto.name,
      dto.userName,
      new Date(dto.date),
      dto.complete
    );
  }
}

interface TaskDTO {
  name: string;
  userName: string;
  date: string;
  complete: boolean;
}