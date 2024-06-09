import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLatestArtPieces } from "../Request/request";

const SonEklenenler = () => {
   const [sonEklenenFotograflar, setSonEklenenFotograflar] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = await fetchLatestArtPieces();
            setSonEklenenFotograflar(data);
         } catch (error) {
            console.error("Error fetching latest art pieces:", error);
         }
      };
      fetchData();
   }, []);

   return (
      <div className="container soneklenen-container mt-4">
         <h2 className="baslik">Son Eklenenler</h2>
         <div className="soneklenenler-kapsam">
            {sonEklenenFotograflar.map((foto) => (
               <div key={foto._id} className="col-md-3 mb-4">
                  <div className="card foto-odak">
                     <Link to={`/sculpture/${foto._id}`}>
                        <img
                           src={foto.imageUrl}
                           className="card-img-top foto-odak2"
                           alt={foto.imageName}
                        />
                     </Link>
                     <div className="card-body soneklenen-body">
                        <h5 className="card-title">{foto.imageName}</h5>
                        <h6 className="card-title">{foto.sanatci}</h6>
                        <h6 className="card-title">
                           {foto.width} cm x {foto.height} cm
                        </h6>
                        <h6 className="card-title">{foto.price} TL</h6>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default SonEklenenler;
