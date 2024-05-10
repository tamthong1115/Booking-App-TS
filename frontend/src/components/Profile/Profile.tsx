import { useQuery } from "react-query";
import * as apiClient from "../../api-client.ts";
import LoadingComponent from "../Loading/Loading.tsx";
import classNames from "classnames/bind";
import styles from './Profile.module.scss'

const cx = classNames.bind(styles);

const Profile = () => {
    const { data: currentUser } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);

    if (!currentUser) {
        return LoadingComponent({ isLoading: true });
    }

    return (
        <div>
            <div className={cx("info-user")}>
                <div className={cx("title")}>
                    <h1 className={cx("heading")}>Personal information</h1>
                    <p className={cx("title")}>Update your information and learn how it is used.</p>
                </div>
                <div className={cx("inner")}>
                    <button className={cx("user-avatar")}>
                        <img
                            className={cx("avatar")}
                            src="https://th.bing.com/th/id/OIP.AlCmTPXExOup34O4RxOZmAHaEK?w=261&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                            alt="Avatar"
                        />
                    </button>
                </div>
            </div>
            <div>
                <div className={cx("info")}>
                    <p>Name</p>
                    <p>Huynh Ngoc Xuan</p>
                    <button className={cx("info-btn")}>Edit</button>
                </div>
                <div className={cx("info")}>
                    <p>Display name</p>
                    <p className={cx("description")}>Choose a display name</p>
                    <button className={cx("info-btn")}>Edit</button>
                </div>
                <div className={cx("info")}>
                    <p>Email address</p>
                    <p className={cx("description")}>1@mail.com</p>
                    <button className={cx("info-btn")}>Edit</button>
                </div>
                <div className={cx("info")}>
                    <p>Phone number</p>
                    <p className={cx("description")}>Add your phone number</p>
                    <button className={cx("info-btn")}>Edit</button>
                </div>
                <div className={cx("info")}>
                    <p>Date of birth</p>
                    <p className={cx("description")}>Enter your date of birth</p>
                    <button className={cx("info-btn")}>Edit</button>
                </div>
                <div className={cx("info")}>
                    <p>Nationality</p>
                    <p className={cx("description")}>Select your region/country</p>
                    <button className={cx("info-btn")}>Edit</button>
                </div>
                <div className={cx("info")}>
                    <p>Male</p>
                    <p className={cx("description")}>Choose Male</p>
                    <button className={cx("info-btn")}>Edit</button>
                </div>
                <div className={cx("info")}>
                    <p>Address</p>
                    <p className={cx("description")}>Choose address</p>
                    <button className={cx("info-btn")}>Edit</button>
                </div>
                <div className={cx("info")}>
                    <p>Passport information</p>
                    <p className={cx("description")}>Not provided yet</p>
                    <button className={cx("info-btn")}>Edit</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
