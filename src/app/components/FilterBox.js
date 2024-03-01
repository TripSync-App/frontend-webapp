import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
export default function FilterBox (){
    const list = [
        {label: "Business"},
        {label: "Leisure"},
        {label: "Exploration"},
        {label: "Blended"},
        {label: "Winter"},
        {label: "Summer"}
    ]
    let options = list.map((option) => {
        const firstLetter = option.label[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });
    return (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
          groupBy={(option) => option.firstLetter}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      );
}