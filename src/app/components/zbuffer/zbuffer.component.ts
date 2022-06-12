import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zbuffer',
  templateUrl: './zbuffer.component.html',
  styleUrls: ['./zbuffer.component.scss']
})
export class ZbufferComponent implements OnInit {

  code1 = "TGAImage scene(width, height, TGAImage::RGB);\n" +
    "\n" +
    "line(Vec2i(20, 34),   Vec2i(744, 400), scene, red);\n" +
    "line(Vec2i(120, 434), Vec2i(444, 400), scene, green);\n" +
    "line(Vec2i(330, 463), Vec2i(594, 200), scene, blue);";

  code2 = "TGAImage render(width, 16, TGAImage::RGB);\n" +
    "int yBuffer[width];\n" +
    "for (int i=0; i<width; i++) {\n" +
    "\tyBuffer[i] = std::numeric_limits<int>::min();\n" +
    "}\n" +
    "rasterize(Vec2i(20, 34),   Vec2i(744, 400), render, red,   ybuffer);\n" +
    "rasterize(Vec2i(120, 434), Vec2i(444, 400), render, green, ybuffer);\n" +
    "rasterize(Vec2i(330, 463), Vec2i(594, 200), render, blue,  ybuffer);";


  code3 = "" +
    "void rasterize(Vec2i p0, Vec2i p1, TGAImage &image, TGAColor color, int ybuffer[]) {\n" +
    "    if (p0.x>p1.x) {\n" +
    "        std::swap(p0, p1);\n" +
    "    }\n" +
    "    for (int x=p0.x; x<=p1.x; x++) {\n" +
    "        float t = (x-p0.x)/(float)(p1.x-p0.x);\n" +
    "        int y = p0.y*(1.-t) + p1.y*t;\n" +
    "        if (ybuffer[x]<y) {\n" +
    "            ybuffer[x] = y;\n" +
    "            image.set(x, 0, color);\n" +
    "        }\n" +
    "    }\n" +
    "}";

  constructor() { }

  ngOnInit(): void {
  }

}
