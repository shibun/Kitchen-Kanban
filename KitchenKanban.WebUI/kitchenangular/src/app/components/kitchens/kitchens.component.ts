import { Component, OnInit } from '@angular/core';
import { KitchenService } from '../../services/kitchen.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchens.component.html',
  styleUrls: ['./kitchens.component.css']
})
export class KitchensComponent implements OnInit {
  kitchens: any = [];
  showPopup = false;
  recordNotFound = false;
  uniqueIdForEdit = '';
  record = {
    kitchenId: '',
    counterNumber: ''
  };
  constructor(private kitchenService: KitchenService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getKitchens();
  }

  getKitchens(): void {
    this.kitchenService.getKitchens().subscribe(
      data => {
        this.kitchens = data;
        if(this.kitchens.length > 0)
        {
          this.recordNotFound = false;
        }
        else
        {
          this.recordNotFound = true;
        }
      },
      err => {
        console.log("Kitchen getKitchens : ", err)
        this.messageService.showErrorMessage(err.Message);
      }
    );
  }

  showEditForm(kitchenId: string): void {
    this.uniqueIdForEdit = kitchenId;
    this.kitchenService.getKitchenById(this.uniqueIdForEdit).subscribe(
      data => {
        this.record = data;        
        this.showPopup = true;
      },
      err => {
        console.log("Kitchen showEditForm : ", err)
        this.messageService.showErrorMessage(err.Message);
      }
    );
  }

  showAddForm(): void {
    this.showPopup = true;
  }

  saveKitchen(): void {
    if(this.record.counterNumber == null || this.record.counterNumber == '')
    {      
      this.messageService.showErrorMessage("Please fill the mandatory fields.");
      return;
    }
    if (this.record.kitchenId != null && this.record.kitchenId != '') {
      this.kitchenService.updateKitchen(this.record).subscribe(
        data => {
          this.messageService.showSuccessMessage("Kitchen counter updated successfully");
          this.getKitchens();
          this.closeForm();
        },
        err => {
          console.log("Kitchen updateKitchen : ", err.error)
        }
      );
    }
    else {
      this.kitchenService.addKitchen(this.record).subscribe(
        data => {
          this.messageService.showSuccessMessage("Kitchen counter added successfully");
          this.getKitchens();
          this.closeForm();
        },
        err => {
          console.log("Kitchen addKitchen : ", err.error)
        }
      );
    }
  }

  deleteRecord(kitchenId: string): void {
    this.kitchenService.deleteKitchen(kitchenId).subscribe(
      data => {
        this.messageService.showSuccessMessage("Kitchen counter deleted successfully");
        this.getKitchens();
        this.closeForm();
      },
      err => {
        console.log("Kitchen updateKitchen : ", err)
      }
    );
  }

  closeForm(): void {
    this.showPopup = false;
    this.uniqueIdForEdit = '';
    this.record = {
      kitchenId: '',
      counterNumber: ''
    };
  }

}
