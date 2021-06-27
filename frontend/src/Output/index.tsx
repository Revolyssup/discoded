import CircularProgress from '@material-ui/core/CircularProgress';
import IOutput from './ouput';

export default function Output(props:{isLoading:boolean,out:IOutput}){
    if(props.isLoading) return <CircularProgress/>
    return (<div>
        <div>
            <h2>Output: {props.out.output}</h2>
        </div>
        <div>
            <h2>StdErr: {props.out.stderror}</h2>
        </div>
        <div>
            <h2>Error: {props.out.error}</h2>
        </div>
    </div>)
}