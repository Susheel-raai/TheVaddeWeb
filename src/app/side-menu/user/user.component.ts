import { Component, OnInit, Inject } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { ConfirmPasswordValidator } from "./../confirm-password";
import { Subscription } from 'rxjs/internal/Subscription';
import { loginUser } from '../../../Models/user';
import { registerUser } from '../../../Models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserPayment } from './../../../Models/UserPayment';

export interface DialogData {
  PreviousOrderData: any;
  displayOrderData: any;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  private routes!: Subscription;
  loginUser = localStorage.getItem('login') == null ? true : false;
  loginsuccess = localStorage.getItem('login') == null ? false : true;
  invalidCredentials = false;
  public loginUserDetails: any;

  loginForm!: FormGroup;
  registerForm!: FormGroup;
  UpdateForm!: FormGroup;
  public userList: any;
  public OrdersList: any = [];
  public allOrdersList: any = [];
  public paymentList: any = [];
  public userLogList: any = [];
  public userPayment!: UserPayment;
  public lastSignoutTime !: string;
  orderDisplay = false;
  paymentDisplay = false;
  isEdit = false;
  isCancellation = false;
  minutes: any;
  seconds: any;
  signoutFlag = false;
  //ordertime = JSON.parse(localStorage.getItem('paymentSuccessful') || '{}');
  canceltimer: number = 0
  constructor(private scroller: ViewportScroller, private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private router: Router,
    private commonService: CommonService, public dialog: MatDialog) {
      this.userPayment = new UserPayment();
     }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        luserName: ['', [Validators.required, Validators.email]],
        lpassword: ['', [Validators.required]]
      }
    );
    this.registerFormGroup();
    this.getAllUsers();
    this.loginUserDetails = localStorage.getItem('login') == null ? this.loginUserDetails : JSON.parse(localStorage.getItem('login') || '{}')
    if (localStorage.getItem('login') != null) {
      this.signoutFlag = localStorage.getItem('signOutFlag')==null? false : JSON.parse(localStorage.getItem('signOutFlag')||'{}');
      //localStorage.removeItem(this.loginUserDetails.userName)
      this.updateFormGroup();
      this.disableInputs();
      this.getUserLogs(this.loginUserDetails);
      this.getAllOrders(this.loginUserDetails);
      this.getPayment(this.loginUserDetails);
    }
  }

  registerFormGroup() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
  }

  updateFormGroup() {
   
    this.UpdateForm = this.formBuilder.group(
      {
        firstName: [this.loginUserDetails.firstName, Validators.required],
        lastName: [this.loginUserDetails.lastName, Validators.required],
        userName: [this.loginUserDetails.userName],
        password: [this.loginUserDetails.password, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
        confirmPassword: [this.loginUserDetails.confirmPassword, Validators.required]
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
  }

  getRegistrationForm() {
    this.registerForm.reset();
    this.scroller.scrollToAnchor('registerUser');
    this.loginUser = false;
    this.loginsuccess = false;
  }

  cancel() {
    if (this.isEdit) {
      this.reloadCurrentRoute();
    }
    else {
      this.loginUser = true;
      this.loginForm.reset()
      this.scroller.scrollToAnchor('loginUser');
    }
  }

  disableInputs() {
    this.UpdateForm.controls['firstName'].disable();
    this.UpdateForm.controls['lastName'].disable();
    this.UpdateForm.controls['userName'].disable();
    this.UpdateForm.controls['password'].disable();
    this.UpdateForm.controls['confirmPassword'].disable();
  }

  onEdit() {
    this.isEdit = true;
    this.UpdateForm.controls['firstName'].enable();
    this.UpdateForm.controls['lastName'].enable();
    this.UpdateForm.controls['password'].enable();
    this.UpdateForm.controls['confirmPassword'].enable();
  }

  get lf(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  get rf(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get uf(): { [key: string]: AbstractControl } {
    return this.UpdateForm.controls;
  }


  onSubmit() {
    
    if (this.isEdit) {
      const updateUserdata = this.UpdateForm.value;
      updateUserdata.userName = this.loginUserDetails.userName;
      this.addUser(updateUserdata);
    }
    else {
      if (this.loginUser == true) {
        const loginUserData = this.loginForm.value;
        this.userLogin(loginUserData);
      }
      else {
        const addUserdata = this.registerForm.value;
        this.addUser(addUserdata);
      }
      this.onReset();
    }
  }

  onReset(): void {
    this.loginForm.reset();
    this.registerForm.reset();
  }


  getAllUsers() {
    
    var observable = this.commonService.Get('/User/GetAllUsers');
    if (observable != undefined) {
      this.routes = observable.subscribe(data => {
        this.userList = data;
      })
    }
  }

  addUser(ruser: registerUser) {
    
    if (this.isEdit) {
      ruser.isEdit = this.isEdit;
      var observable = this.commonService.Post('/User/AddUser', ruser);
      if (observable != undefined) {
        this.routes = observable.subscribe(data => {
          if (data == 0) {
            this.openSnackBar('Error in your Update');
            this.router.navigate(['/home']);
          }
          else {
            
            this.openSnackBar('Updated successfully');
            localStorage.setItem('login', JSON.stringify(ruser));
            this.router.navigate(['/home']);
          }
        })
      }
    }
    else {
      ruser.isEdit = this.isEdit;
      var observable = this.commonService.Post('/User/AddUser', ruser);
      if (observable != undefined) {
        this.routes = observable.subscribe(data => {
          if (data == 0) {
            this.openSnackBar('Error in your Registeration');
            this.router.navigate(['/home']);
          }
          else {
            
            this.openSnackBar('Registered successfully');
            localStorage.setItem('login', JSON.stringify(ruser));
            this.router.navigate(['/home']);
          }
        })
      }
    }
  }

  userLogin(loginUserData: loginUser) {
    this.loginUserDetails = this.userList.filter((x: { userName: string, password: string }) => x.userName == loginUserData.luserName && x.password == loginUserData.lpassword);
    if (this.loginUserDetails.length == 1) {
      this.loginsuccess = true;
      this.loginUser = false;
      this.loginUserDetails = this.loginUserDetails[0];
      localStorage.setItem('login', JSON.stringify(this.loginUserDetails));
      this.openSnackBar('Login successful');
      this.router.navigate(['/home']);
    }
    else {
      this.invalidCredentials = true;
    }
  }

  getAllOrders(loginData: any) {
    debugger;
    var observable = this.commonService.Get('/User/GetUsersOrders');
    if (observable != undefined) {
      this.routes = observable.subscribe(data => {
        this.allOrdersList = data;
        this.allOrdersList = this.allOrdersList.filter((x: { userName: string }) => x.userName == loginData.userName);
        this.allOrdersList.length == 0 ? this.orderDisplay = false : this.orderDisplay = true;
        if (this.allOrdersList.length != 0) {
          var latestOrderDate = this.allOrdersList[this.allOrdersList.length - 1].orderDate;
          this.OrdersList = this.allOrdersList.filter(((x: { orderDate: any; }) => x.orderDate == latestOrderDate))
          /*let newDate = new Date(latestOrderDate);
          var lastOrderDate = newDate.getTime();*/
          var lastOrderDate =  new Date(latestOrderDate);
          var cancellationLimit = new Date();
          cancellationLimit.setMinutes(lastOrderDate.getMinutes() + 20);
          //var cancellationLimit = new Date(lastOrderDate + 20 * 60000);
          var currentDate = new Date();
          var currenttime = new Date(currentDate.getTime())
          let signoutTime = new Date(this.lastSignoutTime);
          let signoutLimit = new Date();
          signoutLimit.setMinutes(signoutTime.getMinutes() + 20);
          this.canceltimer = localStorage.getItem(loginData.userName) == null ? 1200 : JSON.parse(localStorage.getItem(loginData.userName) || '{}');
          if (currenttime < cancellationLimit) {
            setInterval(() => {
              if (this.canceltimer > 0) {
                this.isCancellation = true;
                if(signoutLimit<currenttime){
                  this.signoutFlag = false;
                }
                if(this.signoutFlag){
                  var signOutValue = signoutTime.getTime();
                  var difference = currentDate.getTime() - signOutValue;
                  difference = Math.floor((difference / 1000) % 60)
                  this.canceltimer = this.canceltimer-difference;
                  this.signoutFlag = false;
                }
                else{
                  this.canceltimer--;
                }
                this.minutes = Math.floor(this.canceltimer / 60);
                this.seconds = this.canceltimer - this.minutes * 60;
                localStorage.setItem(loginData.userName, JSON.stringify(this.canceltimer));
              } else {
                this.isCancellation = false;
                this.canceltimer = 0;
                localStorage.removeItem(loginData.userName);
              }
            }, 1000)
          }
          else {
            this.isCancellation = false;
            this.canceltimer = 0;
            localStorage.removeItem(loginData.userName)
          }
        }
      })
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PreviousOrdersdialog, {
      width: '100%',
      data: { PreviousOrderData: this.allOrdersList, displayOrderData: this.orderDisplay },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getPayment(loginData: any) {
    var observable = this.commonService.Get('/User/GetPayments');
    if (observable != undefined) {
      this.routes = observable.subscribe(data => {
        this.paymentList = data;
        this.paymentList = this.paymentList.filter((x: { userName: string }) => x.userName == loginData.userName);
        this.paymentList.length == 0 ? this.paymentDisplay = false : this.paymentDisplay = true;
      })
    }
  }

  cancelOrder(orderdate: Date,username: string) {
    debugger
    this.userPayment.userName = username;
    this.userPayment.orderDate = orderdate;
    var observable = this.commonService.Post('/User/CancelOrder', this.userPayment);
    if (observable != undefined) {
      this.routes = observable.subscribe(data => {
        if (data == '') {
          this.openSnackBar('Order cannot be Cancelled');
        }
        else {
          this.isCancellation = false;
          localStorage.removeItem(this.loginUserDetails.userName);
          this.canceltimer = 0;
          this.openSnackBar('Order Cancel successfully');
          this.getAllOrders(this.loginUserDetails);
          this.getPayment(this.loginUserDetails);
        }
      })
    }
  }

  removeCard(cardnumber: string, username:any) {
   
    this.userPayment.cardNumber = cardnumber;
    this.userPayment.userName = username;
    var observable = this.commonService.Post('/User/RemoveCard', this.userPayment);
    if (observable != undefined) {
      this.routes = observable.subscribe(data => {
        if (data == '') {
          this.openSnackBar('Card cannot be removed');
        }
        else {
          this.openSnackBar('removed card successfully');
          this.getAllOrders(this.loginUserDetails);
          this.getPayment(this.loginUserDetails);
        }
      })
    }
  }

  signout() {
    var observable = this.commonService.Update('/User/UserLogsDeatils?username=' +this.loginUserDetails.userName);
    if(observable!=undefined){
      this.routes = observable.subscribe(data=>{
        if(data==1){
          localStorage.removeItem('login');
          this.loginUser = true;
          this.router.navigate(['/home']);
          localStorage.setItem('signOutFlag',JSON.stringify(true));
        }
        else{
          this.openSnackBar('Trouble in Signing out')
        }
      })
    }
  }

  getUserLogs(loginData: any){
    debugger
    var observable = this.commonService.Get('/User/GetUserLogs');
    if (observable != undefined) {
      this.routes = observable.subscribe(data => {
        this.userLogList = data;
        this.userLogList = this.userLogList.filter((x: { userName: string }) => x.userName == loginData.userName);
        if(this.userLogList.length!=0){
          this.lastSignoutTime = this.userLogList[this.userLogList.length - 1].logOutTime;
        }
      })
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK');
  }

  reloadCurrentRoute() {
   
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}

@Component({
  selector: 'previousOrdersdialog',
  templateUrl: 'previousOrdersdialog.html',
  styleUrls: ['./previousOrdersdialog.css']
})
export class PreviousOrdersdialog {
  constructor(
    public dialogRef: MatDialogRef<PreviousOrdersdialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
