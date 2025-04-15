export class Deferred<DeferType> {
    private _promise: Promise<DeferType>;
    constructor() {
      this._promise = new Promise<DeferType>((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    }
  
    getPromise() {
      return this._promise;
    }
  
    resolve(value: DeferType) {
      this.resolve(value);
    }
  
    reject(reason: any) {
      this.reject(reason);
    }
  }