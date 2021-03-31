/**This is the class for Data transfer Object that is being used to filter and validate the incoming object */
import codehash from '../codehash'

class UserDTO{
    code: string; 
    output:string| null='';
    input:string;
    language:string;
    hashcode:string;
    error:string='';
    stderror:string='';
    forcerun:boolean=false;
    constructor(obj:any){
        this.output=obj.output
        this.code=obj.code;
        this.input=obj.input;
        this.language=obj.language
        this.hashcode=codehash(this.code,this.input);
        if(obj.forcerun) this.forcerun=true;
    }

    validate():Error | null{

        if(typeof(this.code)!=="string"){
            return new Error("Invalid Code.")
        }       
        if(typeof(this.input)!=="string"){
            return new Error("Invalid input")
        }      
        if(typeof(this.language)!=="string"){
            return new Error("Invalid language")
        }    
        return null;
    }

}

export default UserDTO