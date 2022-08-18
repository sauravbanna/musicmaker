import IUploadDialogFormProps from "./UploadDialogFormInterface"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import UploadDialogElement from "../UploadDialogElement/UploadDialogElement"
import AppButton from "../../../../components/AppButton/AppButton"
import useInputAndError from "../../../../hooks/useInputAndError"
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DoneIcon from '@mui/icons-material/Done'
import {useRef, useState, useEffect} from 'react'


const UploadDialogForm = ({title, description, image} : IUploadDialogFormProps) => {

    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const imageRef = useRef<any>();

    useEffect(() => {
        displayImage();
    }, [image.value])

    const displayImage = () => {
        if (image.value) {
            imageRef.current.style.display = "initial"

            const fr = new FileReader();

            fr.onload = () => {
                imageRef.current.src = fr.result;
            }

            fr.readAsDataURL(image.value);
        } else {
            imageRef.current.style.display = "none"
        }
    }

    return (
        <>
            <UploadDialogElement
                name="Title"
                value={title.value}
                onChange={(e: any) => title.setValue(e.target.value)}
                errorStatus={title.valueError !== ""}
                errorString={title.valueError}
            />
            <UploadDialogElement
                name="Description"
                value={description.value}
                onChange={(e: any) => description.setValue(e.target.value)}
                errorStatus={description.valueError !== ""}
                errorString={description.valueError}
                multiline={true}
            />
            <Grid item xs={2} />
            <Grid
                item
                xs={4}
            >
                <Typography>
                    {"Cover Art"}
                </Typography>
            </Grid>
            <Grid
                item
                xs={4}
                sx={
                    {
                        alignItems: "flex-end",
                        display: "flex"
                    }
                }
            >
                <img
                    ref={imageRef}
                    width="125vh"
                    height="125vh"
                />
                &nbsp;
                &nbsp;
                &nbsp;
                <AppButton
                    name=""
                    onClick={() => imageInputRef.current!.click()}
                >
                    <FileUploadIcon />
                    <input
                        type='file'
                        ref={imageInputRef}
                        id='coverArtUpload'
                        onChange={(e: any) => {
                            image.setValue(e.target.files[0]);
                        }}
                        onClick={(event : any) => {
                            event.target.value = null;
                        }}
                        accept='image/*'
                        style={{display: "none"}}
                    />
                </AppButton>
                &nbsp;
                &nbsp;
                &nbsp;
                <Typography variant="subtitle1" sx={{color: "rgb(247, 49, 49)"}}>
                    {image.valueError}
                </Typography>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={12} />
        </>
    );
}

export default UploadDialogForm