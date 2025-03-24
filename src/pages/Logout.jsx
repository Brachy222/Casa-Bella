<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userOut } from "../features/userSlice";
import { clearCart } from "../features/cartSlice"; 
import { useNavigate } from "react-router-dom";
=======
=======
>>>>>>> Stashed changes
import { userOut } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

<<<<<<< Updated upstream
<<<<<<< Updated upstream
    useEffect(() => {
        dispatch(userOut());
        dispatch(clearCart());
        navigate("/Products");
    }, [dispatch, navigate]);

    return null;
};

export default Logout;
=======
=======
>>>>>>> Stashed changes
    dispatch(userOut);
    localStorage.setItem("user",null)
    localStorage.setItem("token",null)
    localStorage.setItem("cart",[])

    navigate("/Products")


    return ( <></> );
}
 
<<<<<<< Updated upstream
export default Logout;
>>>>>>> Stashed changes
=======
export default Logout;
>>>>>>> Stashed changes
