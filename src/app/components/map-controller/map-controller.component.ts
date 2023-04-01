import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-map-controller',
  templateUrl: './map-controller.component.html',
  styleUrls: ['./map-controller.component.css']
})
export class MapControllerComponent implements OnChanges {
  @Input() selectedDriver: any;
  mapError: boolean = false;
  errorMessage: string = '';
  // google maps zoom level
  zoom: number = 9;
  // initial center position for the map
  lat: number = 0;
  lng: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDriver'] && changes['selectedDriver'].currentValue) {
      // update the map's center and zoom level based on the selected driver's location
      const driver = changes['selectedDriver'].currentValue;
      if (driver && driver.location) {
        this.lat = driver.location.lat;
        this.lng = driver.location.lng;
        this.mapError = false;
        this.errorMessage = '';
      }else {
        // reset the map to default values if the selected driver is null
        this.mapError = true;
        this.errorMessage = 'Error: No location data available for selected driver';
        this.reset();
      }
    }
  }

  reset(): void {
    this.zoom = 10;
    this.lat = 51.673858;
    this.lng = 7.815982;
  }

  onMapReady(event: any) {
    if (event.map === null) {
      // handle the error here, for example:
      console.error('Failed to load the map');
      // set a flag to show the error message in the template
      this.mapError = true;
    }
  }
}
