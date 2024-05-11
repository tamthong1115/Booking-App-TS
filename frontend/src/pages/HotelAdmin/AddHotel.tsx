import { useMutation } from "react-query";
import ManageHotelForm from "../../forms/ManageHotelForm/MangaHotelForm.tsx";
import { useAppContext } from "../../context/AppContext.tsx";
import * as apiClient from "../../api-client.ts";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS" });
            if (!isLoading) navigate("/my-hotels");
        },
        onError: (error: Error) => {
            showToast({
                message: error.message ? error.message : "Hotel save failed!",
                type: "ERROR",
            });
        },
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };

    return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
