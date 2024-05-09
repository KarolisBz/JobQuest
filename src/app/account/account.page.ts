import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonButton, IonIcon, IonAlert, IonInput, IonGrid, IonRow, IonCol, IonLabel, IonDatetime, IonDatetimeButton, IonModal, IonRadio, IonRadioGroup, IonToggle } from '@ionic/angular/standalone';
import { DataHandlerService } from '../Services/data-handler.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonToggle, IonRadioGroup, IonRadio, IonModal, IonDatetimeButton, IonDatetime, IonLabel, IonCol, IonRow, IonGrid, IonInput, IonAlert, IonIcon, IonButton, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class AccountPage implements OnInit {
  // class vars
  loggedIn: boolean = false;
  loginPage: boolean = true;
  loginEmail: string = "";
  loginPassword: string = "";
  createEmail: string = "";
  createPassword1: string = "";
  createPassword2: string = "";
  firstName: string = "";
  secondName: string = "";
  dateOfBirth: string = "";
  phoneNo: string = "";
  stayLoggedIn: boolean = false;
  currentAccount: any;

  // constructor
  constructor(private dataHandler:DataHandlerService) { 
    // sets to current date in string format
    this.dateOfBirth = new Date().toISOString();
  }

  // fetches account information
  ngOnInit(): void {
    this.setupAccountContent();
  }

  // code runs when page is accessed, fetching updated info
  ionViewWillEnter(): void {
    this.setupAccountContent();
  }

  // sets up account content if logged in
  async setupAccountContent(): Promise<void> {
    await this.dataHandler.getDataAsync().then((wrappedData: any) => {
      this.currentAccount = wrappedData['currentAccount'];
    })

    if (this.currentAccount['created']) { // sneaky way of checking if logged in without looping through keys
      // user is logged in
      this.loggedIn = true
      let splitString: string = this.currentAccount['dateofBirth'].split("T", 1);
      this.currentAccount['dateofBirth'] = splitString[0]
    }
    else {
      this.loggedIn = false;
    }
  }

  // switches between loginpage and create page content
  switchPage(page:boolean): void {
    this.loginPage = page;
  }

  // attempts to login user
  login(): void {
    // creating account object
    let loginObj = {
      email: this.loginEmail,
      password: this.loginPassword,
      stayLoggedIn: this.stayLoggedIn,
    }

    let success: boolean = this.dataHandler.loginUser(loginObj);
    if (!success) {
      alert("incorrect password or email!");
    } else {
      // fetching full account details
      this.currentAccount = this.dataHandler.getData()['currentAccount'];
      this.loggedIn = true
    }
  }

  // logs user out
  logout(): void {
    this.dataHandler.logoutUser();
    this.loggedIn = false;
  }

  // attempts to create an account
  createAccount(): void {
    // basic data validation
    if (this.createPassword1 != this.createPassword2) {
      alert("passwords don't match!");
      return;
    } else if (this.createEmail.length < 6) {
      alert("invalid email!");
      return;
    } else if (this.firstName.length < 1) {
      alert("first name cannot be empty!");
      return;
    } else if (this.secondName.length < 1) {
      alert("second name cannot be empty!");
      return;
    } else if (this.phoneNo.length < 1) {
      alert("Phone number cannot be empty!");
      return;
    } else if (this.createPassword1.length < 5) {
      alert("Password must be atleast 6 characters!");
      return;
    }

    // creating account object
    let accountObj = {
      email: this.createEmail,
      password: this.createPassword1,
      firstName: this.firstName,
      secondName: this.secondName,
      dateofBirth: this.dateOfBirth,
      phoneNo: this.phoneNo,
      created: true,
    }

    let duplicateEmail:boolean = this.dataHandler.addAccountData(accountObj);
    if (duplicateEmail) {
      alert("This email has already been used!")
    }
    else
    {
      // move to login page
      this.loginPage = true;
      alert("Account creation successful, please login..")
    }
  }
}
