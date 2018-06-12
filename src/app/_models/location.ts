import { City } from "../_models/city";

export class Location {

  public id:number;
  public address:string;
  public zipCode:string;
  public zone:string;
  public city:City;

  constructor(){
    this.id=0;
    this.address="";
    this.zipCode="";
    this.zone="";
    this.city= new City();
  }
}