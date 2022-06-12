import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rasterization',
  templateUrl: './rasterization.component.html',
  styleUrls: ['./rasterization.component.scss']
})
export class RasterizationComponent implements OnInit {

  code1 = "void triangle(Vec2i t0, Vec2i t1, Vec2i t2, TGAImage &image, TGAColor color) {\n" +
    "    line(t0, t1, image, color);\n" +
    "    line(t1, t2, image, color);\n" +
    "    line(t2, t0, image, color);\n" +
    "}\n" +
    "\n" +
    "[...]\n" +
    "\n" +
    "    Vec2i t0[3] = {Vec2i(10, 70),   Vec2i(50, 160),  Vec2i(70, 80)};\n" +
    "    Vec2i t1[3] = {Vec2i(180, 50),  Vec2i(150, 1),   Vec2i(70, 180)};\n" +
    "    Vec2i t2[3] = {Vec2i(180, 150), Vec2i(120, 160), Vec2i(130, 180)};\n" +
    "\n" +
    "\n" +
    "    triangle(t0[0], t0[1], t0[2], image, red);\n" +
    "    triangle(t1[0], t1[1], t1[2], image, white);\n" +
    "    triangle(t2[0], t2[1], t2[2], image, green);";

  code2 = "void triangle(Vec2i t0, Vec2i t1, Vec2i t2, TGAImage &image, TGAColor color) {\n" +
    "    if (t0.y>t1.y) std::swap(t0, t1);\n" +
    "    if (t0.y>t2.y) std::swap(t0, t2);\n" +
    "    if (t1.y>t2.y) std::swap(t1, t2);\n" +
    "\n" +
    "    line(t0, t1, image, green);\n" +
    "    line(t1, t2, image, green);\n" +
    "    line(t2, t0, image, red);\n" +
    "}";

  code3 = "void triangle(Vec2i t0, Vec2i t1, Vec2i t2, TGAImage &image, TGAColor color) {\n" +
    "    \n" +
    "    if (t0.y>t1.y) std::swap(t0, t1);\n" +
    "    if (t0.y>t2.y) std::swap(t0, t2);\n" +
    "    if (t1.y>t2.y) std::swap(t1, t2);\n" +
    "\n" +
    "    int total_height = t2.y-t0.y;\n" +
    "    for (int y=t0.y; y<=t1.y; y++) {\n" +
    "        int segment_height = t1.y-t0.y+1;\n" +
    "        float alpha = (float)(y-t0.y)/total_height;\n" +
    "        float beta  = (float)(y-t0.y)/segment_height;\n" +
    "        Vec2i A = t0 + (t2-t0)*alpha;\n" +
    "        Vec2i B = t0 + (t1-t0)*beta;\n" +
    "        image.set(A.x, y, red);\n" +
    "        image.set(B.x, y, green);\n" +
    "    }\n" +
    "}";

  code4 = "void triangle(Vec2i t0, Vec2i t1, Vec2i t2, TGAImage &image, TGAColor color) {\n" +
    "    \n" +
    "    if (t0.y>t1.y) std::swap(t0, t1);\n" +
    "    if (t0.y>t2.y) std::swap(t0, t2);\n" +
    "    if (t1.y>t2.y) std::swap(t1, t2);\n" +
    "\n" +
    "    int total_height = t2.y-t0.y;\n" +
    "    for (int y=t0.y; y<=t1.y; y++) {\n" +
    "        int segment_height = t1.y-t0.y+1;\n" +
    "        float alpha = (float)(y-t0.y)/total_height;\n" +
    "        float beta  = (float)(y-t0.y)/segment_height;\n" +
    "        Vec2i A = t0 + (t2-t0)*alpha;\n" +
    "        Vec2i B = t0 + (t1-t0)*beta;\n" +
    "        if (A.x>B.x) std::swap(A, B);\n" +
    "        for (int j=A.x; j<=B.x; j++) {\n" +
    "            image.set(j, y, color);\n" +
    "        }\n" +
    "    }\n" +
    "    for (int y=t1.y; y<=t2.y; y++) {\n" +
    "        int segment_height =  t2.y-t1.y+1;\n" +
    "        float alpha = (float)(y-t0.y)/total_height;\n" +
    "        float beta  = (float)(y-t1.y)/segment_height;\n" +
    "        Vec2i A = t0 + (t2-t0)*alpha;\n" +
    "        Vec2i B = t1 + (t2-t1)*beta;\n" +
    "        if (A.x>B.x) std::swap(A, B);\n" +
    "        for (int j=A.x; j<=B.x; j++) {\n" +
    "            image.set(j, y, color);\n" +
    "        }\n" +
    "    }\n" +
    "}"

