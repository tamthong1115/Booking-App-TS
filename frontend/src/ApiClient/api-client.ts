// if the backend and frontend bundles just use the same server to fetch
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type ContactUsFormData = {
    name: string;
    phone: string;
    email: string;
    message: string;
};

export const postNewContactUs = async (formData: ContactUsFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/email/contact-us`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error("Error sending email");
    }

    return response.json();
};
