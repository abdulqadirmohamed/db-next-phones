import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { IncomeExpenseChartComponent } from "../../charts/income-expense-chart/income-expense-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LucideAngularModule, IncomeExpenseChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
