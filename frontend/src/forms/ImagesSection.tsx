import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./MangaHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Images</h2>
      <div className="flex flex-col gap-4 rounded border p-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full font-normal text-gray-700"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0) {
                return "At least one image should be added.";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6.";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-sm text-red-700">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
