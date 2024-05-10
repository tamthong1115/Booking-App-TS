import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LoadingComponent from "../components/Loading/Loading.tsx";

const Profile = () => {
    const { data: currentUser } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);

    if (!currentUser) {
        return LoadingComponent({ isLoading: true });
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <div>
                <h2 className="text-xl font-semibold">Name: {currentUser.firstName + " " + currentUser.lastName}</h2>
                <h2 className="text-xl font-semibold">Email: {currentUser.email}</h2>
            </div>
        </div>
    );
};

export default Profile;
