import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useQuery } from "react-query";
import SignOutButton from "../Button/SignOutButton.tsx";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./UserMenu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { fetchCurrentUser } from "../../ApiClient/api-users.ts";
import { useAppContext } from "../../context/AppContext.tsx";

const cx = classNames.bind(styles);

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { isAdmin } = useAppContext();

    const { data: user } = useQuery("fetchCurrentUser", () => fetchCurrentUser());

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div className={cx("user")}>
                <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <div className={cx("user-avatar")}>
                        <img
                            className={cx("avatar")}
                            src="https://th.bing.com/th/id/OIP.AlCmTPXExOup34O4RxOZmAHaEK?w=261&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                            alt="Avatar"
                        />
                    </div>
                    <p className={cx("user-name")}>{user?.firstName + " " + user?.lastName}</p>
                </Button>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClose}>
                    <FontAwesomeIcon className={cx("icon")} icon={faUser} />
                    <Link to={"/profile"}>View profile</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <FontAwesomeIcon className={cx("icon")} icon={faKey} />
                    <Link to="/my-bookings">My Bookings</Link>
                </MenuItem>
                {isAdmin && (
                    <MenuItem onClick={handleClose}>
                        <FontAwesomeIcon className={cx("icon")} icon={faKey} />
                        <>
                            <Link to="/my-hotels">My Hotels</Link>
                        </>
                    </MenuItem>
                )}
                <MenuItem>
                    <FontAwesomeIcon className={cx("icon")} icon={faRightFromBracket} />
                    <SignOutButton />
                </MenuItem>
            </Menu>
        </div>
    );
}
