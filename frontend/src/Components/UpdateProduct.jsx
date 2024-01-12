import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../helpers/axios.config";
import './UpdateProduct.css'

const UpdateProduct = () => {

    const rout = useNavigate();
    const { id } = useParams();

    const [productData, setProductData] = useState()
    console.log(productData)
    // alert(id)

    async function getProductData() {
        try {
            const response = await api.get(`/product/get-single-product?id=${id}`)
            if (response.data.success) {
                // console.log(response.data.data.product)
                setProductData(response.data.data.product)
            }
        } catch (error) {
            console.log(error, "Error Found")
            toast.error(error?.data?.message);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await api.post('/product/update-product' , {productData})

            if(response.data.success){
                toast.success(response.data.message);
                rout("/yourproducts");
            }
        }catch(error){
            toast.error(error?.response?.data.message);
        }
    }

    const handleChange = (event) => {
        setProductData({...productData , [event.target.name] : event.target.value})
    }

    useEffect(() => {
        if (id) {
            getProductData();
        }
    }, [id])

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
            <form className="up-main" onSubmit={handleSubmit}>
                <h1 className="up-h1">Update Your product</h1>
                <label>Name</label><br/>
                <input type="text" name='name' value={productData?.name} onChange={handleChange} /><br/>
                <label>Category</label><br/> 
                <input type="text" name='category' value={productData?.category} onChange={handleChange} /><br/>
                <label>Image</label><br/>
                <input type="url" name='image' value={productData?.image} onChange={handleChange} /><br/>
                <label>Price</label><br/>
                <input type="text" name='price' value={productData?.price} onChange={handleChange} /><br/><br/>
                <input  className="up-register" type="submit" value='UPDATE' /><br/>
            </form>
        </div>
    )
}

export default UpdateProduct;