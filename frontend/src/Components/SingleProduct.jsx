import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './SingleProduct.css'
import toast from "react-hot-toast";
import api from "../helpers/axios.config";
import { AuthContext } from "../Context/AuthContext";

const SingleProduct = () => {
    const [productData, SetProductData] = useState({})
    const { id } = useParams();
    // alert(id)
    const { state } = useContext(AuthContext);

    async function Cart(id) {
        // alert(id)
        if (state.user.id && id) {
            try {
                const response = await api.post("user/add-cart", { userId: state.user.id, productId: id })
                if (response.data.success) {
                    toast.success(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
        else {
            toast.error("please login to add to Cart")
        }
    }

    useEffect(() => {
        async function getSingleProductData() {
            try {
                const { data } = await api.get(`/product/get-single-product?id=${id}`)

                if (data.success) {
                    SetProductData(data);
                }
            } catch (error) {
                console.log(error, "error")
                toast.error(error?.data?.data.message)
            }
        }
        if (id) {
            getSingleProductData()
        }
    }, [id])

    // console.log(productData , " product data ");

    return (
        <div>
            {productData?.data?.product?._id ?
                <div className="screen-SPN">
                    <div className="image-SPN" > <img src={productData.data.product.image} /> </div>

                    <div className="discription-SPN" >
                        <h3><span>NAME </span>: {productData.data.product.name}</h3>
                        <h5><span>CATEGORY </span>: {productData.data.product.category}</h5>
                        <h3><span>PRICE</span> : {productData.data.product.price} $</h3>
                        <h3><span>Added By</span> : {productData.data.user.name}</h3>
                        <h3><span>Contact No</span> : {productData.data.user.number}</h3>
                        {state?.user?.id &&
                            <button onClick={() => Cart(productData.data.product._id)}>Add to Cart</button>
                        }
                    </div>
                </div>
                :
                <div>Loading...</div>}
        </div >
    )
}

export default SingleProduct