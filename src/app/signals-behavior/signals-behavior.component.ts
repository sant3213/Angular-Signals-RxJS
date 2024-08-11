import { Component, effect, signal } from '@angular/core';
import { Car } from '../interfaces/Car';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signals-behavior',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signals-behavior.component.html',
  styleUrl: './signals-behavior.component.scss'
})
export class SignalsBehaviorComponent {
  carPriceA = signal<number>(30000);

  availableCars = signal<Car[]>([
    { id: 1, name: 'Sedan', price: 37000 },
    { id: 2, name: 'SUV', price: 10000 },
    { id: 3, name: 'Truck', price: 20000 }
  ]);
  selectedCar = signal<Car | null>(null); // Initially select the first car
  
  constructor() {
      console.log('Initial car price in constructor:', this.carPriceA()); // Logs: Initial car price in constructor: 30000
  
      effect(() => console.log('effect Car price updated:', this.carPriceA()));
  
      this.carPriceA.update(price => price + 2000); // Logs: Car price updated: 32000 (once)
  }
  
  onCarSelected(carId: number) {
      const selected = this.availableCars().find(car => car.id === carId);
      if (selected) {
          this.selectedCar.set(selected);
          this.carPriceA.set(35000);
          this.carPriceA.update(price => price + 5000);
          this.carPriceA.set(40000);
      }
  }
}
