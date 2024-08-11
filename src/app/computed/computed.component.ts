import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-computed',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './computed.component.html',
  styleUrl: './computed.component.scss'
})
export class ComputedComponent {
  carPrice = signal<number>(30000);
  yearsOfOwnership = signal<number>(5);
  maintenanceCostPerYear = signal<number>(1000);

  totalOwnershipCost = computed(() => {
    return (
      this.carPrice() + this.yearsOfOwnership() * this.maintenanceCostPerYear()
    );
  });

  constructor() {}

  updateCarPrice(newPrice: number) {
    this.carPrice.set(newPrice);
  }

  updateYearsOfOwnership(newYears: number) {
    this.yearsOfOwnership.set(newYears);
  }

  updateMaintenanceCostPerYear(newCost: number) {
    this.maintenanceCostPerYear.set(newCost);
  }
}
