import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
    faCircleHalfStroke,
    faCircleQuestion,
    faGlobe,
    faHeart,
    faSuitcase,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

export type MENU_TYPES = [EACH_ITEM];

export type EACH_ITEM = {
    icon: JSX.Element;
    title: string;
    to: string;
    separate: boolean;
    children?: {
        title: string;
        data: [
            {
                type: string;
                code: string;
                title: string;
            },
        ];
    };
};

export const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: "View profile",
        to: "/@hnx",
    },
    {
        icon: <FontAwesomeIcon icon={faGlobe} />,
        title: "English",
        children: {
            title: "Ngôn ngữ",
            data: [
                {
                    type: "language",
                    code: "vi",
                    title: "Tiếng Việt (Việt Nam)",
                },
                {
                    code: "en",
                    title: "English",
                },
                {
                    code: "pi",
                    title: "Cebuano (Pilipinas)",
                },
                {
                    code: "Čes",
                    title: "Čeština (Česká republika)",
                },
                {
                    code: "한",
                    title: "한국어 (대한민국)",
                },
                {
                    code: "简",
                    title: "简体中文",
                },
                {
                    code: "Ne",
                    title: "Nederlands (Nederland)",
                },
                {
                    code: "Ma",
                    title: "Bahasa Melayu (Malaysia)",
                },
                {
                    code: "Itali",
                    title: "Italiano (Italia)",
                },

                {
                    type: "language",
                    code: "vi",
                    title: "Tiếng Việt (Việt Nam)",
                },
                {
                    code: "en",
                    title: "English",
                },
                {
                    code: "pi",
                    title: "Cebuano (Pilipinas)",
                },
                {
                    code: "Čes",
                    title: "Čeština (Česká republika)",
                },
                {
                    code: "한",
                    title: "한국어 (대한민국)",
                },
                {
                    code: "简",
                    title: "简体中文",
                },
                {
                    code: "Ne",
                    title: "Nederlands (Nederland)",
                },
                {
                    code: "Ma",
                    title: "Bahasa Melayu (Malaysia)",
                },
                {
                    code: "Itali",
                    title: "Italiano (Italia)",
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faSuitcase} />,
        title: "Reservations and trips",
        to: "/trip",
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: "Feedback and help",
        to: "/feedback",
    },
    {
        icon: <FontAwesomeIcon icon={faHeart} />,
        title: "Favorite",
        to: "/favorite",
    },
    {
        icon: <FontAwesomeIcon icon={faCircleHalfStroke} />,
        title: "Dark mode",
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: "Sign Out",
        separate: true,
    },
];
