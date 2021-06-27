import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function LanguageSetter(prop:{handler:Function}){
const classes=useStyles()
const [lan,changeLan]=useState("cpp")
const handleChange = (e:any) => {
    changeLan(e.target.value);
    prop.handler(e.target.value)
  };
return(
    <div>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lan}
          onChange={handleChange}
        >
          <MenuItem value={"cpp"}>C++</MenuItem>
          <MenuItem value={"c"}>C</MenuItem>
          <MenuItem value={"javascript"}>Javascript</MenuItem>
          <MenuItem value={"python"}>Python</MenuItem>
          <MenuItem value={"golang"}>Go</MenuItem>
          <MenuItem value={"monkey"}>Monkey</MenuItem>
        </Select>
      </FormControl>
    </div>
)
}