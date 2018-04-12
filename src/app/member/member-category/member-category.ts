export class MemberCategory {
    id: number;
    code: string;
    name: string;
    constructor(values: Object = { }){
        Object.assign(this, values)
    }
}
