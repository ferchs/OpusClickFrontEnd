import { State } from "../_models/state";

export class VisitGetDto {

    public id:number;
	
	public code:string;

	public securityPin:string;

	public state:string;
	
	public date:Date; 
	
	public alternativeDate:Date; 
	
	public address:string ;
	
	public neighborhood:string ;
	
	public description:string ;
	
	public lowerLimit:string;

	public alternativeLowerLimit:string;
	
	public upperLimit:string;
	
	public alternativeUpperLimit:string;
    
    public workId:number;
    	
}