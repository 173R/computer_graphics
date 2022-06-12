import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  code1 = "#include \"tgaimage.h\"\n" +
    "\n" +
    "const TGAColor red   = TGAColor(255, 0, 0, 255);\n" +
    "\n" +
    "void line(int x0, int y0, int x1, int y1, TGAImage &image, TGAColor color) {\n" +
    "    /*Создать*/\n" +
    "}\n" +
    "\n" +
    "int main(int argc, char** argv) {\n" +
    "  TGAImage image(300, 300, TGAImage::RGB);\n" +
    "  line(20, 13, 40, 80, image, red);\n" +
    "\n" +
    "  image.flip_vertically();\n" +
    "  image.write_tga_file(\"output.tga\");\n" +
    "  return 0;\n" +
    "}";


  code2 = "int main(int argc, char** argv) {\n" +
    "    Model *model = NULL;\n" +
    "    model = new Model(\"obj/african_head.obj\");\n" +
    "\n" +
    "    TGAImage image(width, height, TGAImage::RGB);\n" +
    "    for (int i=0; i<model->nfaces(); i++) {\n" +
    "        std::vector<int> face = model->face(i);\n" +
    "        for (int j=0; j<3; j++) {\n" +
    "            Vec3f v0 = model->vert(face[j]);\n" +
    "            Vec3f v1 = model->vert(face[(j+1)%3]);\n" +
    "            int x0 = (v0.x+1.)*width/2.;\n" +
    "            int y0 = (v0.y+1.)*height/2.;\n" +
    "            int x1 = (v1.x+1.)*width/2.;\n" +
    "            int y1 = (v1.y+1.)*height/2.;\n" +
    "            line(x0, y0, x1, y1, image, white);\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    image.flip_vertically();" +
    "    image.write_tga_file(\"output.tga\");\n" +
    "    delete model;\n" +
    "    return 0;\n" +
    "}\n";


  constructor() { }

  ngOnInit(): void {
  }

}
