import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'




const ErrorPage = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        navigate("/sports/olparksports?company=올림픽공원스포츠센터")
    },[])
    return (<></>)
}
export default  ErrorPage