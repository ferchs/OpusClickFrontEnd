import { ItemGetDto } from "../_dtos/itemGetDto";

export class MilestoneGetDto {

    public id:number;
	
	public startDate:number;
	
	public endDate:number;
	
	public state:string;
	
	public item:ItemGetDto;

	constructor(){
		this.id=0;
		this.startDate=0;
		this.endDate=0;
		this.state="";
		this.item= new ItemGetDto();
	}
}