import { useState } from "react"
import { useEffect } from "react";
import toast from "react-hot-toast";
import './Homepage.css'
import { useNavigate } from "react-router-dom";
import api from "../helpers/axios.config";


const Homepage = () => {
    const [Products, setProducts] = useState([]);
    const rout = useNavigate();

    useEffect(() => {
        // toast.success("Page rendered on Browser")
        async function getProduct() {
            try {
                const { data } = await api.get('/product/get-all-product');

                if(data.success){
                    setProducts(data.products)
                }

            } catch (error) {
                toast.error(error?.data?.message)
            }
        }
        getProduct()
    }, [])

    return (
        <div>
            {Products?.length ?
                <div id="main" >{Products.map((pro) => (
                    <div onClick={() => rout(`/single-product/${pro._id}`)} className="body">
                        <img className="images" src={pro.image} />  
                        <h3>Name : {pro.name}</h3>
                        <h4>Price : {pro.price} $</h4>
                        <p>Category : {pro.category}</p>
                    </div>
                ))}
                </div>  
                :
                <div>Loading...</div>}
        </div>
    )
}

export default Homepage