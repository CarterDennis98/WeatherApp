import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Grow from '@mui/material/Grow';
import IconButton from "@mui/material/IconButton";
import Popper from '@mui/material/Popper';
import * as React from "react";
import AccountBox from './account-box';
import BookmarkedLocation from "./bookmarked-location";
import SearchBar from "./search-bar";

export default function Header(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const open = Boolean(anchorEl);
    const popperId = open ? "login-popper" : undefined;

    return (
        <div style={{
            height: "25%", width: "100%", backgroundColor: "#2b2b2b", boxShadow: "0px 5px 10px #151515", display: "flex", justifyContent: "space-between",
            boxSizing: "border-box", padding: "10px", alignItems: "center"
        }}>
            <div>
                <SearchBar
                    userCoords={props.userCoords}
                    setCoords={props.setCoords}
                />
            </div>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
                {props.user && props.user.bookmarks.length > 0 ?
                    props.user.bookmarks.map((location: any, index: number) => {
                        return (
                            <BookmarkedLocation
                                location={location}
                                last={index === props.user.bookmarks.length - 1}
                                setCoords={props.setCoords}
                                key={index}
                            />
                        );
                    }) :
                    null
                }
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <IconButton sx={{ color: "white" }} onClick={handleClick}>
                    <AccountCircleIcon />
                </IconButton>
                <Popper id={popperId} open={open} anchorEl={anchorEl} transition placement={"bottom-end"}>
                    {({ TransitionProps }) => (
                        <Grow {...TransitionProps} timeout={200}>
                            <div>
                                <AccountBox
                                    user={props.user}
                                    setUser={props.setUser}
                                />
                            </div>
                        </Grow>
                    )}
                </Popper>
                <IconButton sx={{ color: "white" }} onClick={() => window.open("https://github.com/CarterDennis98", "_blank")}>
                    <GitHubIcon />
                </IconButton>
                <IconButton sx={{ color: "white" }} onClick={() => window.open("https://www.linkedin.com/in/carter-dennis-893a38227/", "_blank")}>
                    <LinkedInIcon />
                </IconButton>
            </div>
        </div>
    )
}