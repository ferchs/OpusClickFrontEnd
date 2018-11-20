import { Location } from "../_models/location";

export class UserInformationDto {

    public id:number;
	
	public email:string;
	
	public identificationNumber:string;

	public accountName:string;
	
    public accountLastname:string;
    
    public accountEmail:string;
	
	public phone:string;
                
    public photo:string;

    public opusCoins:number;

    public state:string;

    public locations:Array<Location>;

    constructor(){
       this.id=0;
       this.email="";
       this.identificationNumber="";
       this.accountName="";
       this.accountLastname="";
       this.accountEmail="";
       this.phone="";
       this.photo="";
       this.opusCoins=0;
       this.state="";
       this.locations= new Array<Location>();
    }
    
  }