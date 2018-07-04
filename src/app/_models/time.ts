export class Time {

    private hour:string;
    private description:string;
    private defaultList:Array<Time>;

    constructor(hour:string,description:string){
      this.hour=hour;
      this.description=description;
    }
    
    getHour(){
        return this.hour;
    }

    getNumberHour(){
        if(this.hour==="08:00:00" || this.hour==="08:30:00"){
            return 8;
        }
        if(this.hour==="09:00:00" || this.hour==="09:30:00"){
            return 9;
        }
        if(this.hour==="10:00:00" || this.hour==="10:30:00"){
            return 10;
        }
        if(this.hour==="11:00:00" || this.hour==="11:30:00"){
            return 11;
        }
        if(this.hour==="12:00:00" || this.hour==="12:30:00"){
            return 12;
        }
        if(this.hour==="13:00:00" || this.hour==="13:30:00"){
            return 13;
        }
        if(this.hour==="14:00:00" || this.hour==="14:30:00"){
            return 14;
        }
        if(this.hour==="15:00:00" || this.hour=== "15:30:00"){
            return 15;
        }
        if(this.hour==="16:00:00" || this.hour==="16:30:00"){
            return 16;
        }
        if(this.hour==="17:00:00" || this.hour==="17:30:00"){
            return 17;
        }
        if(this.hour==="18:00:00" || this.hour==="18:30:00"){
            return 18;
        }
        if(this.hour==="19:00:00" || this.hour==="19:30:00"){
            return 19;
        }
        if(this.hour==="20:00:00"){
            return 20;
        }
        return undefined;
    }

    getNumberMinute(){
        if(this.hour.endsWith('30:00')){
            return 30;
        }
        if(this.hour.endsWith('00:00')){
            return 0;
        }
        return undefined;
    }

    getDescription(){
        return this.description;
    }

    getDefaultTimeList(){
        this.defaultList=new Array<Time>();
        this.defaultList.push(new Time("08:00:00","08:00 AM"));
        this.defaultList.push(new Time("08:30:00","08:30 AM"));
        this.defaultList.push(new Time("09:00:00","09:00 AM"));
        this.defaultList.push(new Time("09:30:00","09:30 AM"));
        this.defaultList.push(new Time("10:00:00","10:00 AM"));
        this.defaultList.push(new Time("10:30:00","10:30 AM"));
        this.defaultList.push(new Time("11:00:00","11:00 AM"));
        this.defaultList.push(new Time("11:30:00","11:30 AM"));
        this.defaultList.push(new Time("12:00:00","12:00 PM"));
        this.defaultList.push(new Time("12:30:00","12:30 PM"));
        this.defaultList.push(new Time("13:00:00","01:00 PM"));
        this.defaultList.push(new Time("13:30:00","01:30 PM"));
        this.defaultList.push(new Time("14:00:00","02:00 PM"));
        this.defaultList.push(new Time("14:30:00","02:30 PM"));
        this.defaultList.push(new Time("15:00:00","03:00 PM"));
        this.defaultList.push(new Time("15:30:00","03:30 PM"));
        this.defaultList.push(new Time("16:00:00","04:00 PM"));
        this.defaultList.push(new Time("16:30:00","04:30 PM"));
        this.defaultList.push(new Time("17:00:00","05:00 PM"));
        this.defaultList.push(new Time("17:30:00","05:30 PM"));
        this.defaultList.push(new Time("18:00:00","06:00 PM"));
        this.defaultList.push(new Time("18:30:00","06:30 PM"));
        this.defaultList.push(new Time("19:00:00","07:00 PM"));
        this.defaultList.push(new Time("19:30:00","07:30 PM"));
        this.defaultList.push(new Time("20:00:00","08:00 PM"));
        return this.defaultList;
    }
  }