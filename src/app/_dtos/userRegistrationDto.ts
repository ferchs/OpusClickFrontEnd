import { Location } from "../_models/location";

export class UserRegistrationDto {

  public email:string;
	
	public name:string;

	public lastname:string;
	
	public password:string;
	
	public matchingPassword:string;
								
	public userLocations:Array<Location>;
  }