import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
declare var jQuery:any;
declare var $:any;
@Injectable()
export class PaymentService {

    private paymentGatewayUrl ='https://gateway2.tucompra.com.co/tc/app/inputs/compra.jsp';

    
    constructor(private http: HttpClient) {
    }

    makePayment(workId:string,value:number,description:string){
        $('body').append("<form action='https://gateway2.tucompra.com.co/tc/app/inputs/compra.jsp' method='post' id='payment_form'>"
        +"<input type='hidden' name='usuario' value="+environment.terminalUser+" >"
        +"<input type='hidden' name='factura' value="+this.generateBillNumber()+" >"
        +"<input type='hidden' name='valor' value="+value+" >"
        +"<input type='hidden' name='descripcionFactura' value="+"'"+description+"'"+" >"
        +"<input type='hidden' name='campoExtra1' value="+workId+" >"
        +"</form>");
        $('#payment_form').submit();
    }
    
        private handleError (error: Response) {
          console.log(error);
            return Observable.throw(error);        
        }

    private generateBillNumber(){
        let uuid=this.generateNumericUUID();
        console.log(uuid);
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