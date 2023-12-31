import { BaseComponent } from "../../component.js";

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    super(`<section class="todo">
            <h3 class="todo__title"></h3>
            <input type="checkbox" class="todo-checkbox" />
            <label for="todo-checkbox" class="todo-label"></label>
          </section>`);

    const titleElement = this.element.querySelector(
      ".todo__title"
    )! as HTMLHeadElement;

    titleElement.textContent = title;

    const todoElement = this.element.querySelector(
      ".todo-label"
    )! as HTMLInputElement;
    todoElement.textContent = todo;
  }
}
