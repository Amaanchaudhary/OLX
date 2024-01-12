import React, { useContext, useEffect, useState } from "react";
// import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import api from "../helpers/axios.config";
import './AddProduct.css'


const AddProduct = () => {

    const rout = useNavigate()

    const { state } = useContext(AuthContext);

    const [ProductData, SetProductData] = useState([{ name: "", price: "", image: "", category: "" }])

    // console.log(ProductData, "Product Data");

    const handleChange = (event) => {
        // console.log(event.target.value)
        SetProductData({ ...ProductData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (ProductData.name && ProductData.price && ProductData.image && ProductData.category) {
            try {
                const { data } = await api.post("/product/add-product", {
                    name: ProductData.name,
                    price: ProductData.price,
                    image: ProductData.image,
                    category: ProductData.category,
                    id: state?.user?.id
                })
                // console.log(data , "response from post request")
                if (data.success) {
                    toast.success(data.message)
                    rout("/yourproducts")
                    SetProductData({ name: "", price: "", image: "", category: "" })
                }
            } catch (error) {
                console.log(error, "Error Found")
                toast.error(error?.response?.data.message)
            }
        } else {
            toast.error("All Fields are Mandatory")
        }
    }

    useEffect(() => {
        const tokenn = JSON.parse(localStorage.getItem("My-token"))
        // console.log(tokenn , "tokken")
        if(!tokenn){
            rout("/login")
            toast.error("please login")
        }
    }, [])



    return (
        <div>
            <form className="ap-main" onSubmit={handleSubmit}>
                <h1 className="ap-h1">Add Product</h1>

                <label>Product Title</label><br />
                <input type='text' onChange={handleChange} name='name' value={ProductData.title} placeholder=" eg : Gucci" /><br />

                <label>Product Category</label><br />
                <input type='text' onChange={handleChange} name='category' value={ProductData.category} placeholder=" eg : shoes" /><br />

                <label>Product Price</label><br />
                <input type='number' onChange={handleChange} name='price' value={ProductData.price} placeholder=" eg : 999 " /><br />

                <label>Product Image</label><br />
                <input type='url' onChange={handleChange} name='image' value={ProductData.image} placeholder=" eg : Google link only https://img-gucci-shoes//" /><br /><br />

                <input className="ap-register" type='submit' value='Add Product' />
            </form>
        </div>
    )
}

export default AddProduct