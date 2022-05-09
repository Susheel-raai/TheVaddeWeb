import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserPayment } from './../../../Models/UserPayment';
import { CommonService } from '../../common.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { DatePipe } from '@angular/common';
import { FoodItems } from '../../../Models/foodItems';
import { luhnCheck } from '../helpers/luhn.helper';
import { luhnValidator } from './../validators/luhnValidators'
import { getValidationConfigFromCardNo } from '../helpers/card.helper';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {

  public selectedItems: any;
  private routes!: Subscription;
  paymentForm!: FormGroup;
  paymentDisplay = false;
  isValid!: boolean;
  cardLogoDisplay = false
  public patternFormat!: RegExp
  public cardlength!: number[];
  public cardLogo!: string;
  public loginUser: any;
  public userItemList: UserPayment[] = [];


  constructor(private formBuilder: FormBuilder, private datepipe: DatePipe, private _snackBar: MatSnackBar, private router: Router, private commonService: CommonService) {
  }

  ngOnInit(): void {

    this.paymentForm = this.formBuilder.group(
      {
        cardNumber: ['', Validators.required],
        expiryDate: ['', Validators.required],
        cvv: ['', Validators.required]
      },
      {
        validator: luhnValidator("cardNumber")
      }
    );

    if (localStorage.getItem('SelectedfoodItem') != null) {
      this.getSelectedItem();
      this.totalPayment();
    }
    this.loginUser = localStorage.getItem('login') == null ? this.loginUser : JSON.parse(localStorage.getItem('login') || '{}')
  }

  get pf(): { [key: string]: AbstractControl } {
    return this.paymentForm.controls;
  }

  cardMaskFunction(rawValue: string): Array<RegExp> {
   
    const card = getValidationConfigFromCardNo(rawValue);
    if (card) {
      return card.mask;
    }
    return [/\d/];
  }

  CardDetails(rawValue: string) {
    
    const card = getValidationConfigFromCardNo(rawValue);
    if (card) {
      this.cardLogoDisplay = true;
      this.cardLogo = card.imagePath;
      this.cardlength = card.length;
      this.patternFormat = card.format;
    }
  }


  getSelectedItem() {
    
    this.selectedItems = JSON.parse(localStorage.getItem('SelectedfoodItem') || '{}');
    this.selectedItems = this.selectedItems.filter((x: { itemQty: number; }) => x.itemQty != 0);
    this.selectedItems.length != 0 ? this.paymentDisplay = true : this.paymentDisplay = false;
  }

  totalPayment() {
    let total: number = 0;
    if (this.selectedItems != undefined) {
      this.selectedItems = this.selectedItems.filter((x: { itemQty: number; }) => x.itemQty != 0);
      this.selectedItems.length != 0 ? this.paymentDisplay = true : this.paymentDisplay = false;
      for (let items of this.selectedItems) {
        total += (items.itemPrice * items.itemQty)
      }
    }
    return total;
  }

  onPayment() {
    
    if (this.loginUser == null) {
      this.openSnackBar('You need to login to do payment');
      this.router.navigate(['/user']);
    }
    else {
      const paymentDetails = this.paymentForm.value;
      this.userItemList = this.selectedItems;
      for (let i = 0; i < this.selectedItems.length; i++) {
        this.userItemList[i].userName = this.loginUser.userName;
        this.userItemList[i].cardNumber = paymentDetails.cardNumber
        this.userItemList[i].expiryDate = paymentDetails.expiryDate;
        this.userItemList[i].cvv = paymentDetails.cvv;
        this.userItemList[i].cardType = this.cardLogo
      }
      var observable = this.commonService.Post('/User/AddUserOrders', this.userItemList);
      if (observable != undefined) {
        this.routes = observable.subscribe(data => {
          if (data == 1) {
            this.openSnackBar('Payment Successful');
            this.router.navigate(['/user']);
            localStorage.removeItem('SelectedfoodItem');
            /*var currentDate = new Date();
            var currenttime= currentDate.getTime()
            localStorage.setItem('paymentSuccessful', JSON.stringify(currenttime));*/
          }
          else {
            this.openSnackBar('Error in Payment');
            this.router.navigate(['/menu']);
          }
        })
      }
    }
  }

  cancel() {
    this.paymentForm.reset()
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK');
  }

  addItemCount(itemid: number) {
    
    this.selectedItems = this.selectedItems.map((fooditem: FoodItems) => {
      if (fooditem.itemId === itemid) {
        fooditem.itemQty = fooditem.itemQty + 1;
        localStorage.setItem('SelectedfoodItem', JSON.stringify(this.selectedItems));
        return {
          ...fooditem,
          itemQty: fooditem.itemQty
        }
      }
      return fooditem
    })
  }

  removeItemCount(itemid: number) {
    
    this.selectedItems = this.selectedItems.map((fooditem: FoodItems) => {
      if (fooditem.itemId === itemid) {
        fooditem.itemQty = fooditem.itemQty - 1 > 0 ? fooditem.itemQty - 1 : 0
        localStorage.setItem('SelectedfoodItem', JSON.stringify(this.selectedItems));
        return {
          ...fooditem,
          itemQty: fooditem.itemQty
        }
      }
      return fooditem;
    })
  }
}
