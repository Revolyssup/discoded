/**This is the class for Data transfer Object that is being used to filter and validate the incoming object */
import codehash from '../codehash'
class UserDTO{
    code: string; 
    output:string;
    input:string;
    language:string;
    hashcode:string;
    constructor(obj:any){
        this.output=obj.output
        this.code=obj.code;
        this.input=obj.input;
        this.language=obj.language
        this.hashcode=codehash(this.code,this.input);
    }

    validate():Error | null{

        if(typeof(this.code)!=="string"){
            return new Error("code should be inside a string.")
        }       
        if(typeof(this.input)!=="string"){
            return new Error("input should be inside a string.")
        }      
        return null;
    }

}

export default UserDTO