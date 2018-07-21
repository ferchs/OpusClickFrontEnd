export class Question {
    id:string;
    description:string;
    last:boolean

    constructor(id:string, description:string, last:boolean){
      this.id=id;
      this.description= description;
      this.last= last;
    }
}