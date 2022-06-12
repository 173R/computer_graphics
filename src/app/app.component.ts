import { Component } from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {HighlightLoader} from "ngx-highlightjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = false;
  visible = false;
  codeResult: string = '';
  imgUrl = 'http://localhost:3000/img';
  codeInput: string = "#include \"tgaimage.h\"\n" +
    "\n" +
    "const TGAColor white = TGAColor(255, 255, 255, 255);\n" +
    "const TGAColor red   = TGAColor(255, 0, 0, 255);\n" +
    "\n" +
    "int main(int argc, char** argv) {\n" +
    " TGAImage image(100, 100, TGAImage::RGB);\n" +
    " image.set(52, 41, red);\n" +
    " image.flip_vertically();\n" +
    " image.write_tga_file(\"output.tga\");\n" +
    " return 0;\n" +
    "}"

  constructor(
    private httpClient: HttpClient,
  ) { }

  public post(): Observable<number>{

    this.loading = true;

    const subject = new Subject<number>()
    const req = new HttpRequest('POST', 'http://localhost:3000/', {code: this.codeInput}, {
      reportProgress: true,
    });

    console.log(req);
    this.httpClient.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        //const percentDone = Math.round(100 * event.loaded / event.total);
        //subject.next(percentDone);
      } else if (event instanceof HttpResponse) {
        console.log(event);
        this.codeResult = (event.body as { result: string }).result;
        this.updateImage();
        this.loading = false;
        subject.complete();
      }
    });
    return subject.asObservable();
  }

  updateImage(): void {
    this.imgUrl = 'http://localhost:3000/img?' + new Date().getTime();
  }

  onActivate(event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  switch(): void {
    this.visible = !this.visible;
  }
}
