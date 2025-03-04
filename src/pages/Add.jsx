import { useForm } from "react-hook-form";
import { httpAddProduct } from "../api/productService";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            productName: "",
            ProductionDate: "",
            color: "",
            size: "",
            image: "",
            price: 0,
            categories: [],
        }
    });

    const navigate = useNavigate();

    const listCategories = {"table": "שולחן ואירוח", "livingRoom": "סלון ואווירה", "accessories": "אקססוריז", "packages": "מארזים"};

    const save = (data) => {
        console.log("נשלח לשרת:", data);
        httpAddProduct(data).then(res => {
            alert("מוצר נוסף בהצלחה");
            navigate("/Products");
        }).catch(err => {
            console.log(err);
            alert("שגיאה בהוספה");
        });
    };

    return (
        <div className="register-container">
            <h2>הוספת מוצר</h2>
            <form noValidate onSubmit={handleSubmit(save)} className="register-form">
                
                <div className="input-group">
                    <label>שם מוצר:</label>
                    <input {...register("productName", { required: "שדה חובה" })} />
                    {errors.productName && <p className="error">{errors.productName.message}</p>}
                </div>

                <div className="input-group">
                    <label>תאריך ייצור:</label>
                    <input type="date" {...register("ProductionDate", { required: "שדה חובה" })} />
                    {errors.ProductionDate && <p className="error">{errors.ProductionDate.message}</p>}
                </div>

                <div className="input-group">
                    <label>צבע:</label>
                    <input {...register("color", { required: "שדה חובה" })} />
                    {errors.color && <p className="error">{errors.color.message}</p>}
                </div>

                <div className="input-group">
                    <label>גודל:</label>
                    <input {...register("size", { required: "שדה חובה" })} />
                    {errors.size && <p className="error">{errors.size.message}</p>}
                </div>

                <div className="input-group">
                    <label>תמונה (URL):</label>
                    <input type="url" {...register("image", { required: "שדה חובה" })} />
                    {errors.image && <p className="error">{errors.image.message}</p>}
                </div>

                <div className="input-group">
                    <label>מחיר:</label>
                    <input type="number" {...register("price", { required: "שדה חובה", min: { value: 0, message: "המחיר חייב להיות חיובי" } })} />
                    {errors.price && <p className="error">{errors.price.message}</p>}
                </div>

                <div className="input-group">
                    <label>קטגוריות:</label>
                    <select multiple {...register("categories", { required: "יש לבחור לפחות קטגוריה אחת" })}>
                        {Object.entries(listCategories).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                    {errors.categories && <p className="error">{errors.categories.message}</p>}
                </div>

                <button type="submit" className="register-button">הוסף מוצר</button>
            </form>
        </div>
    );
};

export default AddProduct;
