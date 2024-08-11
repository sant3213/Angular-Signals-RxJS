## Angular Signals

- <strong>Reactive Data Binding:</strong> Signals provide a mechanism for your code to automatically notify templates and other parts of your application when data changes, leading to more seamless and reactive updates.

- <strong>Enhanced Reactivity:</strong> By leveraging Angular Signals, your application can become more responsive to data changes, allowing for more intuitive and dynamic interactions.

- <strong>Optimized Change Detection:</strong> Signals play a crucial role in improving Angular’s change detection mechanism, ensuring that updates are processed efficiently and reducing unnecessary checks.

- <strong>Developer Preview in Angular v16:</strong> Angular Signals are available as a developer preview in Angular v16, giving developers a chance to explore and adopt this feature in preparation for future releases.

Think of a signal as a special kind of data that not only stores a value but also automatically lets your application know whenever that value changes. Signals are built directly into Angular and help make your app more responsive by ensuring any changes in data are instantly recognized.

A signal created with the signal() constructor function is writable. 
```js
stockLevel = signal<number>(20)
```
Once you have the signal defined, we often want to read it.
```ts
stockLevel();
```

```ts
  stockLevelA = signal<number>(100);
  stockLevelB = signal<number>(50);
  totalStock = computed(() => this.stockLevelA() + this.stockLevelB());

  constructor() {
    console.log('Initial log:');
    this.logStockLevels(); // Logs the initial value of totalStock (150)
    
    // Simulate a stock update
    this.stockLevelA.set(200);
    console.log('After updating stockLevelA:');
    
    this.logStockLevels(); // Logs 250
  }

  logStockLevels() {
    console.log('Total Stock Level:', this.totalStock());
  }
```
Traditionally, Angular developers were advised against calling functions directly from templates due to concerns about the performance impact on change detection. This caution stemmed from the risk that such functions might contain time-consuming logic, potentially leading to inefficient re-rendering.

However, these concerns don't apply to `signal getter` functions. Signal getters are designed to be lightweight and efficient, performing minimal work. As a result, you can safely call them repeatedly and frequently without worrying about performance issues.

<strong>Key Points:</strong>

- <strong>Template Usage:</strong> When you read a signal within a template, it simply returns the current value of that signal.

- <strong>Automatic Dependency Tracking:</strong> Reading a signal automatically registers it as a dependency for the template. This means that the template will automatically be notified whenever the signal's value changes, eliminating the need for explicit subscriptions like those used with observables.

- <strong>Efficient Re-rendering:</strong> If the signal's value changes, Angular re-renders only the affected part of the template. This is done efficiently and seamlessly.

- <strong>OnPush Change Detection:</strong> You can still use OnPush change detection to further optimize re-rendering, ensuring that Angular only updates the parts of the UI that are truly impacted by changes.

### Change Detection with Signals

During the execution of this method, the code runs to completion without yielding to allow other operations or change detection to occur. When the template is re-rendered, the binding retrieves the latest value, which is 20, with no knowledge of the previous values set during execution.

```ts
onClick(stock: number) {
    this.totalStock.set(stock);
    this.totalStock.set(2);
    this.totalStock.set(20);
}
```

### Signals are different from Observables

In Angular, signals handle reactive state differently than observables. Unlike observables, signals don't immediately emit values or trigger callbacks when something changes. Instead, they notify Angular that a value has changed, and Angular processes this change when it’s ready, usually after the current method finishes.

Signals do not emit values and don't provide callback functions for an immediate reaction.
Rather signal changes provide a notification, and the code responds to that notification when it has a chance to execute. 

With an effect, you can run code whenever a signal’s value changes, but this happens according to Angular’s schedule, not immediately.
It is schedule to run any time its carPriceA signal changes.

```ts
...

{
    carPriceA = signal<number>(30000);

availableCars = signal<Car[]>([
  { id: 1, name: 'Sedan', price: 37000 },
  { id: 2, name: 'SUV', price: 10000 },
  { id: 3, name: 'Truck', price: 20000 }
]);
selectedCar = signal<Car | null>(null); // Initially select the first car

constructor() {
    console.log('Initial car price in constructor:', this.carPriceA()); // Logs: Initial car price in constructor: 30000

    effect(() => console.log('effect Car price updated:', this.carPriceA())); // effect Car price updated: 32000

    this.carPriceA.update(price => price + 2000); 
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

export interface Car {
  id: number;
  name: string;
  price: number;
}

```

```HTML
<div>
  <h2>Product Selection</h2>
  <ul>
    <li *ngFor="let car of availableCars()">
      <button (click)="onCarSelected(car.id)">
        {{ car.name }}
      </button>
    </li>
  </ul>

  <h3>Selected Product</h3>
  <p *ngIf="selectedCar()">Product Name: {{ selectedCar()?.name }}</p>
  <p *ngIf="selectedCar()">Price: ${{ selectedCar()?.price }}</p>

  <h3>Stock Level</h3>
  <p>Current Stock: {{ carPriceA() }}</p>
</div>

```

