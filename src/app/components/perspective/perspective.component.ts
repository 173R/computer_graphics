import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perspective',
  templateUrl: './perspective.component.html',
  styleUrls: ['./perspective.component.scss']
})
export class PerspectiveComponent implements OnInit {

  code1 = "vec2 foo(vec2 p) return vec2(ax+by, cx+dy);\n" +
    "vec2 bar(vec2 p) return vec2(ex+fy, gx+hy);\n" +
    "[..]\n" +
    "for (each p in object) {\n" +
    "    p = foo(bar(p));\n" +
    "}"

  constructor() { }

  ngOnInit(): void {
  }

}
