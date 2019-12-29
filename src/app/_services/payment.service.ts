import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserInformationDto } from "../_dtos/userInformationDto";
import { Location } from "../_models/location";
import { UserService } from "../_services/user.service";
import { EPaycoService } from "../_services/epayco.service";
declare var jQuery:any;
declare var $:any;
@Injectable()
export class PaymentService {

    email:string;

    constructor(private userService:UserService, private ePaycoService: EPaycoService) {
    }

    makePayment(workId:string,value:number,description:string){
        this.userService.getUser(localStorage.getItem('email_user')).subscribe((userInformationDto:UserInformationDto)=>{
            if(userInformationDto.phone==undefined){
                userInformationDto.phone="";
            }
            if(userInformationDto.locations[0].address==undefined){
                userInformationDto.phone="";
            }
            let char = / /gi; 
            let desc = description.replace(char, "%"); 
            let tittle='El titulo de pago'
            let billNumber=this.generateBillNumber();

            const data = {
                //Parametros compra (obligatorio)
                name: tittle,
                description: description,
                invoice: ""+billNumber,
                currency: "cop",
                amount: ""+value,
                tax_base: "0",
                tax: "0",
                country: "co",
                //Onpage="false" - Standard="true"
                external: "true",
                extra1:workId,

                //Atributos opcionales
                response: "https://api.opusclick.com/v1/return",
                confirmation: "https://api.opusclick.com/v1/bills",

                //response: "http://localhost:8083/v1/return",
                //confirmation: "http://localhost:8083/v1/bills",

                //Atributos cliente
                email_billing: ""+userInformationDto.accountEmail,
                name_billing: userInformationDto.accountName+" "+userInformationDto.accountLastname,
                address_billing: ""+userInformationDto.locations[0].address
              }      
              this.ePaycoService.open(data);
            })
/*
            $('body').append("<form action='https://checkout.epayco.co/checkout.js' method='post' id='payment_form'>"
            +"<input type='hidden' name='data-epayco-external' value='true'>"
            +"<input type='hidden' name='data-epayco-key' value="+environment.terminalPublicKey+" >"
            +"<input type='hidden' name='data-epayco-invoice' value="+this.generateBillNumber()+" >"
            +"<input type='hidden' name='data-epayco-amount' value="+value+" >"
            +"<input type='hidden' name='data-epayco-currency' value='COP'>"
            +"<input type='hidden' name='data-epayco-test' value='true'>"
            +"<input type='hidden' name='data-epayco-name' value="+"'"+tittle+"'"+" >"
            +"<input type='hidden' name='data-epayco-description' value="+"'"+description+"'"+" >"
            +"<input type='hidden' name='data-epayco-extra1' value="+workId+" >"
            +"<input type='hidden' name='data-epayco-name-billing' value="+"'"+userInformationDto.accountName+" "+userInformationDto.accountLastname+"'"+" >"
            +"<input type='hidden' name='data-epayco-email-billing' value="+"'"+userInformationDto.accountEmail+"'"+" >"
            +"<input type='hidden' name='data-epayco-address-billing' value="+"'"+userInformationDto.locations[0].address+"'"+" >"
            +"</form>");
            $('#payment_form').submit();
          })*/
    }
    
        private handleError (error: Response) {
          console.log(error);
            return Observable.throw(error);        
        }

    private generateBillNumber(){
        let uuid=this.generateNumericUUID();
        let numbers=uuid.split('-');
        return (+numbers[0])+(+numbers[1])+(+numbers[2])+(+numbers[3])+(+numbers[4])
    }

    private generateNumericUUID(){
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxx-xxx-4xxx-yxxx-xxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            if(c === 'x'){
                let char=r.toString(16);
                if(!(/^\d+$/.test(char))){
                    return char.charCodeAt(0)-97+'';
                }else{
                    return char;
                }
            }else{
                let char=(r & 0x3 | 0x8).toString(16);
                if(!(/^\d+$/.test(char))){
                    return char.charCodeAt(0)-97+''
                }else{
                    return char;
                }
            }
            //return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

}