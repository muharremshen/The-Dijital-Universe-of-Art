import React from "react";
import reklamImage from "../img/asset 12.jpeg";

const Reklam = () => {
   return (
      <div className="container mt-4">
         <div className="row">
            <div className="d-flex align-items-center justify-content-center">
               <img src={reklamImage} className="img-fluid" alt="Reklam" />
            </div>
         </div>
      </div>
   );
};

export default Reklam;
