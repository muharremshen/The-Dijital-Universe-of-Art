import React from "react";
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import {
   FaFacebookF,
   FaTwitter,
   FaGoogle,
   FaInstagram,
   FaLinkedin,
   FaGithub,
} from "react-icons/fa";
import { FaGem, FaHome, FaEnvelope, FaPhone, FaPrint } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function App() {
   return (
      <MDBFooter
         bgColor="light"
         className="text-center text-lg-start text-muted"
      >
         <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div>
               <a href="" className="me-4 text-reset">
                  <FaFacebookF />
               </a>
               <a href="" className="me-4 text-reset">
                  <FaTwitter />
               </a>
               <a href="" className="me-4 text-reset">
                  <FaGoogle />
               </a>
               <a href="" className="me-4 text-reset">
                  <FaInstagram />
               </a>
               <a href="" className="me-4 text-reset">
                  <FaLinkedin />
               </a>
               <a href="" className="me-4 text-reset">
                  <FaGithub />
               </a>
            </div>
         </section>

         <section className="">
            <MDBContainer className="text-center text-md-start mt-5">
               <MDBRow className="mt-3">
                  <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                     <h6 className="text-uppercase fw-bold mb-4">
                        <FaGem className="me-3" />
                        SANATIN DIJITAL EVRENI
                     </h6>
                     <p>
                        Sanatın dijital dünyasında keşfe çıkın. Yaratıcılığın
                        sınırlarını zorlayan eserlerle tanışın.
                     </p>
                  </MDBCol>

                  <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                     <h6 className="text-uppercase fw-bold mb-4">Hizmetler</h6>
                     <p>
                        <Link className="text-reset" to="/contacts">
                           Bize Ulaşın
                        </Link>
                     </p>
                     <p>
                        <a href="#!" className="text-reset">
                           Gizlilik Politikası
                        </a>
                     </p>
                     <p>
                        <a href="#!" className="text-reset">
                           Yardım
                        </a>
                     </p>
                  </MDBCol>

                  <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                     <h6 className="text-uppercase fw-bold mb-4">Hakkımızda</h6>
                     <p>
                        <a href="#!" className="text-reset">
                           Sanatın Dijital Evreni
                        </a>
                     </p>
                     <p>
                        <a href="#!" className="text-reset">
                           Etik Anlayışımız
                        </a>
                     </p>
                  </MDBCol>

                  <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                     <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                     <p>
                        <FaHome className="me-2" />
                        Turkey,Adana
                     </p>
                     <p>
                        <FaEnvelope className="me-3" />
                        <a href="mailto:muharremsn1353@gmail.com">
                           muharremsn1353@gmail.com
                        </a>
                     </p>
                     <p>
                        <FaPhone className="me-3" /> +90 555 555 55 55
                     </p>
                     <p>
                        <FaPrint className="me-3" /> +90 555 555 55 55
                     </p>
                  </MDBCol>
               </MDBRow>
            </MDBContainer>
         </section>

         <div
            className="text-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
         >
            <p>Sanatın Dijital Evreni. Tüm Hakları Saklıdır.</p>
         </div>
      </MDBFooter>
   );
}
