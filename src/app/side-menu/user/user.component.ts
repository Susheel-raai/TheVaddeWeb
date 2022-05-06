import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { ConfirmPasswordValidator } from "./../confirm-password";
import { Subscription } from 'rxjs/internal/Subscription';
import { loginUser } from '../../../Models/user';
import { registerUser } from '../../../Models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public OrdersList:any=[];
  public PaymentList:any=[];
  orderDisplay=false;
  paymentDisplay=false;
  isEdit = false;
  constructor(private scroller: ViewportScroller, private _snackBar: MatSnackBar, private formBuilder: FormBuilder, private router: Router,
    private commonService: CommonService) { }

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
      this.updateFormGroup();
      this.disableInputs();
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
    debugger;
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
    this.scroller.scrollToAnchor('registerUser');
    this.loginUser = false;
    this.loginsuccess = false;
  }

  cancel() {
    debugger
    if (this.isEdit) {
      this.reloadCurrentRoute();
    }
    else {
      this.loginUser = true;
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
    debugger
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
    debugger
    var observable = this.commonService.Get('/User/GetAllUsers');
    if (observable != undefined) {
      this.routes = observable.subscribe(data => {
        this.userList = data;
      })
    }
  }

  addUser(ruser: registerUser) {
    debugger
    if (this.isEdit) {
      ruser.isEdit=this.isEdit;
      var observable = this.commonService.Post('/User/AddUser', ruser);
      if (observable != undefined) {
        this.routes = observable.subscribe(data => {
          if (data == 0) {
            this.openSnackBar('Error in your Update');
            this.router.navigate(['/home']);
          }
          else {
            debugger
            this.openSnackBar('Updated successfully');
            localStorage.setItem('login', JSON.stringify(ruser));
            this.router.navigate(['/home']);
          }
        })
      }
    }
    else {
      ruser.isEdit=this.isEdit;
      var observable = this.commonService.Post('/User/AddUser', ruser);
      if (observable != undefined) {
        this.routes = observable.subscribe(data => {
          if (data == 0) {
            this.openSnackBar('Error in your Registeration');
            this.router.navigate(['/home']);
          }
          else {
            debugger
            this.openSnackBar('Registered successfully');
            localStorage.setItem('login', JSON.stringify(ruser));
            this.router.navigate(['/home']);
          }
        })
      }
    }
  }

  userLogin(loginUserData: loginUser) {
    debugger
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

  getAllOrders(loginData:any){
    var observable = this.commonService.Get('/User/GetUsersOrders');
    if (observable != undefined) {
      this.routes = observable.subscribe(data => {
        this.OrdersList = data;
        this.OrdersList = this.OrdersList.filter((x:{userName:string}) => x.userName==loginData.userName);
        this.OrdersList.length==0?this.orderDisplay=false:this.orderDisplay=true;
      })
    }
  }

  getPayment(loginData:any){
    var observable = this.commonService.Get('/User/GetPayments');
    if (observable != undefined) {
      this.routes = observable.subscribe(data => {
        this.PaymentList = data;
        this.PaymentList = this.PaymentList.filter((x:{userName:string}) => x.userName==loginData.userName);
        this.PaymentList.length==0?this.paymentDisplay=false:this.paymentDisplay=true;
      })
    }
  }

  removeCard(cardnumber: string){
    debugger;
    var observable = this.commonService.Delete('/User/RemoveCard?cardnumber='+cardnumber);
      if (observable != undefined) {
        this.routes = observable.subscribe(data => {
          if (data == '') {
            this.openSnackBar('Card cannot be removed');
          }
          else {
            debugger
            this.openSnackBar('removed card successfully');
            this.getAllOrders(this.loginUserDetails);
            this.getPayment(this.loginUserDetails);
          }
        })
      }
   }

  signout() {
    localStorage.removeItem('login');
    this.loginUser = true;
    this.router.navigate(['/home']);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK');
  }

  reloadCurrentRoute() {
    debugger;
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
