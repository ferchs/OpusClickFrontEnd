import { Milestone } from "../_models/milestone";

export class ContractDto {

	public name:string;

    public clarifications:string;
	
	public state:string;
		
	public subtotal:number;

	public administrationFee:number;
	
	public totalValue:number;
	
	public milestones:Array<Milestone>;
}