export class Member {
    id: number;
    member_id: string ;
    first_name: string ;
    last_name: string ;
    department: string;
    role: string;
    reporting_id: string ;
    join_date :Date;
    end_date :Date;
    category : string;
    pay_rate : number;
    status : string;
    constructor(values: Object = { }){
        Object.assign(this, values)
    }
}
