import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchArtPieceId } from "../Request/request";
import { FaExclamationTriangle } from "react-icons/fa"; // React Icons kütüphanesinden uygun ikonu ekledik

const Eserler = ({ artistName }) => {
   const [artPieces, setArtPieces] = useState([]); // Birden fazla artPiece olduğu varsayılarak array olarak düzenlendi
   const [loading, setLoading] = useState(true); // Yüklenme durumunu izlemek için state
   const { id } = useParams();

   useEffect(() => {
      const getArtPiece = async () => {
         try {
            const data = await fetchArtPieceId(id);
            console.log("Fetched data:", data); // Veri kontrolü için console.log ekleyin
            setArtPieces(Array.isArray(data) ? data : [data]); // Gelen verinin array olup olmadığını kontrol et
         } catch (error) {
            console.error("Error fetching art piece data: ", error);
         } finally {
            setLoading(false); // Veri yüklenme durumu tamamlandı
         }
      };
      getArtPiece();
   }, [id]);

   if (loading) {
      return (
         <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "20vh" }}
         >
            <div className="spinner-border" role="status">
               <span className="sr-only">Yükleniyor...</span>
            </div>
         </div>
      );
   }

   if (artPieces.length === 0) {
      return (
         <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "20vh" }}
         >
            <h3 className="d-flex justify-content-center align-items-center">
               <span className="mx-3"> Eser bulunamadı</span>{" "}
               <FaExclamationTriangle />
            </h3>
         </div>
      );
   }

   return (
      <div className="container mt-4">
         <h2 className="baslik">{artistName} Eserleri</h2>
         <div className="row">
            {artPieces.map((artPiece) => (
               <div className="col-md-3 mb-4" key={artPiece._id}>
                  <div className="card">
                     <img
                        src={artPiece.imageUrl}
                        className="card-img-top"
                        alt={artPiece.imageName}
                     />
                     <div className="card-body">
                        <h5 className="card-title">{artPiece.imageName}</h5>

                        <h6 className="card-title">
                           Fiyat: {artPiece.price} TL
                        </h6>
                        <h6 className="card-title">
                           Boyut: {artPiece.width} x {artPiece.height}
                        </h6>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Eserler;
