import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCar, faLocationDot, faPlane, faSuitcase, faTaxi } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
    return (
        <div className="gird wide">
            <div className="row container  mx-auto flex flex-wrap gap-2  md:flex-nowrap ">
                <button className="col max-w-50 mr-6 flex h-9 items-center rounded-full p-3 text-white hover:border-blue-500 hover:bg-blue-800 md:mr-0 md:max-w-none">
                    <FontAwesomeIcon className="mr-4" icon={faBed} />
                    Accommodation
                </button>
                <button className="max-w-50 mr-6 flex h-9 items-center rounded-full p-3 text-white hover:border-blue-500 hover:bg-blue-800 md:mr-0 md:max-w-none">
                    <FontAwesomeIcon className="mr-4" icon={faPlane} />
                    Flight
                </button>
                <button className="max-w-50 mr-6 flex h-9 items-center rounded-full p-3 text-white hover:border-blue-500 hover:bg-blue-800 md:mr-0 md:max-w-none">
                    <FontAwesomeIcon className="mr-4" icon={faSuitcase} />
                    Flight + Hotel
                </button>
                <button className="max-w-50 mr-6 flex h-9 items-center rounded-full p-3 text-white hover:border-blue-500 hover:bg-blue-800 md:mr-0 md:max-w-none">
                    <FontAwesomeIcon className="mr-4" icon={faCar} />
                    Car rental
                </button>
                <button className="max-w-50 mr-6 flex h-9 items-center rounded-full p-3 text-white hover:border-blue-500 hover:bg-blue-800 md:mr-0 md:max-w-none">
                    <FontAwesomeIcon className="mr-4" icon={faLocationDot} />
                    Visit location
                </button>
                <button className="max-w-50 mr-6 flex h-9 items-center rounded-full p-3 text-white hover:border-blue-500 hover:bg-blue-800 md:mr-0 md:max-w-none">
                    <FontAwesomeIcon className="mr-4" icon={faTaxi} />
                    Airport taxi
                </button>
            </div>
        </div>
    );
};

export default Hero;
