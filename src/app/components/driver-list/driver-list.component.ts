import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditDriverDialogComponent } from '../edit-driver-dialog/edit-driver-dialog.component';
import { Driver } from '../../../models/driver.model';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})

export class DriverListComponent implements OnInit {

  drivers: Driver[] = [];
  displayedColumns: string[] = ['name', 'image', 'phone', 'email', 'tasks', 'edit', 'delete'];
  selectedDriver :any;
  loading: boolean = true;

  constructor(private http: HttpClient, private dialog: MatDialog, private driverService: DriverService,) { }

  ngOnInit(): void {
    this.getDriversInit();
  }

  getDriversInit(): void {
    this.driverService.getDriversInit().subscribe(drivers => {
      this.drivers = drivers;
      this.selectedDriver = drivers[0];
      this.loading = false;
    });
  }

  getDrivers(): void {
    this.driverService.getDrivers().subscribe(drivers => {
      this.drivers = drivers;
    });
  }

  onEdit(driver: Driver): void {
    const dialogRef = this.dialog.open(EditDriverDialogComponent, {
      maxWidth: '250px',
      data: { driver: driver }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // update the driver with the new values
        this.driverService.updateDriver(result).subscribe(() => {
          // reload the drivers list
          this.driverService.getDrivers().subscribe(drivers => {
            this.drivers = drivers;
            this.selectedDriver = result;
          });
        });
      }
    });
  }

  onDelete(driver: Driver): void {
    if (confirm(`Are you sure you want to delete ${driver.name}?`)) {
      this.driverService.deleteDriver(driver.id).subscribe(() => {
        this.drivers = this.drivers.filter(d => d.id !== driver.id);
        this.selectedDriver = this.drivers.filter(d => d.id !== driver.id)[0];
      });
    }
  }

  onRowClick(driver: Driver): void {
    this.selectedDriver = driver;
  }

}
