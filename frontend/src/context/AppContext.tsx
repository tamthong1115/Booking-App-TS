import React, { useContext, useEffect, useState } from "react";
import Toast from "../components/Toast/Toast.tsx";
import { useQuery } from "react-query";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { validateTokenUser, getUserRoles } from "../ApiClient/api-users.ts";
// import LoadingComponent from "../components/Loading/Loading.tsx";
const STRIPE_PUBLIC_KEY = (import.meta.env.VITE_STRIPE_PUBLIC_KEY as string) || "";

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
    roles: string[];
    setRoles: React.Dispatch<React.SetStateAction<string[]>>;
    stripePromise: Promise<Stripe | null>;
    loading: boolean;
    authLoading: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const [roles, setRoles] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { isError, isLoading: authLoading } = useQuery("validateToken", validateTokenUser, {
        retry: false,
        onSettled: () => setLoading(false),
    });

    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            const userRoles = await getUserRoles();
            setRoles(userRoles);
            setLoading(false);
        };

        fetchRoles();
    }, [isError]);

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage);
                },
                isLoggedIn: !isError,
                roles,
                setRoles,
                stripePromise,
                loading,
                authLoading,
            }}
        >
            {/* {loading && <LoadingComponent isLoading={loading} />} */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within a AppContextProvider");
    }
    return context as AppContext;
};
