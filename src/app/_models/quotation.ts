export class Quotation {
    
    questions:Array<[string, string]>;
    schedule:string;
    address:string;
    neighborhood:string;
    workDescription:string;
  
    constructor(questions:Array<[string, string]>, schedule:string, address:string, neighborhood:string, workDescription:string){
      this.questions= questions;
      this.schedule= schedule;
      this.address= address;
      this.neighborhood=neighborhood;
      this.workDescription= workDescription;
    }
}