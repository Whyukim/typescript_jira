import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type DragState = "start" | "stop" | "enter" | "leave";
type OnCloseListener = () => void;
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

// Dependency Injection 예시 export class DarkPageComponent extends BaseComponent<HTMLElement> implements SectionContainer{}
export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;

  constructor() {
    super(`<li draggable="true" class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);

    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      if (this.closeListener) this.closeListener();
    };

    this.element.addEventListener("dragstart", (event) => {
      this.onDragStart(event);
    });
    this.element.addEventListener("dragend", (event) => {
      this.onDragEnd(event);
    });

    this.element.addEventListener("dragenter", (event) => {
      this.onDragEnter(event);
    });
    this.element.addEventListener("dragleave", (event) => {
      this.onDragLeave(event);
    });
  }

  onDragStart(_: DragEvent) {
    this.notigyDragOservers("start");
  }
  onDragEnd(_: DragEvent) {
    this.notigyDragOservers("stop");
  }
  onDragEnter(_: DragEvent) {
    this.notigyDragOservers("enter");
  }
  onDragLeave(_: DragEvent) {
    this.notigyDragOservers("leave");
  }

  notigyDragOservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  addChild(child: Component) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor(private pageItemComponent: SectionContainerConstructor) {
    super('<ul class="page"></ul>');

    this.element.addEventListener("dragover", (event) => {
      this.onDragOver(event);
    });
    this.element.addEventListener("drop", (event) => {
      this.onDragDrop(event);
    });
  }

  onDragOver(_: DragEvent) {
    console.log("onOver");
  }
  onDragDrop(_: DragEvent) {
    console.log("onDrag");
  }

  addChild(section: Component) {
    const item = new this.pageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
    item.setOnDragStateListener(
      (target: SectionContainer, state: DragState) => {
        console.log(state, target);
      }
    );
  }
}
