import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-map-controller',
  templateUrl: './map-controller.component.html',
  styleUrls: ['./map-controller.component.css']
})
export class MapControllerComponent implements OnChanges {
  @Input() selectedDriver: any;
  
  // google maps zoom level
  zoom: number = 8;
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDriver'] && changes['selectedDriver'].currentValue) {
      // update the map's center and zoom level based on the selected driver's location
      const driver = changes['selectedDriver'].currentValue;
      if (driver && driver.location) {
        this.lat = driver.location.lat;
        this.lng = driver.location.lng;
        this.zoom = 12;
      }
    }
  }
}
