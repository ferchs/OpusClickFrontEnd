export class ReviewImageUpdateDto {

    public reviewId:number;
	
	public datetime:Date;
		    
    public satisfactionLevel:number;

    public type:string;
		
    public comment:string;
	
	public image:string;
	
	public recommend:boolean;


	constructor(){
        this.reviewId=0;
        this.datetime=null;
		this.satisfactionLevel=0;
		this.type=null;
		this.comment=null;
		this.image=null;
		this.recommend=true;
	}
}