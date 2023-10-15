export class QueryArrayResult<T> {
    constructor(public messages?: Array<string>, public entities?: Array<T>, public success?: boolean) {}
  }
  
export class QueryOneResult<T> {
    constructor(public messages?: Array<string>, public entity?: T, public success?: boolean) {}
  }
  