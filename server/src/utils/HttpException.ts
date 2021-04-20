/* Util class for custom error */

class HttpException extends Error {
    statusCode: number = 500;
    message: string;
    data:Array<object> = [];
    constructor(message:string) {
      super(message);
      this.message = message;
    }
  }
   
  export default HttpException;