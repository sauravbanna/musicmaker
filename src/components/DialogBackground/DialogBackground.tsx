import IDialogBackgroundProps from "./DialogBackgroundInterface"
import useFadeInComponent from "../../hooks/useFadeInComponent"

const DialogBackground = ({children} : IDialogBackgroundProps) => {
    const fadeDiv = useFadeInComponent(0);

    return (
        <div
            style=
                    {
                        {
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "100%",
                            minHeight: "100%",
                            zIndex: 9999
                        }
                    }
        >
            <div
                ref={fadeDiv}
                style=
                        {
                            {
                                position: "absolute",
                                zIndex: -1,
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                minHeight: "100%",
                                minWidth: "100%"
                            }
                        }
            />
                {children}
         </div>
    );
}

export default DialogBackground