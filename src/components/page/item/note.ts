import { BaseComponent } from "../../component.js";

export class NoteComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, text: string) {
    super(`<section class="note">
            <h3 class="note__title"></h3>
            <p class="note__text"></p>
          </section>`);

    const titleElement = this.element.querySelector(
      ".note__title"
    )! as HTMLImageElement;

    titleElement.textContent = title;

    const textElement = this.element.querySelector(
      ".note__text"
    )! as HTMLParagraphElement;

    textElement.textContent = text;
  }
}
