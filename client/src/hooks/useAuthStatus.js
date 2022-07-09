import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const { user } = useSelector((state) => state.authentication);

    useEffect(() => {
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }

        setLoading(false);
    }, [user]);

    return { loggedIn, loading };
};

export default useAuthStatus;