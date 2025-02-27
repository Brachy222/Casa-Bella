import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userIn } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css"; 

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        dispatch(userIn(data)); 
        console.log("User Registered:", data);
        navigate("/products");
    };

    return (
        <div className="register-container">
            <h2>הרשמה</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                
                <div className="input-group">
                    <label>שם מלא</label>
                    <input 
                        type="text"
                        {...register("name", { required: "שדה חובה", minLength: { value: 2, message: "השם חייב להכיל לפחות 2 תווים" } })}
                    />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                <div className="input-group">
                    <label>אימייל</label>
                    <input 
                        type="email"
                        {...register("email", { required: "שדה חובה", pattern: { value: /\S+@\S+\.\S+/, message: "אימייל לא תקין" } })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
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

                <div className="input-group">
                    <label>אימות סיסמה</label>
                    <input 
                        type="password"
                        {...register("confirmPassword", { 
                            required: "שדה חובה", 
                            validate: value => value === watch("password") || "הסיסמאות לא תואמות"
                        })}
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                </div>

                <button type="submit" className="register-button">הרשם</button>
            </form>
        </div>
    );
};

export default Login;
