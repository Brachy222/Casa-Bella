import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userOut } from "../features/userSlice";
import { clearCart } from "../features/cartSlice"; 
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userOut());
        dispatch(clearCart());
        navigate("/Products");
    }, [dispatch, navigate]);

    return null;
};

export default Logout;
