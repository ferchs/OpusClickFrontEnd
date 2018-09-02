
export class ReviewDto {

    public satisfactionLevel:number;
	
	public type:string;
	
    public comment:string;
	
	public image:string;
	
	public recommend:boolean;


	constructor(){
		this.satisfactionLevel=0;
		this.type=null;
		this.comment=null;
		this.image=null;
		this.recommend=true;
	}
}