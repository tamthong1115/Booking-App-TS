import { useMutation } from "react-query";
import ManageHotelForm from "../../forms/ManageHotelForm/MangaHotelForm.tsx";
import { useAppContext } from "../../context/AppContext.tsx";
import { useNavigate } from "react-router-dom";
import { addMyHotel } from "../../ApiClient/api-hotels.ts";

const AddHotel = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation(addMyHotel, {
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
