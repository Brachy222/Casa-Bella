import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { httpAddCustomer } from "../api/customerService";
import { userIn } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Styles/Signup.css"; 

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            phone: ""
        }
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const save = (data) => {
        console.log("נשלח לשרת:", data);
        httpAddCustomer(data).then(res => {
            const user = res.data;
            dispatch(userIn(user));
            console.log(user);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token",user.token)
            Swal.fire({
                title: "נרשמת בהצלחה בהצלחה!",
                text: `ברוך הבא ${user.userName}`,
                icon: "success",
                confirmButtonText: "המשך"
            }).then(() => {
                navigate("/Products");
            });
                        // navigate("/Products")

        }).catch(err => {
            console.log(err);
            Swal.fire({
                title: "שגיאה בהרשמה",
                icon: "error",
            })
        })
    }

    return (
        <div className="register-container">
            <h2>הרשמה</h2>
            <form noValidate onSubmit={handleSubmit(save)} className="register-form">
                
                <div className="input-group">
                    <label>שם מלא</label>
                    <input 
                        type="text"
                        {...register("userName", { required: "שדה חובה", minLength: { value: 2, message: "השם חייב להכיל לפחות 2 תווים" } })}
                    />
                    {errors.userName && <p className="error">{errors.userName.message}</p>}
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
                <label>טלפון</label>
                <input type="text" {...register("phone", {
            required: { value: true, message: "phone is required" },
                    })} />
                </div>
                {/* <div className="input-group">
                    <label>סוג משתמש</label>
                    <select {...register("role", { required: "יש לבחור סוג משתמש" })}>
                        <option value="user">משתמש רגיל</option>
                        <option value="admin">מנהל</option>
                    </select>
                    {errors.role && <p className="error">{errors.role.message}</p>}
                </div> */}

                <button type="submit" className="register-button">הרשם</button>
            </form>
        </div>
    );
};

export default Signup;
