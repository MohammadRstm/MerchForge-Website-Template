import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerAuth, useCustomerProfile, useUpdateCustomerProfile } from "@merchforge/storefront-sdk";

export type AccountFormValues = {
    firstName: string;
    lastName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
};

const EMPTY_VALUES: AccountFormValues = {
    firstName: "",
    lastName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
};

/** The signed-in customer's own profile page — view/edit + log out. Redirects home if not signed in. */
const useAccountPage = () => {
    const navigate = useNavigate();
    const { customer, isAuthenticated, isLoading: authLoading, logout } = useCustomerAuth();
    const { data: profile, isLoading: profileLoading, isError } = useCustomerProfile();
    const { mutate: save, isPending: isSaving, isSuccess: saved, reset: resetSaved } = useUpdateCustomerProfile();

    const [values, setValues] = useState<AccountFormValues>(EMPTY_VALUES);
    const seeded = useRef(false);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [authLoading, isAuthenticated, navigate]);

    // Seeded once from the loaded profile — never overwrites what the customer is
    // actively editing on a background refetch.
    useEffect(() => {
        if (profile && !seeded.current) {
            seeded.current = true;
            setValues({
                firstName: profile.firstName,
                lastName: profile.lastName,
                phone: profile.phone ?? "",
                addressLine1: profile.addressLine1 ?? "",
                addressLine2: profile.addressLine2 ?? "",
                city: profile.city ?? "",
                state: profile.state ?? "",
                postalCode: profile.postalCode ?? "",
                country: profile.country ?? "",
            });
        }
    }, [profile]);

    const change = (field: keyof AccountFormValues, value: string) => {
        resetSaved();
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const submit = () => {
        save({
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            phone: values.phone.trim() || undefined,
            addressLine1: values.addressLine1.trim() || undefined,
            addressLine2: values.addressLine2.trim() || undefined,
            city: values.city.trim() || undefined,
            state: values.state.trim() || undefined,
            postalCode: values.postalCode.trim() || undefined,
            country: values.country.trim() || undefined,
        });
    };

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return {
        customer,
        isLoading: authLoading || profileLoading,
        isError,
        values,
        change,
        submit,
        isSaving,
        saved,
        handleLogout,
    };
};

export default useAccountPage;
