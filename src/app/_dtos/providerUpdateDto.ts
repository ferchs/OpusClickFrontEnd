import { Profession } from "../_models/profession";
import { Location } from "../_models/location";

export class ProviderUpdateProfileDto {

    public id:number;
	
	public email:string;
	
	public identificationNumber:string;

	public accountName:string;
	
	public accountLastname:string;
	
	public phone:string;
				
	public opusCoins:number;
	
	public workDone:number;
		
	public profession:Profession;
		
	public location:Location;
  }