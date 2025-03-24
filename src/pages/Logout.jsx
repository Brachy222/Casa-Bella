import { userOut } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"


const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    dispatch(userOut);

    navigate("/Products")


    return ( <></> );
}
 
export default Logout;