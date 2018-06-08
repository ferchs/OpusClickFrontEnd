import { Account } from "../_models/account";
import { Location } from "../_models/location";

export class User {
    
    public userId: string;
    public identificationNumber: string;
    public phone: string;
    public account: Account;
    public locations: Array<Location>;
    constructor(){
    }
    /*
    getUserId(){
      return this.userId;
    }
    setUserId(newId:string){
      return this.userId=newId;
    }

    getIdentificationNumber(){
      return this.identificationNumber;
    }
    setIdentificationNumber(newIdNumber:string){
      return this.identificationNumber=newIdNumber;
    }

    getPhone(){
      return this.phone;
    }
    setPhone(newPhone:string){
      return this.phone=newPhone;
    }

    getAccount(){
      return this.account;
    }
    setAccount(newAccount:Account){
      return this.account=newAccount;
    }
    */
}