import { City } from "../_models/city";

export class Location {

  public id:number;
  public address:string;
  public zipCode:string;
  public zone:string;
  public city:City;

  constructor(){
    this.id=0;
    this.address=null;
    this.zipCode=null;
    this.zone=null;
    this.city= new City();
  }
}