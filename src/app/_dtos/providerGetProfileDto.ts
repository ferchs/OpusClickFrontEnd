import { GlobalRating } from "../_models/global-rating";
import { Availability } from "../_models/availability";
import { Profession } from "../_models/profession";
import { State } from "../_models/state";
import { City } from "../_models/city";

export class ProviderGetProfileDto {

    public id:number;
	
	public identificationNumber:string;
	
	public accountName:string;
	
	public accountLastname:string;
	
	public phone:string;
	
	public availability:Availability;
	
	public photo:string;
	
	public experience:number;
	
	public aboutMe:string;
	
	public opusCoins:number;
	
	public workDone:number;
	
	public state:State;
	
	public profession:Profession;
	
	public location:Location;
		
	public globalRating:GlobalRating;
				
  }