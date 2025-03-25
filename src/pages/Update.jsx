import { useForm } from "react-hook-form";
import { httpUpdateProduct, httpGetproductById } from "../api/productService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../Styles/Signup.css";

const UpdateProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    const listCategories = {
        table: "שולחן ואירוח",
        livingRoom: "סלון ואווירה",
        accessories: "אקססוריז",
        packages: "מארזים"
    };

    useEffect(() => {
        if (id) {
            httpGetproductById(id).then(res => {
                console.log("נתוני מוצר שהתקבלו:", res, res._id);
                
                reset({
                    productName: res.data.productName,
                    productionDate: res.data.productionDate,
                    color: res.data.color,
                    size: res.data.size,
                    image: res.data.image,
                    price: res.data.price,
                    categories: res.data.categories || []
                });

                setLoading(false);
            }).catch(err => {
                console.error("שגיאה בקבלת נתוני המוצר:", err);
                Swal.fire({
                    title: "שגיאה בטעינת נתוני המוצר.",
                    icon: "error",
                })
                setLoading(false);
            });
        }
    }, [id, reset]);

    const save = (data) => {
        console.log("נשלח לשרת:", data);
        let token  = JSON.parse(localStorage.getItem("token"));
        httpUpdateProduct(data, id ,token)
            .then(() => {
                Swal.fire({
                    title: "מוצר עודכן בהצלחה!",
                    icon: "success",
                    confirmButtonText: "סגור"
                }).then(() => {
                    navigate("/Products");
                }); 
            })
            .catch(err => {
                console.error("שגיאת שרת:", err);
                alert(`שגיאה בעדכון: ${err.response?.data?.message || "שגיאה לא ידועה"}`);
                Swal.fire({
                    title: "שגיאה בעדכון",
                    text:` ${err.response?.data?.message || "שגיאה לא ידועה"}`,
                    icon: "error",
                })
            });
    };

    if (loading) {
        return <h3>טוען נתוני מוצר...</h3>;
    }

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
                            value: /^\.\.\/images\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|webp)$/
                            ,
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
                            reset((prevValues) => ({
                                ...prevValues,
                                categories: selectedOptions
                            }));
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
