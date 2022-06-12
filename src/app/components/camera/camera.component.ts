import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  code1 = "void lookat(Vec3f eye, Vec3f center, Vec3f up) {\n" +
    "    Vec3f z = (eye-center).normalize();\n" +
    "    Vec3f x = cross(up,z).normalize();\n" +
    "    Vec3f y = cross(z,x).normalize();\n" +
    "    Matrix Minv = Matrix::identity();\n" +
    "    Matrix Tr   = Matrix::identity();\n" +
    "    for (int i=0; i<3; i++) {\n" +
    "        Minv[0][i] = x[i];\n" +
    "        Minv[1][i] = y[i];\n" +
    "        Minv[2][i] = z[i];\n" +
    "        Tr[i][3] = -center[i];\n" +
    "    }\n" +
    "    ModelView = Minv*Tr;\n" +
    "}"

  code2 = "Viewport * Projection * View * Model * Vertex";

  constructor() { }

  ngOnInit(): void {
  }

}
