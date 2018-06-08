import { Profession } from "../_models/profession";
import { Location } from '../_models/location';
import { Account } from '../_models/account';
import { GlobalRating } from '../_models/global-rating';

export class Provider {

  public id:number;
  public phone:string;
  public photo:string;
  public identificationNumber:string;
  public experience:number;
  public aboutMe:string;
  public opusCoins:number;
  public workDone:number;
  public globalRating:GlobalRating;
  public profession:Profession;
  public location:Location;
  public account:Account;
  constructor(){}
	
}