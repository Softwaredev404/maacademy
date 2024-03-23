import { Component, OnInit,Input } from '@angular/core';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-paymenthistorytable',
  templateUrl: './paymenthistorytable.component.html',
  styleUrls: ['./paymenthistorytable.component.css']
})
export class PaymenthistorytableComponent implements OnInit {
  @Input() paymenthistory: any = [];
  noData: boolean = true;
  constructor() { }
  ngOnInit(): void {
    
  }
  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }
}
