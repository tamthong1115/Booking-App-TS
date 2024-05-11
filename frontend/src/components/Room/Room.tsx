import { HotelType, RoomType } from "../../../../backend/shared/types";
import * as apiClient from "../../api-client";
import { useQuery } from "react-query";
import LoadingComponent from "../Loading/Loading";
import RoomBooking from "./RoomBooking";
import { useState } from "react";

type Props = {
    hotel: HotelType;
};

const Room = ({ hotel }: Props) => {
    const hotelId = hotel._id;
    const [isRoomBookingOpen, setIsRoomBookingOpen] = useState(false);

    const { data: rooms, isLoading } = useQuery("getRooms", () => apiClient.getRooms(hotelId), {
        enabled: !!hotelId,
    });

    if (isLoading) {
        return LoadingComponent({ isLoading: true });
    }

    if (!rooms) {
        return <div>No rooms available</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <h2 className="col-span-full text-2xl font-bold">Rooms</h2>
            {rooms.map((room: RoomType, index: number) => (
                <div key={index} className="flex justify-between rounded border bg-white p-4 shadow-sm">
                    <div>
                        <h3 className="mb-2 text-lg font-semibold">{room.name}</h3>
                        <h3 className="mb-2 text-lg font-semibold">Type: {room.roomType}</h3>
                        <p className="text-gray-500">Description: {room.description}</p>
                    </div>

                    <div>
                        <h3 className="mb-2 text-lg font-semibold">Price: ${room.pricePerNight}</h3>
                        <button
                            onClick={() => {
                                setIsRoomBookingOpen(!isRoomBookingOpen);
                            }}
                            className="rounded bg-blue-600 p-2 font-semibold text-white"
                        >
                            Book
                        </button>
                    </div>

                    {isRoomBookingOpen && (
                        <RoomBooking
                            hotel={hotel}
                            room={room}
                            isRoomBookingOpen
                            onClose={() => setIsRoomBookingOpen(!isRoomBookingOpen)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Room;
