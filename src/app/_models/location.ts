import { City } from "../_models/city";

export class Location {

  public id:number;
  public address:string;
  public zipCode:string;
  public zone:string;
  public city:City;

  constructor(){
    
  }
}