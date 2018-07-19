import { Profession } from "../_models/profession";
import { City } from "../_models/city";

export class ProviderRegistrationDto {

    public email:string;
	
	public name:string;

	public lastname:string;
	
	public password:string;
	
	public matchingPassword:string;
					
	public providerPhone:string;
		
	public profession:Profession;
		
	public city:City;
  }