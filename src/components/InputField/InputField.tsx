import InputFieldProps from "./InputFieldInterface"
import StyledTextField from "./InputFieldStyles"

const InputField = ({name, password, errorStatus, errorString, textValue, onChange, fullWidth, multiline} : InputFieldProps) => {
    const inputProps = multiline ? {maxLength: 250} : undefined

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
            type={password ? "password" : undefined}
            multiline={multiline}
            inputProps={inputProps}
        />
    );
}

export default InputField;
