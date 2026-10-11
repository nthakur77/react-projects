import React from "react";
import { Outlet } from "react-router";
import Header from "../component/header/Header";
import Footer from "../component/footer/footer";

function Layout(){
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout