import { useForm } from "react-hook-form";
import { httpUpdateProduct } from "../api/productService";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";

const UpdateProduct = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({});

    const navigate = useNavigate();
    
    const listCategories = {
        table: "שולחן ואירוח",
        livingRoom: "סלון ואווירה",
        accessories: "אקססוריז",
        packages: "מארזים"
    };

    const save = (data) => {
        console.log("נשלח לשרת:", data);
        httpUpdateProduct(data).then(() => {
            alert("מוצר עודכן בהצלחה");
            navigate("/Products");
        }).catch(err => {
            console.error("שגיאת שרת:", err);
            alert(`שגיאה בעדכון: ${err.response?.data?.message || "שגיאה לא ידועה"}`);
        });
    };

    return (
        <div className="register-container">
            <h2>עדכון מוצר</h2>
            <form noValidate onSubmit={handleSubmit(save)} className="register-form">
                
                <div className="input-group">
                    <label>שם מוצר:</label>
                    <input type="text" {...register("productName", { required: "שדה חובה" })} />
                    {errors.productName && <p className="error">{errors.productName.message}</p>}
                </div>

                <div className="input-group">
                    <label>תאריך ייצור:</label>
                    <input type="date" {...register("productionDate")} />
                </div>

                <div className="input-group">
                    <label>צבע:</label>
                    <input type="text" {...register("color")} />
                </div>

                <div className="input-group">
                    <label>גודל:</label>
                    <input type="text" {...register("size")} />
                </div>

                <div className="input-group">
                    <label>תמונה:</label>
                    <input type="text" {...register("image", {
                        pattern: {
                            value: /^(\.\.\/)?images\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif)$/,
                            message: "יש להכניס כתובת תמונה תקפה"
                        }
                    })} />
                    {errors.image && <p className="error">{errors.image.message}</p>}
                </div>

                <div className="input-group">
                    <label>מחיר:</label>
                    <input type="number" {...register("price", {
                        min: { value: 0, message: "המחיר חייב להיות חיובי" }
                    })} />
                    {errors.price && <p className="error">{errors.price.message}</p>}
                </div>

                <div className="input-group">
                    <label>קטגוריות:</label>
                    <select multiple {...register("categories")} 
                        onChange={(e) => {
                            const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
                            setValue("categories", selectedOptions);
                        }}>
                        {Object.entries(listCategories).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="register-button">עדכן מוצר</button>
            </form>
        </div>
    );
}

export default UpdateProduct;
