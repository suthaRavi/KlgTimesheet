export class TimeSheet {
    first_name: string;
    job_date: Date;
    job_times: JobTime[];

    constructor(values: Object = {}){
        Object.assign(this, values)}
}

export class JobTime {
    id: number;
    job_id: string;
    job_department: string;
    job_category: string;
    job_time: number;
    is_overtime: boolean;

    constructor(values: Object = {}){
        Object.assign(this, values)}

}
