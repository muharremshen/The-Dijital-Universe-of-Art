import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import logo from "../img/SanatınDijitalEvreni.png";
import { MdAddToPhotos } from "react-icons/md";
import { BsCart } from "react-icons/bs";

const Navbar = () => {
   const performSearch = (event) => {
      event.preventDefault();
      console.log("Arama yapılıyor...");
   };

   const navigate = useNavigate(); // Programatik olarak geçişi sağlar.
   const [status, setStatus] = useState(localStorage.getItem("status"));
   const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü durumunu takip etmek için bir state

   const handleStatus = () => {
      localStorage.setItem("status", "artLover"); // localStorage'ta 'status' değerini 'artLover' olarak ayarla
      setStatus("artLover"); // status state'ini güncelle
   };

   const handleLogout = () => {
      localStorage.removeItem("status"); // localStorage'tan 'status' değerini kaldır
      setStatus(null); // status state'ini güncelle
      alert("Çıkış yapıldı."); // Çıkış yapıldığında bir uyarı göster
      navigate("/Login");
   };

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen); // Menü durumunu tersine çevir
   };

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
               onClick={toggleMenu} // Menüyü açmak için fonksiyonu çağır
               aria-expanded={isMenuOpen ? "true" : "false"} // Açık/kapalı durumu belirt
               aria-label="Toggle navigation"
            >
               <span className="navbar-toggler-icon"></span>
            </button>
            <div
               className={`collapse navbar-collapse ${
                  isMenuOpen ? "show" : ""
               }`}
               id="navbarNav"
            >
               {" "}
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
                     {status === "artist" && (
                        <Link
                           to="/ekle"
                           className="nav-link d-flex justify-content-center align-items-center"
                        >
                           Ekle
                           <MdAddToPhotos className="mx-1" />
                        </Link>
                     )}
                  </li>
                  <li className="nav-item">
                     <Dropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-basic">
                           <i className="bi bi-person"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                           {status === "artist" && (
                              <Dropdown.Item>
                                 <Link to="/profil-duzenle">
                                    Profil Düzenle
                                 </Link>
                              </Dropdown.Item>
                           )}
                           {status === "artist" || status === "artLover" ? (
                              <Dropdown.Item onClick={handleLogout}>
                                 Çıkış yap
                              </Dropdown.Item>
                           ) : (
                              <Dropdown.Item>
                                 <Link to="/login" onClick={handleStatus}>
                                    Giriş yap
                                 </Link>
                              </Dropdown.Item>
                           )}
                        </Dropdown.Menu>
                     </Dropdown>
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
                  <li>
                     <Link to="/alisveris-sepeti" className="nav-link mx-3">
                        <BsCart size={24} />
                     </Link>
                  </li>
               </form>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
