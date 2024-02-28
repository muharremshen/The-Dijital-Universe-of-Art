import React from "react";
import asset20 from "../img/asset 20.png";
import asset23 from "../img/asset 23.jpeg";
import asset35 from "../img/asset 35.jpeg";

const Eserler = () => {
   const sonEklenenFotograflar = [
      {
         id: 1,
         src: asset20,
         title: "Fotoğraf 1",
         sanatci: "Mehmet Akif Orçan",
         boyut: "90 cm x 90cm",
         price: "5000 TL",
      },
      {
         id: 2,
         src: asset23,
         title: "Fotoğraf 2",
         sanatci: "Mehmet Akif Orçan",
         boyut: "90 cm x 90cm",
         price: "5000 TL",
      },
      {
         id: 3,
         src: asset35,
         title: "Fotoğraf 3",
         sanatci: "Mehmet Akif Orçan",
         boyut: "90 cm x 90cm",
         price: "5000 TL",
      },
      {
         id: 4,
         src: asset20,
         title: "Fotoğraf 1",
         sanatci: "Mehmet Akif Orçan",
         boyut: "90 cm x 90cm",
         price: "5000 TL",
      },
      {
         id: 5,
         src: asset23,
         title: "Fotoğraf 2",
         sanatci: "Mehmet Akif Orçan",
         boyut: "90 cm x 90cm",
         price: "5000 TL",
      },
      {
         id: 6,
         src: asset20,
         title: "Fotoğraf 1",
         sanatci: "Mehmet Akif Orçan",
         boyut: "90 cm x 90cm",
         price: "5000 TL",
      },
      {
         id: 7,
         src: asset23,
         title: "Fotoğraf 2",
         sanatci: "Mehmet Akif Orçan",
         boyut: "90 cm x 90cm",
         price: "5000 TL",
      },
      {
         id: 8,
         src: asset35,
         title: "Fotoğraf 3",
         sanatci: "Mehmet Akif Orçan",
         boyut: "90 cm x 90cm",
         price: "5000 TL",
      },
   ];

   return (
      <div className="container mt-4">
         <h2 className="baslik">Adem Kipçak Eserleri</h2>
         <div className="row">
            {sonEklenenFotograflar.map((foto) => (
               <div key={foto.id} className="col-md-3 mb-4">
                  <div className="card">
                     <img
                        src={foto.src}
                        className="card-img-top"
                        alt={foto.title}
                     />
                     <div className="card-body">
                        <h5 className="card-title">{foto.title}</h5>
                        <h6 className="card-title">{foto.sanatci}</h6>
                        <h6 className="card-title">{foto.boyut}</h6>
                        <h6 className="card-title">{foto.price}</h6>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Eserler;
