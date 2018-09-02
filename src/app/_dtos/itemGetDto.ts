
export class ItemGetDto {

    public id:number;
	
	public name:string;
	
	public value:number;
	
	public durationValue:number;
	
	public durationTime:string;
	
	public warrantyValue:number;
	
	public warrantyTime:string;
	
	public workDescription:string;
	
	public warrantyDescription:string;
		
	public imageContract:string;
		
	public commentContract:string;

	public selected:boolean;
	
	constructor(){
		this.id=0;
		this.name="";
		this.value=0;
		this.durationValue=0;
		this.durationTime="";
		this.warrantyValue=0;
		this.warrantyTime="";
		this.workDescription="";
		this.warrantyDescription="";
		this.imageContract="";
		this.commentContract="";
		this.selected=false;
	}
}