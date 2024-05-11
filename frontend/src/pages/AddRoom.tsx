import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageRoomForm, { RoomFormData } from "../forms/RoomForm/RoomForm";
import { useAppContext } from "../context/AppContext";

const AddRoom = () => {
    const { showToast } = useAppContext();
    const {hotelId} = useParams()
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(apiClient.addNewRoom, {
        onSuccess: () => {
            showToast({ message: "Room Added!", type: "SUCCESS" });
            navigate(`/detail/${hotelId}`);
        },
        onError: () => {
            showToast({ message: "Error Adding Room", type: "ERROR" });
        },
    });

    const handleSave = (roomFormData : RoomFormData) => {
        mutate(roomFormData);
    };

    return <ManageRoomForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddRoom;
