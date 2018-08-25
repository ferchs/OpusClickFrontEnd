import { MilestoneGetDto } from "../_dtos/milestoneGetDto";

export class ContractGetDto {

    public id:number;
	
	public contractNumber:string;
	
	public creationDate:number;
	
	public startDate:number;
	
	public endDate:number;
	
	public clarifications:string;
	
	public state:string;
	
	public subtotal:number;

	public administrationFee:number;
	
	public totalValue:number;
	
	public milestones:Array<MilestoneGetDto>;

	constructor(){
		this.id=0;
		this.contractNumber="";
		this.creationDate=0;
		this.startDate=0;
		this.endDate=0;
		this.clarifications="";
		this.state="";
		this.subtotal=0;
		this.administrationFee=0;
		this.totalValue=0;
		this.milestones=new Array<MilestoneGetDto>();
	}
}
