import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export default function AxiosWithRetries(limit: number = 5, sleep: number = 100) {
    
    return async function(config: AxiosRequestConfig): Promise<AxiosPromise<any>> {
        let currentTry = 1;
        
        return (async function _internal(config: AxiosRequestConfig): Promise<AxiosPromise<any>> {
            return new Promise((resolve, reject) => {
                axios(config).then(res => resolve(res)).catch(err => {
                    console.error("[ERROR WITH REQUEST]");
    
                    if (++currentTry > limit) {
                        reject(err);
                        return;
                    }
    
                    setTimeout(() => {
                        _internal(config).then(res => resolve(res)).catch(err => reject(err))
                    }, sleep)
                })
            });
        })(config)
    }
}
