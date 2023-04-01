import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'; // import MatTableModule
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AgmCoreModule } from '@agm/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditDriverDialogComponent } from './components/edit-driver-dialog/edit-driver-dialog.component';
import { MapControllerComponent } from './components/map-controller/map-controller.component';

@NgModule({
  declarations: [
    AppComponent,
    DriverListComponent,
    EditDriverDialogComponent,
    MapControllerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTableModule ,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAVfa2dtw5MSRWnJ6F8F-gdhPvHo1jHb88'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
