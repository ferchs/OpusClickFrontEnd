export class ProviderGetContractReviewDto {

	public reviewId:number;

	public contractName:string;
	
	public userName:string;
	
	public userLastname:string;
	
	public date:number;
	
	public reviewSatisfactionLevel:number;
	
	public reviewComment:string;
	
	public reviewImage:string;

	constructor(){

		this.reviewId=0;

		this.contractName=null;
	
		this.userName=null;
	
		this.userLastname=null;
	
		this.date=0;
	
		this.reviewSatisfactionLevel=0;
	
		this.reviewComment=null;
	
		this.reviewImage=null;
	}
	
}