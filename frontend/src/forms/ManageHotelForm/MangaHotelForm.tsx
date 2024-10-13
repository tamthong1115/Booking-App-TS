import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";
import { HotelTypeFrontend } from "../../types/types";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imagePublicIds: string[];
    imageUrls: string[];
    adultCount: number;
    childCount: number;
};

type Props = {
    hotel?: HotelTypeFrontend; // for edit
    onSave: (HotelFormData: FormData) => void;
    isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
    const formMethods = useForm<HotelFormData>({
        mode: "onBlur",
    });
    const { handleSubmit, reset } = formMethods;


    // reset the form when the hotel prop changes
    useEffect(() => {
        reset(hotel);
    }, [hotel, reset]);

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        // create new FormData and call API
        const formData = new FormData();
        // if in edit mode add the id to the request
        if (hotel) {
            formData.append("hotelId", hotel._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            });
        }

        if (formDataJson.imagePublicIds) {
            formDataJson.imagePublicIds.forEach((publicId, index) => {
                formData.append(`imagePublicIds[${index}]`, publicId);
            });
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append("imageFiles", imageFile);
        });

        // call the onSave function passed from the parent component
        onSave(formData);
    });
    // child component can access FormProvider
    return (
        <div>
            <FormProvider {...formMethods}>
                <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                    <DetailsSection />
                    <TypeSection />
                    <FacilitiesSection />
                    <GuestsSection />
                    <ImagesSection />
                    <span className="flex justify-end">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500 disabled:bg-gray-600"
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </span>
                </form>
            </FormProvider>
        </div>
    );
};

export default ManageHotelForm;
