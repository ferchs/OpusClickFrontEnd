import { GlobalRating } from "../_models/global-rating";
import { Profession } from "../_models/profession";
import { Location } from "../_models/location";

export class ProviderGetProfileDto {

    public id:number;
	
	public identificationNumber:string;

	public accountEmail:string;
	
	public accountName:string;
	
	public accountLastname:string;
	
	public phone:string;
	
	public availability:string;
	
	public photo:string;
	
	public experience:number;
	
	public aboutMe:string;
	
	public opusCoins:number;
	
	public workDone:number;
	
	public state:string;
	
	public profession:Profession;
	
	public location:Location;
		
	public globalRating:GlobalRating;

	constructor(){
		this.id=0;
	
		this.identificationNumber=null;

		this.accountEmail=null;
	
		this.accountName=null;
	
		this.accountLastname=null;
	
		this.phone=null;
	
		this.availability=null;
	
		this.photo=null;
	
		this.experience=0;
	
		this.aboutMe=null;
	
		this.opusCoins=null;
	
		this.workDone=0;
	
		this.state=null;
	
		this.profession= new Profession();
	
		this.location= new Location();
		
		this.globalRating= new GlobalRating();
	}
				
  }