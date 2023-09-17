import { BaseComponent } from "../../component.js";

export class VideoComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, url: string) {
        super(`<section class="video">
            <div class="video__player"><iframe class="video__iframe"></iframe></div>
            <h3 class="page-item__title video__title"></h3>
        </section>`);

        const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
        iframe.src = this.convertToEmbeddedURL(url); // url -> videoId만 추출

        const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;
        titleElement.textContent = title;
    }

    // 아래와 같이 다양한 형태의 URL을 받았을 때 ID를 추출해서 embed형 URL을 만든다.
    // input
    // https://youtu.be/7MnwDJvaDGE // 동영상 URL
    // https://www.youtube.com/embed/7MnwDJvaDGE // 임베드 코드
    // output
    // https://www.youtube.com/embed/7MnwDJvaDGE // 임베드 코드
    // 정규표현식 Regex 사용
    private convertToEmbeddedURL(url: string): string {
        const regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
        const match = url.match(regExp);
        
        const videoId = match ? match[5] || match[6] : undefined;
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}

// <iframe 
//     width="894" 
//     height="503" 
//     src="https://www.youtube.com/embed/7MnwDJvaDGE" 
//     title="홍구 : 내 앞머리(?)... 아니 내 앞마당 어디갔어!!?" 
//     frameborder="0" 
//     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//     allowfullscreen>
// </iframe>