import React, { useEffect, useRef } from "react";
import react from "react-dom";
import { HotelType, RoomType } from "../../../../backend/shared/types";
import GuestInfoForm from "../../forms/GuestInfoForm/GuestInfoForm";
import { AiFillStar } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
    hotel: HotelType;
    room: RoomType;
    isRoomBookingOpen: boolean;
    onClose: () => void;
};

const OVERLAY_STYLES: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
};
const MODAL_STYLE: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    width: "80%",
    height: "80%",
    borderRadius: "8px",
    padding: "20px",
    zIndex: 1001,
};

const RoomBooking = ({ hotel, room, isRoomBookingOpen, onClose }: Props) => {
    const modalContentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleClickInside = (event: MouseEvent) => {
            event.stopPropagation();
        };

        if (modalContentRef.current) {
            modalContentRef.current.addEventListener("mousedown", handleClickInside);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (modalContentRef.current) {
                modalContentRef.current.removeEventListener("mousedown", handleClickInside);
            }
        };
    }, [onClose]);

    if (!isRoomBookingOpen) return null;

    return react.createPortal(
        <div>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLE} ref={modalContentRef}>
                <div className="space-y-5">
                    <div className="flex justify-end ">
                        <FontAwesomeIcon className="p-4  hover:bg-gray-100" icon={faXmark} onClick={onClose} />
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <span className="flex">
                                {Array.from({ length: hotel?.starRating }).map(() => (
                                    <AiFillStar className="fill-yellow-400" />
                                ))}
                            </span>
                            <h1 className="text-3xl font-bold">{room.name} room</h1>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="col-span-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {hotel.imageUrls.map((url: string, index: number) => (
                                <div key={index} className="h-[200px]">
                                    <img
                                        src={url}
                                        alt={hotel.name}
                                        className="h-full w-full rounded-md object-cover object-center"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="col-span-4">
                            <GuestInfoForm hotel={hotel} room={room} />
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal1") as HTMLElement,
    );
};

export default RoomBooking;
