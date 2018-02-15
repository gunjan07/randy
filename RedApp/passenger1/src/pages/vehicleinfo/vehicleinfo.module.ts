import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleinfoPage } from './vehicleinfo';

@NgModule({
  declarations: [
    VehicleinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(VehicleinfoPage),
  ],
})
export class VehicleinfoPageModule {}
