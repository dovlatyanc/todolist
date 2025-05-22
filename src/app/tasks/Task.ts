export class Task {
  static task_count = 0;
  #id: number;
  #name: string;
  #isComplete: boolean;
  #userName: string;
  #date: Date;

  constructor(
    name: string, 
    userName: string = "", 
    date: Date = new Date(), 
    isComplete: boolean = false
  ) {
    this.#id = Task.task_count++;
    this.#name = name;
    this.#userName = userName;
    this.#date = date;
    this.#isComplete = isComplete;
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get complete() { return this.#isComplete; }
  get userName() { return this.#userName; }
  get date() { return this.#date; }

  toggleTaskState() {
    this.#isComplete = !this.#isComplete;
  }
}