import Footer from "../component/footer/footer";
import Header from "../component/header/header";
import { Outlet } from "react-router-dom";

function Layout() {

  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout
