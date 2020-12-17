import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  clock  = new Date();

  constructor(private messageService: MessageService) {
    setInterval(() => {
      this.clock = new Date();
  }, 1000) // Updates the time every second.

   }
  
  ngOnInit(): void {
    
  }

  saveDash(): void {
    this.messageService.showSuccessMessage();
  }
}