import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSanatcilar } from "../../Request/request";

const Sanatcilars = () => {
   const [sanatcilar, setSanatcilar] = useState([]);

   useEffect(() => {
      async function fetchData() {
         try {
            const data = await getSanatcilar();
            setSanatcilar(data);
         } catch (error) {
            console.error("Sanatçı verileri alınamadı:", error);
         }
      }
      fetchData();
   }, []);

   return (
      <div className="container mt-4">
         <h2 className="baslik">Sanatçılar</h2>
         <div className="row g-4">
            {sanatcilar.length > 0 &&
               sanatcilar.map((sanatci) => (
                  <div key={sanatci._id} className="col-md-3 mb-4">
                     <Link
                        className="card border-0"
                        to={`/sanatci/${sanatci._id}`}
                     >
                        <div className="d-flex align-items-center">
                           <img
                              src={sanatci.profileImage}
                              className="card-img-top"
                              alt={sanatci.name}
                           />
                        </div>
                        <div className="card-body">
                           <h5 className="card-title d-flex justify-content-center align-items-center sanatci">
                              {sanatci.name}
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