#### Logs
Initial car price in constructor: 30000
effect Car price updated: 32000 (once)
After clicking on any of the items
effect Car price updated: 4000

The `effect` only detects the last change in the `onCarSelected` method which is `4000`. That's because the code in the constructor is only run once. It does not react to changes in the signal.


### Computed 

- `computed()` <strong>Function:</strong>

Imagine a scenario where you're managing car ownership costs. You want to calculate the total cost based on the car's price and the number of years you plan to own the car.

The computed() function creates a computed signal, which derives its value from other signals. It recalculates its value whenever the signals it depends on change. In this case, totalOwnershipCost depends on carPrice(), yearsOfOwnership(), and maintenanceCostPerYear(). If any of these signals change, the totalOwnershipCost will automatically update to reflect the new values.

```ts
import { Component, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

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

```

```HTML
<div class="car-cost-calculator">
  <h1>Car Ownership Cost Calculator</h1>
  
  <label for="car-price">Car Price:</label>
  <input id="car-price" type="number" [ngModel]="carPrice()" (ngModelChange)="updateCarPrice($event)" />
  
  <label for="years-of-ownership">Years of Ownership:</label>
  <input id="years-of-ownership" type="number" [ngModel]="yearsOfOwnership()" (ngModelChange)="updateYearsOfOwnership($event)" />

  <label for="maintenance-cost">Maintenance Cost per Year:</label>
  <input id="maintenance-cost" type="number" [ngModel]="maintenanceCostPerYear()" (ngModelChange)="updateMaintenanceCostPerYear($event)" />

  <div class="cost-display">
    <p>Total Ownership Cost: ${{ totalOwnershipCost() }}</p>
  </div>
</div>

```

 - Computed signal that dynamically calculates the totalOwnershipCost of the car
 - computed is used to create a signal whose value depends on other signals
 - Whenever the carPrice, yearsOfOwnership `or` maintenanceCostPerYear  signal change, totalOwnershipCost will automatically update
 
A computed value is memoized, meaning it stores the result of its calculation. This stored value is reused the next time the computed signal is accessed, avoiding unnecessary recalculations unless one of the dependent signals has changed.

## Signal Effect

- Generally, it shouldn’t change the state or value of a signal.
- It always runs at least once.
    - During its first run, it tracks which signals it depends on.
- When any of its dependencies change, the effect is scheduled to run again.
- It’s optimized to run the minimum number of times needed.
    - If multiple dependent signals change at once, the effect is scheduled to run just once, regardless of how many signals were updated.

## Angular Signals and Two-way Bindings

When using Angular signals, direct <strong>two-way binding</strong> like `[(ngModel)]` isn't supported. Instead, you can achieve similar functionality by using property binding and event binding separately:

`[ngModel]:` Binds the signal's current value to the input, ensuring the UI reflects the latest state.
(ngModelChange): Listens for changes and updates the signal when the user modifies the input.

## Replacing `@input()` and `@output()` with the new `model()` function in Angular

In Angular 17 and beyond, the introduction of the model() function provides a more streamlined way to handle data binding between parent and child components. This function simplifies the process by eliminating the need for the traditional @Input() and @Output() decorators, enabling a more direct and cleaner two-way binding mechanism.


### Traditional Approach with @Input() and @Output():
Previously, to pass data from a parent component to a child component and handle changes, you would use the following pattern:

```ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  template: `
    <input type="number" [(ngModel)]="quantity" (ngModelChange)="quantityChange.emit($event)">
  `,
})
export class CartItemComponent {
  @Input() quantity = 1;
  @Output() quantityChange = new EventEmitter<number>();
}

```

`@Input():` Binds the page property from the parent to the child.

`@Output():` Emits changes from the child back to the parent.

### New Approach with the `model()` Function:

With the model() function, you can achieve the same functionality with less boilerplate and more direct binding:

```ts
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  template: `
    <input type="number" [(model)]="quantity">
  `,
})
export class CartItemComponent {
  quantity = model<number>(1); 
}
```


### So, what are the benefits?

-  <strong>Simpler and Easier:</strong> The model() function lets you replace both @Input() and @Output() with a single, straightforward approach, so you don’t have to mess with separate event emitters anymore.
- <strong>Less Code, More Clarity:</strong> You write less code to get the same job done, which means your code is easier to read and maintain.
- <strong>Automatic Updates:</strong> With the [(model)] syntax, the connection between your data and the UI is handled automatically, so you don’t need extra logic to keep things in sync.





