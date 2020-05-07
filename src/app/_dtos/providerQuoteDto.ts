import { Item } from "../_models/Item";

export class ProviderQuoteDto {

    public number:string;
	
	public date:number;
	
	public clarifications:string;
	
	public subtotal:number;

	public administrationFee:number;
	
	public total:number;
	
	public items:Array<Item>;
}
