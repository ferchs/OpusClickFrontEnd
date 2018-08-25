export class Item {

    public id:number;
    public name:string;
    public value:number;
    public durationValue:number;
    public durationTime:string;
    public warrantyValue:number;
    public warrantyTime:string;
    public workDescription:string;
    public warrantyDescription:string;
    public imageQuote:string;
    public commentQuote:string;
    public imageContract:string;
    public commentContract:string;
    public selected:boolean;

    constructor(){
        this.id=undefined;
        this.name=null;
        this.value=undefined;
        this.durationValue=undefined;
        this.durationTime=null;
        this.warrantyValue=undefined;
        this.warrantyTime=null;
        this.workDescription=null;
        this.warrantyDescription=null;
        this.imageQuote=null;
        this.commentQuote=null;
        this.imageContract=null;
        this.commentContract=null;
        this.selected=false;
    }
    
  }