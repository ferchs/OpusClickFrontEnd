export class Profession {
  
  public id:number;
  public name:string;
  public formId:string;
  
  constructor(){
  }
  public setId(newId:number){
    this.id=newId;
  }

  public setName(newName:string){
    this.name=newName;
  }
}