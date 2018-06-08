export class Question {
    id:string;
    description:string;
    page:number;

    constructor(id:string, description:string, page:number){
      this.id=id;
      this.description= description;
      this.page= page;
    }
}