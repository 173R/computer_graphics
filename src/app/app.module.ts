import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzGridModule} from "ng-zorro-antd/grid";
import { IntroductionComponent } from './components/introduction/introduction.component';
import { LineComponent } from './components/line/line.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzCardModule} from "ng-zorro-antd/card";
import { RasterizationComponent } from './components/rasterization/rasterization.component';
import { ZbufferComponent } from './components/zbuffer/zbuffer.component';
import { ImageComponent } from './components/image/image.component';
import { PerspectiveComponent } from './components/perspective/perspective.component';
import { CameraComponent } from './components/camera/camera.component';
import { GeneralComponent } from './components/general/general.component';

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    LineComponent,
    RasterizationComponent,
    ZbufferComponent,
    ImageComponent,
    PerspectiveComponent,
    CameraComponent,
    GeneralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    NzButtonModule,
    NzDrawerModule,
    NzInputModule,
    NzIconModule,
    NzSpinModule,
    NzImageModule,
    NzCollapseModule,
    NzCardModule,
    HighlightModule
  ],
  providers: [{
    provide: NZ_I18N, useValue: ru_RU
  },{
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      fullLibraryLoader: () => import('highlight.js'),
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
