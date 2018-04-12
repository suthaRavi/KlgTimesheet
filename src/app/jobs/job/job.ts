export class Job {
    id: number;
    job_id: string;
    name: string;
    customer_id: string;
    order_date:  Date;
    shipping_date:  Date;
    shipped_date: Date;
    estimated_hour: number;
    actual_hour:    number;
    status: string;
    previousjob_id: string;

    constructor(values: Object = {}){
        Object.assign(this, values)}
}

export class PreJob_id{
    pjob_id: string;

}
