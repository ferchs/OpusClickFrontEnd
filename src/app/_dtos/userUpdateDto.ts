import { Profession } from "../_models/profession";
import { Location } from "../_models/location";

export class UserUpdateProfileDto {

    public id:number;
	
	public accountEmail:string;
	
	public identificationNumber:string;

	public accountName:string;
	
	public accountLastname:string;
	
	public phone:string;
									
	public locations:Array<Location>;
  }