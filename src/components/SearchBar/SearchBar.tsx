import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import styles from "./SearchBarStyles"
import {ISearchBarProps} from "./SearchBarInterface"
import { BACKGROUND_COLOR } from "../../utils/constants"
import SearchIcon from '@mui/icons-material/Search'
import {useState} from "react"

const SearchBar = ({width} : ISearchBarProps) => {
    const [query, setQuery] = useState<string>("");

    return (
        <div
            style={styles(width)}
        >
            <TextField
                variant="filled"
                label={query === "" ? "Search" : ""}
                onChange={(e : any) => setQuery(e.target.value)}
                size="small"
                fullWidth
                InputProps=
                            {
                                {
                                    disableUnderline: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }
                            }
                InputLabelProps={{shrink: false}}
                color="success"
            >

            </TextField>
        </div>
    );
}

export default SearchBar