import { User } from "../_models/user";
import { Provider } from "../_models/provider";

export class Account {
    
      email: string;
      name: string;
      lastname: string;
      password: string;
      matchingPassword:string;
      user: User;
      provider:Provider;
    
      constructor(email: string, name: string, lastname: string, password: string, 
        matchingPassword: string, user: User, provider: Provider){
        this.email= email;
        this.name= name;
        this.lastname= lastname;
        this.password= password;
        this.matchingPassword= matchingPassword;
        this.user=user;
        this.provider=provider;
      }
}