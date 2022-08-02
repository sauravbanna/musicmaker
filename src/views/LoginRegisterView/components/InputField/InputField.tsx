import InputFieldProps from "./InputFieldInterface"
import StyledTextField from "./InputFieldStyles"

const InputField = ({name, errorStatus, errorString, textValue, onChange, fullWidth} : InputFieldProps) => {
    return (
        <StyledTextField
            InputLabelProps={{shrink: false}}
            error={errorStatus}
            variant="outlined"
            helperText={errorString}
            label= {textValue === "" ? name : ""}
            color="success"
            fullWidth={fullWidth}
            onChange={onChange}
        />
    );
}

export default InputField;
