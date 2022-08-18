import InputField from "../../../../components/InputField/InputField"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import IUploadDialogFormElementProps from "./UploadDialogElementInterface"
import {useEffect, useState} from 'react'

const UploadDialogElement = ({name, onChange, value, errorStatus, errorString, multiline} : IUploadDialogFormElementProps) => {


    return (
        <>
            <Grid item xs={2} />
            <Grid
                item
                xs={4}
            >
                <Typography>
                    {name}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <InputField
                    name={name}
                    textValue={value}
                    onChange={onChange}
                    fullWidth={false}
                    errorStatus={errorStatus}
                    errorString={errorString}
                    multiline={multiline}
                />
            </Grid>
            <Grid item xs={2} />
        </>
    );
}

export default UploadDialogElement