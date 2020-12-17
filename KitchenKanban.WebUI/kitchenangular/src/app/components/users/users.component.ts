import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MediaService } from '../../services/media.service';
import { User } from '../../models/user';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userTypes: Array<{ id: number, text: string }> = [
    { id: 1, text: 'Administrator' },
    { id: 2, text: 'Front Desk' },
    { id: 3, text: 'Chef' },
    { id: 4, text: 'Back Office' },
    { id: 5, text: 'Service' }
  ];
  users: User[] = [];
  isNewUser = false;
  userIdForEdit = '';
  user = {
    userId: '',
    firstName: '',
    lastName: '',
    userType: 0,
    userName: '',
    password: '',
    imageContent: null,
    imageId: null
  };
  imageSrc: any = null;
  files: any = null;

  constructor(private userService: UserService, private mediaService: MediaService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  showAddUserForm(): void {
    this.isNewUser = true;
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      err => {
        console.log("Dashboard ngOnInit : ", err)
        this.messageService.showErrorMessage(err.Message);
      }
    );
  }

  showEditUserForm(userId: string): void {
    this.userIdForEdit = userId;
    this.userService.getUserById(userId).subscribe(
      data => {
        this.user = data;
        if (this.user.imageId != null && this.user.imageId != '') {
          this.imageSrc = 'data:image/jpeg;base64,' + this.user.imageContent;
        }
        else {
          this.imageSrc = null;
        }
        this.isNewUser = true;
      },
      err => {
        console.log("Dashboard getUserById : ", err)
        this.messageService.showErrorMessage(err.Message);
      }
    );
  }

  saveUser(): void {
    if(this.user.firstName == '' || this.user.lastName == '' || this.user.userName == '' || this.user.password == '' || this.user.userType == 0)
    {      
      this.messageService.showErrorMessage("Please fill the mandatory fields.");
      return;
    }
    if (this.user.userId != null && this.user.userId != '') {
      this.userService.updateUser(this.user).subscribe(
        data => {
          this.messageService.showSuccessMessage();
          if (this.files != null) {
            if (this.user.imageId != null && this.user.imageId != '') {
              this.mediaService.updateFile(this.files, this.user.imageId).subscribe(
                data => {
                  this.getUsers();
                  this.closeAddUserForm();
                },
                err => {
                  console.log("Dashboard saveUser updateFile : ", err)
                  this.messageService.showErrorMessage(err.Message);
                }
              );
            }
            else {
              this.mediaService.postFile(this.files, this.user.userId, 1).subscribe(
                data => {
                  this.getUsers();
                  this.closeAddUserForm();
                },
                err => {
                  console.log("Dashboard saveUser postFile : ", err)
                  this.messageService.showErrorMessage(err.Message);
                }
              );
            }
          }
          else {
            this.getUsers();
            this.closeAddUserForm();
          }
        },
        err => {
          console.log("Dashboard updateUser : ", err.error)
          this.messageService.showErrorMessage(err.Message);
        }
      );


    }
    else {
      this.userService.addUser(this.user).subscribe(
        data => {          
          this.messageService.showSuccessMessage();
          if (this.imageSrc != null) {
            this.mediaService.postFile(this.files, data.userId, 1).subscribe(
              data => {
                this.getUsers();
                this.closeAddUserForm();
              },
              err => {
                console.log("Dashboard getUserById : ", err)
                this.messageService.showErrorMessage(err.Message);
              }
            );
          }
          else {
            this.getUsers();
            this.closeAddUserForm();
          }
        },
        err => {
          console.log("Dashboard addUser : ", err.error)
          this.messageService.showErrorMessage(err.error);
        }
      );
    }
  }

  closeAddUserForm(): void {
    this.isNewUser = false;
    this.userIdForEdit = '';
    this.user = {
      userId: '',
      firstName: '',
      lastName: '',
      userType: 0,
      userName: '',
      password: '',
      imageContent: null,
      imageId: null
    };
    this.imageSrc = null;
    this.files = null;
  }

  getUserType(userTypeId: number): string {
    let selectedUserType = this.userTypes.find(x => x.id == userTypeId);
    return selectedUserType == null ? "" : selectedUserType.text;
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
