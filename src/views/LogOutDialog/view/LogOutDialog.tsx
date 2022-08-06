import LogOutDialogBox from "../components/LogOutDialogBox"
import ILogOutDialogProps from "./LogOutDialogInterface"
import useFadeInComponent from "../../../hooks/useFadeInComponent"

const LogOutDialog = ({prevLink} : ILogOutDialogProps) => {
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
            <LogOutDialogBox prevLink={prevLink}/>
         </div>
    );
}

export default LogOutDialog