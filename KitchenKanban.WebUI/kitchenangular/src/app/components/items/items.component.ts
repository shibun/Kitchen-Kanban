import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { MessageService } from '../../services/message.service';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: any = [];
  showPopup = false;
  recordNotFound = false;
  uniqueIdForEdit = '';
  record = {
    itemId: '',
    itemName: '',
    itemCharge: 0,
    imageContent: null,
    imageId: null
  };
  imageSrc: any = null;
  files: any = null;
  constructor(private itemService: ItemService, private messageService: MessageService, private mediaService: MediaService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems().subscribe(
      data => {
        this.items = data;
        if (this.items.length > 0) {
          this.recordNotFound = false;
        }
        else {
          this.recordNotFound = true;
        }
      },
      err => {
        console.log("Kitchen getKitchens : ", err)
        this.messageService.showErrorMessage(err.Message);
      }
    );
  }

  showAddForm(): void {
    this.showPopup = true;
  }

  saveItem(): void {
    if (this.record.itemName == '' || this.record.itemCharge == null || this.record.itemCharge == 0) {
      this.messageService.showErrorMessage("Please fill the mandatory fields.");
      return;
    }
    if (this.record.itemId != null && this.record.itemId != '') {
      this.itemService.updateItem(this.record).subscribe(
        data => {
          this.messageService.showSuccessMessage("Item updated successfully");
          if (this.files != null) {
            if (this.record.imageId != null && this.record.imageId != '') {
              this.mediaService.updateFile(this.files, this.record.imageId).subscribe(
                data => {
                  this.getItems();
                  this.closeForm();
                },
                err => {
                  console.log("Items saveItem updateFile : ", err)
                  this.messageService.showErrorMessage(err.Message);
                }
              );
            }
            else {
              this.mediaService.postFile(this.files, this.record.itemId, 2).subscribe(
                data => {
                  this.getItems();
                  this.closeForm();
                },
                err => {
                  console.log("Items saveItem postFile : ", err)
                  this.messageService.showErrorMessage(err.Message);
                }
              );
            }
          }
          else {
            this.getItems();
            this.closeForm();
          }
        },
        err => {
          console.log("Item updateItem : ", err.error)
        }
      );
    }
    else {
      this.itemService.addItem(this.record).subscribe(
        data => {
          if (this.imageSrc != null) {
            this.mediaService.postFile(this.files, data.itemId, 2).subscribe(
              data => {
                this.messageService.showSuccessMessage("Item added successfully");
                this.getItems();
                this.closeForm();
              },
              err => {
                console.log("Dashboard getUserById : ", err)
                this.messageService.showErrorMessage(err.Message);
              }
            );
          }
          else {
            this.messageService.showSuccessMessage("Item added successfully");
            this.getItems();
            this.closeForm();
          }
        },
        err => {
          console.log("Item addItem : ", err.error)
        }
      );
    }
  }

  showEditForm(itemId: string): void {
    this.uniqueIdForEdit = itemId;
    this.itemService.getItemById(this.uniqueIdForEdit).subscribe(
      data => {
        this.record = data;
        if (this.record.imageId != null && this.record.imageId != '') {
          this.imageSrc = 'data:image/jpeg;base64,' + this.record.imageContent;
        }
        else {
          this.imageSrc = null;
        }
        this.showPopup = true;
      },
      err => {
        console.log("Item showEditForm : ", err)
        this.messageService.showErrorMessage(err.Message);
      }
    );
  }

  deleteRecord(itemId: string): void {
    this.itemService.deleteItem(itemId).subscribe(
      data => {
        this.messageService.showSuccessMessage("Item deleted successfully");
        this.getItems();
        this.closeForm();
      },
      err => {
        console.log("Item deleteItem : ", err)
      }
    );
  }

  closeForm(): void {
    this.showPopup = false;
    this.uniqueIdForEdit = '';
    this.record = {
      itemId: '',
      itemName: '',
      itemCharge: 0,
      imageContent: null,
      imageId: null
    };
    this.imageSrc = null;
    this.files = null;
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.files = new FormData();
      this.files.append("file", event.target.files[0], event.target.files[0].name);
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
      };

    };
  }

}
