import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import {LicenseManager} from "ag-grid-enterprise/main";
LicenseManager.setLicenseKey("ag-Grid_Evaluation_License_Key_Not_for_Production_100Devs22_February_2018__MTUxOTI1NzYwMDAwMA==7afb673842c95e7dade2a77ee4a064b6");

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
