import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() link!: string;
  @Input() desc!: string;

  constructor() { }

  ngOnInit(): void {
  }

  checkUrl(url: string): string {
    return url.includes('http') ? url : '/computer_graphics' + url;
  }

}
