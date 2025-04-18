import { useForm } from "react-hook-form";
import { httpAddProduct } from "../api/productService";
import Swal from "sweetalert2";
import "../Styles/Signup.css";
import { useState } from "react";

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        defaultValues: {
            productName: "",
            productionDate: "",
            color: "",
            size: "",
            image: "",
            price: 0,
            categories: [],
            selectedCategoryDetail: "", // הוספת שדה חדש לפרטי הקטגוריה
        }
    });
    
    const [selectedCategory, setSelectedCategory] = useState("");

    const listCategories = {
        table: "שולחן ואירוח",
        livingRoom: "סלון ואווירה",
        accessories: "אקססוריז",
        packages: "מארזים",
    };

    const save = (data) => {
        console.log("נשלח לשרת:", data);
        let token =JSON.parse(localStorage.getItem("token"));
        httpAddProduct(data, token).then(() => {
            Swal.fire({
                title: "מוצר נוסף בהצלחה",
                icon: "success"
            });
            reset();
        }).catch(err => {
            console.error("שגיאת שרת:", err);
            Swal.fire({
                title: `שגיאה בהוספה: ${err.response?.data?.message || "שגיאה לא ידועה"}`,
                icon: "error"
            });
        });
    };

    return (
        <div className="register-container">
            <h2>הוספת מוצר</h2>
            <form noValidate onSubmit={handleSubmit(save)} className="register-form">
                <div className="input-group">
                    <label>שם מוצר:</label>
                    <input type="text" {...register("productName", { required: "שדה חובה" })} />
                    {errors.productName && <p className="error">{errors.productName.message}</p>}
                </div>

                <div className="input-group">
                    <label>תאריך ייצור:</label>
                    <input type="date" {...register("productionDate", { required: "שדה חובה" })} />
                    {errors.productionDate && <p className="error">{errors.productionDate.message}</p>}
                </div>

                <div className="input-group">
                    <label>צבע:</label>
                    <input type="text" {...register("color", { required: "שדה חובה" })} />
                    {errors.color && <p className="error">{errors.color.message}</p>}
                </div>

                <div className="input-group">
                    <label>גודל:</label>
                    <input type="text" {...register("size", { required: "שדה חובה" })} />
                    {errors.size && <p className="error">{errors.size.message}</p>}
                </div>

                <div className="input-group">
                    <label>תמונה (URL):</label>
                    <input type="text" {...register("image", {
                        required: "שדה חובה",
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
                        required: "שדה חובה",
                        min: { value: 0, message: "המחיר חייב להיות חיובי" }
                    })} />
                    {errors.price && <p className="error">{errors.price.message}</p>}
                </div>
                <div className="input-group">
                    <label> קטגורית מוצר:</label>
                    <input type="text" {...register("selectedCategoryDetail")} value={listCategories[selectedCategory] || ""} readOnly />
                </div>
                <div className="input-group">
                    <label>קטגוריות:</label>
                    <select multiple {...register("categories", { required: "יש לבחור לפחות קטגוריה אחת" })} 
                        onChange={(e) => {
                            const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
                            setValue("categories", selectedOptions);
                            setSelectedCategory(selectedOptions[0]); // עדכון הקטגוריה הנבחרת
                            setValue("selectedCategoryDetail", listCategories[selectedOptions[0]]); // עדכון פרטי הקטגוריה
                        }}>
                        {Object.entries(listCategories).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                    {errors.categories && <p className="error">{errors.categories.message}</p>}
                </div>

                {/* אינפוט קיים מראש שיתעדכן לפי הקטגוריה הנבחרת */}
                

                <button type="submit" className="register-button">הוסף מוצר</button>
            </form>
        </div>
    );
};

export default AddProduct;
