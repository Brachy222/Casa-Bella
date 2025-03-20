import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { httpLoginCustomer } from "../api/customerService";
import { useNavigate } from "react-router-dom";
import { userIn } from "../features/userSlice";
import "../Styles/Signup.css"; 
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: "",
            password: "",
        }
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const save = (data) => {
        console.log("נשלח לשרת:", data);
        httpLoginCustomer(data).then(res => {
            const user = res.data;
            console.log("המשתמש המחובר כעת",user);
            //עדכון currentUser
            //  שבסטייט להיות המשתמש שנכנס
            dispatch(userIn(user));
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token",JSON.stringify(user.token))
            navigate("/Products")
        }).catch(err => {
            console.log(err);
            alert("משתמש לא רשום")
        })
    }

    return (
        <div className="register-container">
            <h2>כניסה</h2>
            <form noValidate onSubmit={handleSubmit(save)} className="register-form">
                
                <div className="input-group">
                    <label>שם משתמש</label>
                    <input 
                        type="text"
                        {...register("userName", { required: "שדה חובה", minLength: { value: 2, message: "השם חייב להכיל לפחות 2 תווים" } })}
                    />
                    {errors.userName && <p className="error">{errors.userName.message}</p>}
                </div>

                <div className="input-group">
                    <label>סיסמה</label>
                    <input 
                        type="password"
                        {...register("password", { 
                            required: "שדה חובה", 
                            minLength: { value: 6, message: "הסיסמה חייבת להיות לפחות 6 תווים" },
                            pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: "הסיסמה חייבת לכלול לפחות אות אחת וספרה אחת" }
                        })}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                <button type="submit" className="register-button">כניסה</button>

            </form>
        </div>
    );
}
 
export default Login;