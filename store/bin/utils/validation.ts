

export const isRequired = (input:string) => (input === '' ? 'This value is required' : true);


export const isEmail = (input:string) =>{
    if(typeof input !== "undefined"){
        let lastAtPos = input.lastIndexOf('@');
        let lastDotPos = input.lastIndexOf('.');
 
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && input.indexOf('@@') === -1 && lastDotPos > 2 && (input.length - lastDotPos) > 2)) {
           return 'Enter valid email';
        }
    }else{
        return 'Email required!';
    }  
    return true;
}