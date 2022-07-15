import AppMenuItem from "./AppMenuItem"
import { IMenuItemInfo, AppMenuProps } from "./AppMenuInterface"
import { FADE_IN } from "../../utils/constants"
import {accordionSummaryStyles, accordionDetailsStyles, accordionStyles, itemStyles} from "./AppMenuStyles"
import Stack from "@mui/material/Stack"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Typography from "@mui/material/Typography"
import AppDivider from "../AppDivider/AppDivider"
import {useState, useEffect} from 'react'



const AppMenu = ({menuItems} : AppMenuProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const expand = () => setExpanded((prev : boolean) => !prev);

    return (
        <Accordion
            expanded={expanded}
            disableGutters
            sx={accordionStyles()}
            onMouseEnter={expand}
            onMouseLeave={expand}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={accordionSummaryStyles()}
            >
                <Typography variant="h6">
                    {"Profile"}
                </Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={accordionDetailsStyles()}
            >
                <Stack>
                    {menuItems.map((ele, i) => {
                        const {name, link} = ele;
                        return (
                            <div style={{minWidth: "100%"}}>
                                {i == 0 ? null : <AppDivider orientation="horizontal"/>}
                                <AppMenuItem name={name} link={link} />
                            </div>
                        );
                    })}
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default AppMenu