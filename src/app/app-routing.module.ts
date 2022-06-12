import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IntroductionComponent} from "./components/introduction/introduction.component";
import {LineComponent} from "./components/line/line.component";
import {RasterizationComponent} from "./components/rasterization/rasterization.component";
import {ZbufferComponent} from "./components/zbuffer/zbuffer.component";
import {PerspectiveComponent} from "./components/perspective/perspective.component";
import {CameraComponent} from "./components/camera/camera.component";
import {GeneralComponent} from "./components/general/general.component";

const routes: Routes = [
  {path: 'introduction', component: IntroductionComponent},
  {path: 'line', component: LineComponent},
  {path: 'rasterization', component: RasterizationComponent},
  {path: 'zbuffer', component: ZbufferComponent},
  {path: 'perspective', component: PerspectiveComponent},
  {path: 'camera', component: CameraComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
