import React from "react";
import asset20 from "../../img/asset 20.png";
import asset23 from "../../img/asset 23.jpeg";
import asset35 from "../../img/asset 35.jpeg";
import { Link } from "react-router-dom";

const Sanatcilars = () => {
   const sonEklenenFotograflar = [
      {
         id: 1,
         src: asset20,
         title: "Adem Kipçak",
      },
      {
         id: 2,
         src: asset23,
         title: "Adem Kipçak",
      },
      {
         id: 3,
         src: asset35,
         title: "Adem Kipçak",
      },
      {
         id: 4,
         src: asset20,
         title: "Adem Kipçak",
      },
      {
         id: 5,
         src: asset23,
         title: "Adem Kipçak ",
      },
      {
         id: 6,
         src: asset35,
         title: "Adem Kipçak",
      },
      {
         id: 7,
         src: asset35,
         title: "Adem Kipçak",
      },
      {
         id: 8,
         src: asset35,
         title: "Adem Kipçak",
      },
   ];

   return (
      <div className="container mt-4">
         <h2 className="baslik">Sanatçılar</h2>
         <div className="row g-4">
            {sonEklenenFotograflar.map((foto) => (
               <div key={foto.id} className="col-md-3 mb-4">
                  <Link className="card" to="/sanatci">
                     <img
                        src={foto.src}
                        className="card-img-top"
                        alt={foto.title}
                     />
                     <div className="card-body">
                        <h5 className="card-title d-flex justify-content-center align-items-center sanatci">
                           {foto.title}
                        </h5>
                     </div>
                  </Link>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Sanatcilars;
