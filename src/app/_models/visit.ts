export class Visit {
    
    date:Date;
    schedule:string;
    address:string;
    neighborhood:string;
    workDescription:string;
  
    constructor(date:Date, schedule:string, address:string, neighborhood:string, workDescription:string){
      this.date= date;
      this.schedule= schedule;
      this.address= address;
      this.neighborhood= neighborhood;
      this.workDescription= workDescription;
    }
}