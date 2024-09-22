import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartModule } from 'primeng/chart';




@Component({
  selector: 'app-income-expense-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './income-expense-chart.component.html',
  styleUrl: './income-expense-chart.component.css'
})

export class IncomeExpenseChartComponent implements OnInit {
  data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['Income', 'Expense'],
            datasets: [
                {
                    data: [300, 50],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-600'), documentStyle.getPropertyValue('--yellow-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-400')]
                }
            ]
        };


        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
    }
}
