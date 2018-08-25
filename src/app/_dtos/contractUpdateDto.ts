import { MilestoneUpdateDto } from "../_dtos/milestoneUpdateDto";

export class ContractUpdateDto {

	public id:number;
				
	public clarifications:number;
	
	public state:string;
		
	public subtotal:number;

	public administrationFee:number;
	
	public totalValue:number;
	
	public milestones:Array<MilestoneUpdateDto>;

}