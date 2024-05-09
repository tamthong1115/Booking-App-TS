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
        <button
          className="bg-white px-3 font-bold text-blue-600 hover:bg-gray-100 rounded"
          onClick={handleClick}
        >
          Sign Out
        </button>
        // <MenuUser items={MENU_ITEMS}>
        //     <div className={cx("user")}>
        //         <div className={cx("user-avatar")}>
        //             <img
        //                 className={cx("img")}
        //                 src="https://th.bing.com/th/id/OIP.BY4DB8IiXumaa9v5Wiz0fgHaNK?w=115&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7"
        //                 alt="Huỳnh Ngọc Xuân"
        //             />
        //         </div>
        //         <p className={cx("user-name")}>Huỳnh Ngọc Xuân</p>
        //     </div>
        // </MenuUser>
    );
};

export default SignOutButton;
