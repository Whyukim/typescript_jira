import { BaseComponent } from "../../component.js";

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
            <div class="video__holder">
              <iframe class="video__thumbnail"></iframe>
            </div>
            <h3 class="video__title"></h3>
          </section>`);

    const videoElement = this.element.querySelector(
      ".video__thumbnail"
    )! as HTMLIFrameElement;
    videoElement.src = this.convertToEmbeddedURL(url);

    const titleElement = this.element.querySelector(
      ".video__title"
    )! as HTMLHeadingElement;

    titleElement.textContent = title;
  }

  private convertToEmbeddedURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
