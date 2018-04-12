export class Customer {
    id: number;
    customer_id: string;
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    fax: string

    constructor(values: Object = {}){
        Object.assign(this, values)}
}
