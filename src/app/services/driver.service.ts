import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Driver } from '../../models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private driversUrl = 'assets/drivers.json';

  constructor(private http: HttpClient) { }

  getDriversInit(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.driversUrl).pipe(
      tap((drivers) => localStorage.setItem('drivers', JSON.stringify(drivers)))
    );
  }

  getDrivers(): Observable<Driver[]> {
    const driversString = localStorage.getItem('drivers');
    if (driversString) {
      const drivers: Driver[] = JSON.parse(driversString);
      return of(drivers);
    } else {
      return of([]);
    }
  }

  updateDriver(driver: Driver): Observable<any> {
    const drivers = JSON.parse(localStorage.getItem('drivers') || '[]');
    const index = drivers.findIndex((d: Driver) => d.id === driver.id);
    if (index !== -1) {
      drivers[index] = driver;
      localStorage.setItem('drivers', JSON.stringify(drivers));
      return of(true);
    }
    return of(false);
  }

  deleteDriver(driverId: number): Observable<any> {
    const drivers = JSON.parse(localStorage.getItem('drivers') || '[]');
    const index = drivers.findIndex((d: Driver) => d.id === driverId);
    if (index !== -1) {
      drivers.splice(index, 1);
      localStorage.setItem('drivers', JSON.stringify(drivers));
      return of(true);
    }
    return of(false);
  }

  setActiveDriver(driver: Driver | null): void {
    localStorage.setItem('activeDriver', JSON.stringify(driver));
  }

  getActiveDriver(): Driver | null {
    const driverString = localStorage.getItem('activeDriver');
    if (driverString) {
      return JSON.parse(driverString);
    }
    return null;
  }

}