  code5 = "#include <vector>\n" +
    "#include <cmath>\n" +
    "#include <cstdlib> // for rand\n" +
    "#include \"tgaimage.h\"\n" +
    "#include \"model.h\"\n" +
    "#include \"geometry.h\"\n" +
    "\n" +
    "const TGAColor white = TGAColor(255, 255, 255, 255);\n" +
    "const TGAColor red   = TGAColor(255, 0,   0,   255);\n" +
    "const TGAColor green = TGAColor(0,   255, 0,   255);\n" +
    "Model *model = NULL;\n" +
    "const int width  = 600;\n" +
    "const int height = 500;\n" +
    "\n" +
    "void line(Vec2i p0, Vec2i p1, TGAImage &image, TGAColor color) {\n" +
    "    bool steep = false;\n" +
    "    if (std::abs(p0.x-p1.x)<std::abs(p0.y-p1.y)) {\n" +
    "        std::swap(p0.x, p0.y);\n" +
    "        std::swap(p1.x, p1.y);\n" +
    "        steep = true;\n" +
    "    }\n" +
    "    if (p0.x>p1.x) {\n" +
    "        std::swap(p0, p1);\n" +
    "    }\n" +
    "\n" +
    "    for (int x=p0.x; x<=p1.x; x++) {\n" +
    "        float t = (x-p0.x)/(float)(p1.x-p0.x);\n" +
    "        int y = p0.y*(1.-t) + p1.y*t;\n" +
    "        if (steep) {\n" +
    "            image.set(y, x, color);\n" +
    "        } else {\n" +
    "            image.set(x, y, color);\n" +
    "        }\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "void triangle(Vec2i t0, Vec2i t1, Vec2i t2, TGAImage &image, TGAColor color) {\n" +
    "    if (t0.y==t1.y && t0.y==t2.y) return;\n" +
    "    if (t0.y>t1.y) std::swap(t0, t1);\n" +
    "    if (t0.y>t2.y) std::swap(t0, t2);\n" +
    "    if (t1.y>t2.y) std::swap(t1, t2);\n" +
    "    int total_height = t2.y-t0.y;\n" +
    "    for (int i=0; i<total_height; i++) {\n" +
    "        bool second_half = i>t1.y-t0.y || t1.y==t0.y;\n" +
    "        int segment_height = second_half ? t2.y-t1.y : t1.y-t0.y;\n" +
    "        float alpha = (float)i/total_height;\n" +
    "        float beta  = (float)(i-(second_half ? t1.y-t0.y : 0))/segment_height;\n" +
    "        Vec2i A =               t0 + (t2-t0)*alpha;\n" +
    "        Vec2i B = second_half ? t1 + (t2-t1)*beta : t0 + (t1-t0)*beta;\n" +
    "        if (A.x>B.x) std::swap(A, B);\n" +
    "        for (int j=A.x; j<=B.x; j++) {\n" +
    "            image.set(j, t0.y+i, color);\n" +
    "        }\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "int main(int argc, char** argv) {\n" +
    "    if (2==argc) {\n" +
    "        model = new Model(argv[1]);\n" +
    "    } else {\n" +
    "        model = new Model(\"obj/bottle.obj\");\n" +
    "    }\n" +
    "\n" +
    "    TGAImage image(width, height, TGAImage::RGB);\n" +
    "    for (int i=0; i<model->nfaces(); i++) {\n" +
    "        std::vector<int> face = model->face(i);\n" +
    "        Vec2i screen_coords[3];\n" +
    "        for (int j=0; j<3; j++) {\n" +
    "            Vec3f world_coords = model->vert(face[j]);\n" +
    "            screen_coords[j] = Vec2i((world_coords.x+1.)*(width/6.) + 170., (world_coords.y+1.)*(height/6.) + 120.);\n" +
    "        }\n" +
    "        triangle(screen_coords[0], screen_coords[1], screen_coords[2], image, TGAColor(rand()%255, rand()%255, rand()%255, 255));\n" +
    "    }\n" +
    "\n" +
    "    image.flip_vertically();" +
    "    image.write_tga_file(\"output.tga\");\n" +
    "    delete model;\n" +
    "    return 0;\n" +
    "}"

  constructor() { }

  ngOnInit(): void {
  }

}
