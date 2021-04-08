import crypto from 'crypto';
export default function generateFilename(code:string,input:string,lan:string):string{
    const codeplusinput={
        code,
        input,
        lan
    }
    // Using md5 algorithm
    return crypto.createHash('md5').update(JSON.stringify(codeplusinput)).digest("hex");
}