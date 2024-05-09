import classNames from "classnames/bind";
import { Wrapper as PopperWrapper } from "../Popper";
import styles from "./MenuUser.module.scss";
import MenuUserItem from "./MenuUserItem";
import Tippy from "@tippyjs/react/headless";
import Header from "./Header";
import { useState } from "react";
import PropTypes from "prop-types";

import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../api-client.ts";
import { useAppContext } from "../../context/AppContext.tsx";
import { MENU_TYPES } from "../../config/types.tsx";

const cx = classNames.bind(styles);

type Props = {
    children?: React.ReactNode;
    items: MENU_TYPES;
    hideOnClick?: boolean;
    onChange: () => void;
};

function MenuUser({ children, items, hideOnClick = false, onChange }: Props) {
    items = items || [];

    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken"); // from isError AppContext
            showToast({ message: "Sign Out!", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuUserItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else if (item.title === "Sign Out") {
                            mutation.mutate();
                        } else {
                            onChange();
                        }
                    }}
                />
            );
        });
    };

    const renderResult = (attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx("menu-popper")}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx("menu-body")}> {renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    const handleMenuToFirst = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    return (
        <Tippy
            delay={[0, 300]}
            interactive
            hideOnClick={hideOnClick}
            offset={[10, 4]}
            placement="bottom-end"
            render={renderResult}
            onHide={handleMenuToFirst}
        >
            {children}
        </Tippy>
    );
}

MenuUser.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default MenuUser;
