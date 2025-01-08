import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AddProduct from "../AddProduct/AddProduct";
import GetProduct from "../GetProduct/GetProducts";
import Main from '../Main/Main';
import Signup from '../Signup/index';
import Login from "../Login/index";
import About from "../About/About";


function AppRoutes() {

  //user login token
const user = localStorage.getItem("token");
                  
//jsx for rendering routes for navigation around the system
  return (
       <div>            
                    <Routes>
                      { user && <Route path="/product" exact element={<AddProduct />}/>}
                      <Route path="/" exact element={<Main />} />
                     <Route path="/product" element={<Navigate replace to="/login" />} />
                     <Route path="/product" exact element={<AddProduct />} />
                     <Route path="/get" exact element={<GetProduct />} />
                     <Route path="/login" exact element={<Login />} />
                     <Route path="/signup" exact element={<Signup />} />
                     <Route path="/about" exact element={<About  />} />
                     </Routes>
                 </div>
                      
                    );
                  }

export default AppRoutes;
