import React, { useContext, useState } from "react";
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
    stripePromise: Promise<Stripe | null>;
    loading: boolean;
    roleLoading: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const {
        data: user,
        isError,
        isLoading: authLoading,
    } = useQuery("validateToken", validateTokenUser, {
        retry: false,
        onSettled: () => setLoading(false),
    });

    const { data: userRoles, isLoading: roleLoading } = useQuery("userRoles", getUserRoles, {
        enabled: !!user,
    });

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage);
                },
                isLoggedIn: !isError,
                roles: userRoles || [],
                stripePromise,
                loading: loading || authLoading,
                roleLoading,
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
