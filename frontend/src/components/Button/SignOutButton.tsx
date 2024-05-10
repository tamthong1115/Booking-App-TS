import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../api-client.ts";
import { useAppContext } from "../../context/AppContext.tsx";
// import MenuUser from "../MenuUser/MenuUser.tsx";
// import classNames from "classnames/bind";
// import styles from "./index.module.scss";
// import { MENU_ITEMS } from "../../config/types.tsx";

// const cx = classNames.bind(styles);

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken"); // from isError AppContext
            await queryClient.invalidateQueries("validateTokenAdmin"); // from isAdmin AppContext
            showToast({ message: "Sign Out!", type: "SUCCESS" });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    const handleClick = () => {
        mutation.mutate();
    };
    return (
        <div className="" onClick={handleClick}>
            Sign Out
        </div>
    );
};

export default SignOutButton;
