import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../img/SanatınDijitalEvreni (3).ico";

function Dashboard() {
   const navigate = useNavigate();

   const handleLogout = () => {
      navigate("/adminlogin");
   };

   return (
      <div className="container-fluid">
         <div className="row">
            <div className="col-md-2 bg-dark text-white min-vh-100 d-flex flex-column p-3">
               <div className="text-center mb-4">
                  <img
                     src={logo}
                     alt="Admin"
                     className="rounded-circle img-fluid"
                  />
                  <h2 className="mt-3">Admin Paneli</h2>
               </div>
               <nav className="nav flex-column">
                  <Link to="/users" className="nav-link linkduzen text-white">
                     Kullanıcı Yönetimi
                  </Link>
                  <Link
                     to="/auctions"
                     className="nav-link linkduzen text-white"
                  >
                     Müzayede Yönetimi
                  </Link>
               </nav>
               <div className="mt-auto">
                  <button
                     className="btn btn-danger btn-block"
                     onClick={handleLogout}
                  >
                     Çıkış Yap
                  </button>
               </div>
            </div>
            <div className="col-md-10 admin-panel-content">
               <h2 className="admin-welcome-text">Admin Panele Hoş Geldiniz</h2>
            </div>
         </div>
      </div>
   );
}

export default Dashboard;
