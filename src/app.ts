import { Component } from "./components/component.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponent } from "./components/page/page.js";

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      "helloworld",
      "https://picsum.photos/600/300"
    );
    this.page.addChild(image);

    const video = new VideoComponent(
      "helloworld",
      "https://www.youtube.com/watch?v=t3M6toIflyQ"
    );
    this.page.addChild(video);

    const note = new NoteComponent("title", "tex?t");
    this.page.addChild(note);

    const todo = new TodoComponent("title", "hello");
    this.page.addChild(todo);
  }
}

new App(document.querySelector(".document")! as HTMLElement);
