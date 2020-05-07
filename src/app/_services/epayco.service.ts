import { Injectable } from '@angular/core';

declare var ePayco;
@Injectable()
export class EPaycoService {

    handler = ePayco.checkout.configure({
        key: 'a597deebb3d553b008824a39fccf1c2f',
        test: true
    })

    constructor() {}

    open(data) {
        this.handler.open(data)
    }

}