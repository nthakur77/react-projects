import { Outlet } from "react-router";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

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