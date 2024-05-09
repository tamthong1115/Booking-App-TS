import Button from "../Buttons";
import classNames from "classnames/bind";
import styles from "./MenuUser.module.scss";
import PropTypes from "prop-types";
import { EACH_ITEM, MENU_TYPES } from "../../config/types";

const cx = classNames.bind(styles);

type Props = {
    data: EACH_ITEM;
    onClick: (event: MouseEvent) => void;
};
function MenuUserItem({ data, onClick }: Props) {
    const classes = cx("menu-item", {
        separate: data.separate,
    });
    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

MenuUserItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuUserItem;
