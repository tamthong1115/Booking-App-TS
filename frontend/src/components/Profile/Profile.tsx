import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingComponent from "../Loading/Loading.tsx";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useState } from "react";
import { UserType } from "../../../../backend/shared/types.ts";
import { useAppContext } from "../../context/AppContext.tsx";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fetchCurrentUser, updateUser } from "../../ApiClient/api-users.ts";

const cx = classNames.bind(styles);

const Profile = () => {
    const [gender, setGender] = useState("");

    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const [isEditing, setIsEditing] = useState({
        name: false,
        displayName: false,
        email: false,
        phoneNumber: false,
        birthday: false,
        nationality: false,
        gender: false,
        address: false,
    });

    const { data: currentUser, isLoading } = useQuery("fetchCurrentUser", fetchCurrentUser);

    const { mutate, isLoading: isLoadingUpdate } = useMutation(updateUser, {
        onSuccess: () => {
            showToast({ message: "User updated!", type: "SUCCESS" });
            queryClient.invalidateQueries("fetchCurrentUser").then((r) => console.log(r));
        },
        onError: (error: Error) => {
            console.log(error.message);
        },
    });

    const handleChangeGender = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
    };

    if (!currentUser) {
        return LoadingComponent({ isLoading: true });
    }

    const handleUpdate = (user: UserType) => {
        mutate(user);
    };

    if (isLoading || isLoadingUpdate) return LoadingComponent({ isLoading: true });

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
                    {isEditing.name ? (
                        <div className="flex gap-10">
                            <div className="flex flex-col">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className={" rounded border border-black px-2 py-1 font-normal"}
                                    defaultValue={currentUser.firstName}
                                    onChange={(e) => {
                                        currentUser.firstName = e.target.value;
                                    }}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className={" rounded border border-black px-2 py-1 font-normal"}
                                    defaultValue={currentUser.lastName}
                                    onChange={(e) => {
                                        currentUser.lastName = e.target.value;
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <p>{currentUser.firstName + " " + currentUser.lastName}</p>
                    )}
                    <button
                        className={cx("info-btn")}
                        onClick={() => {
                            setIsEditing({ ...isEditing, name: !isEditing.name });
                            if (isEditing.name) {
                                handleUpdate({ ...currentUser });
                                console.log(currentUser);
                            }
                        }}
                    >
                        {isEditing.name ? "Save" : "Edit"}
                    </button>{" "}
                </div>

                <div className={cx("info")}>
                    <p>Email address</p>
                    <p className={cx("description")}>{currentUser.email}</p>
                    <div className={cx("info-btn hover:bg-white")}></div>
                </div>

                <div className={cx("info")}>
                    <p>Phone number</p>
                    {isEditing.phoneNumber ? (
                        <input
                            type="text"
                            className={" rounded border border-black px-2 py-1 font-normal"}
                            defaultValue={currentUser.phoneNumber}
                            onChange={(e) => {
                                currentUser.phoneNumber = e.target.value;
                            }}
                        />
                    ) : (
                        <p className={cx("description")}>{currentUser.phoneNumber || "Add your phone number"}</p>
                    )}
                    <button
                        className={cx("info-btn")}
                        onClick={() => {
                            setIsEditing({ ...isEditing, phoneNumber: !isEditing.phoneNumber });
                            if (isEditing.phoneNumber) {
                                handleUpdate({ ...currentUser });
                            }
                        }}
                    >
                        {isEditing.phoneNumber ? "Save" : "Edit"}
                    </button>
                </div>

                <div className={cx("info")}>
                    <p>Date of birth</p>
                    {isEditing.birthday ? (
                        <input
                            type="date"
                            className={" w-1/5 rounded border border-black px-2 py-1 font-normal"}
                            defaultValue={currentUser.birthday?.toString()}
                            value={gender}
                            onChange={(e) => {
                                currentUser.birthday = new Date(e.target.value);
                            }}
                        />
                    ) : (
                        <p className={cx("description")}>
                            {new Date(currentUser.birthday as Date).toLocaleDateString("en-GB").toString() ||
                                "Add your birthday"}
                        </p>
                    )}
                    <button
                        className={cx("info-btn")}
                        onClick={() => {
                            setIsEditing({ ...isEditing, birthday: !isEditing.birthday });
                            if (isEditing.birthday) {
                                handleUpdate({ ...currentUser });
                            }
                        }}
                    >
                        {isEditing.birthday ? "Save" : "Edit"}
                    </button>
                </div>

                {/*Nationality*/}
                <div className={cx("info")}>
                    <p>Nationality</p>
                    {isEditing.nationality ? (
                        <input
                            type="text"
                            className={" rounded border border-black px-2 py-1 font-normal"}
                            defaultValue={currentUser.nationality}
                            onChange={(e) => {
                                currentUser.nationality = e.target.value;
                            }}
                        />
                    ) : (
                        <p className={cx("description")}>{currentUser.nationality || "Add your nationality"}</p>
                    )}
                    <button
                        className={cx("info-btn")}
                        onClick={() => {
                            setIsEditing({ ...isEditing, nationality: !isEditing.nationality });
                            if (isEditing.nationality) {
                                handleUpdate({ ...currentUser });
                            }
                        }}
                    >
                        {isEditing.nationality ? "Save" : "Edit"}
                    </button>
                </div>

                {/* Gender*/}

                <div className={cx("info")}>
                    <p>Gender</p>
                    {isEditing.gender ? (
                        <Select
                            className={"w-1/5"}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Age"
                            onChange={(e: SelectChangeEvent) => {
                                handleChangeGender(e);
                                currentUser.gender = e.target.value;
                            }}
                        >
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                    ) : (
                        <p className={cx("description")}>
                            {currentUser.gender
                                ? currentUser.gender.charAt(0).toUpperCase() + currentUser.gender.slice(1)
                                : "Choose your gender"}
                        </p>
                    )}
                    <button
                        className={cx("info-btn")}
                        onClick={() => {
                            setIsEditing({ ...isEditing, gender: !isEditing.gender });
                            if (isEditing.gender) {
                                handleUpdate({ ...currentUser });
                            }
                        }}
                    >
                        {isEditing.gender ? "Save" : "Edit"}
                    </button>
                </div>

                <div className={cx("info")}>
                    <p>Address</p>
                    {isEditing.address ? (
                        <input
                            type="text"
                            className={" rounded border border-black px-2 py-1 font-normal"}
                            defaultValue={currentUser.address}
                            onChange={(e) => {
                                currentUser.address = e.target.value;
                            }}
                        />
                    ) : (
                        <p className={cx("description")}>{currentUser.address || "Add your address"}</p>
                    )}
                    <button
                        className={cx("info-btn")}
                        onClick={() => {
                            setIsEditing({ ...isEditing, address: !isEditing.address });
                            if (isEditing.address) {
                                handleUpdate({ ...currentUser });
                            }
                        }}
                    >
                        {isEditing.address ? "Save" : "Edit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
