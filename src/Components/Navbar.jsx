import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import logo from "../img/SanatınDijitalEvreni.png";
import { MdAddToPhotos } from "react-icons/md";

const Navbar = () => {
   const performSearch = (event) => {
      event.preventDefault();
      console.log("Arama yapılıyor...");
   };

   const navigate = useNavigate(); // Programatik olarak geçişi sağlar.

   return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <div className="container">
            <img className="logom" src={logo} alt="Logo" />
            <Link className="navbar-brand" to="/">
               Sanat Galerisi
            </Link>
            <button
               className="navbar-toggler"
               type="button"
               data-toggle="collapse"
               data-target="#navbarNav"
               aria-controls="navbarNav"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                     <Link className="nav-link" to="/">
                        Anasayfa
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/sanatcilar">
                        Sanatçılar
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Dropdown>
                        <Dropdown.Toggle
                           variant="link"
                           id="kategoriler-dropdown"
                           className="nav-link"
                        >
                           Kategoriler
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                           <Dropdown.Item
                              onClick={() => navigate("/kategori/fotograf")}
                           >
                              Fotoğraf
                           </Dropdown.Item>
                           <Dropdown.Item
                              onClick={() => navigate("/kategori/resim")}
                           >
                              Resim
                           </Dropdown.Item>
                           <Dropdown.Item
                              onClick={() => navigate("/kategori/heykel")}
                           >
                              Heykel
                           </Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/canli-muzayede">
                        Canlı Müzayede
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link
                        className="nav-link d-flex justify-content-center align-items-center"
                        to="/ekle"
                     >
                        Ekle
                        <MdAddToPhotos className="mx-1" />
                     </Link>
                  </li>
               </ul>

               <form
                  className="d-flex align-items-center"
                  onSubmit={performSearch}
               >
                  <input
                     className="form-control me-2"
                     type="search"
                     placeholder="Ara"
                     aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                     <i className="bi bi-search"></i>
                  </button>
               </form>
            </div>

            <div className="d-flex align-items-center navbar-icons">
               <Link to="/login">
                  <i className="bi bi-person"></i>
               </Link>
               <Link to="/alisveris-sepeti">
                  <i className="bi bi-cart"></i>
               </Link>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
