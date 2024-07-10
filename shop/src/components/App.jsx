import { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function App(){
    const [data,setData] = useState([]);
    const [cart,setCart] = useState([]);
    const [loading,setLoading] = useState(true);
    
    useEffect(() =>{
        const fetchData = async () =>{
            const sample = await fetch("https://fakestoreapi.com/products");
            const da = await sample.json();
            setData(da);
            setLoading(!loading);
        }
        fetchData();
    },[]);
    
    if(loading) return <div>loading</div>
    return(
        <>
            <Navbar cart={cart}/>
            <Outlet context={[data,cart,setCart]}/>
        </>
    )
}