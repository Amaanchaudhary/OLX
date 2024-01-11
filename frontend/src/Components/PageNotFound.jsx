import { useState } from "react";
import { useNavigate } from "react-router-dom"


const PageNotFound = () => {
    const rout = useNavigate();
    const [time, setTime] = useState(5);

    if(time > 0){
       setTimeout(() => {
        setTime(time - 1)
       },1000)
    }else{
        rout("/")
    }

    return (
        <div>
            <h1 >Page Not Found,Redirecting you to HomePage in {time} Sec</h1>
            {/* <button onClick={() => rout("/")} >Click to go to HomePage</button> */}
        </div>
    )
}

export default PageNotFound