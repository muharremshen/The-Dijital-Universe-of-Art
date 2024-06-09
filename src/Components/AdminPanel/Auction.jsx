import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { startAuction } from "../../Request/request";

function Auctions() {
   const [image, setImage] = useState(null);
   const [artName, setName] = useState("");
   const [description, setDescription] = useState("");
   const [startPrice, setStartPrice] = useState("");
   const [time, setTime] = useState("");
   const [message, setMessage] = useState("");
   const navigate = useNavigate();
   const fileInputRef = useRef(null);

   const handleImageChange = (e) => {
      setImage(e.target.files[0]);
   };

   const handleTimeChange = (e) => {
      const value = e.target.value;
      if (value >= 0) {
         setTime(value);
      }
   };
   const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => resolve(reader.result);
         reader.onerror = (error) => reject(error);
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const base64Image = await fileToBase64(image);

      const formData = {
         image: base64Image,
         artName,
         description,
         startPrice,
         time,
      };

      try {
         const newAuction = await startAuction(formData);
         console.log(
            "%csrc/Components/AdminPanel/Auction.jsx:39 newAuction",
            "color: #26bfa5;",
            newAuction
         );
         setMessage("Canlı müzayede başarıyla oluşturuldu!");
      } catch (error) {
         setMessage("Canlı müzayede oluşturulurken bir hata oluştu!");
         console.error("Canlı müzayede oluşturma hatası:", error);
      }
   };

   const handleGoBack = () => {
      navigate("/dashboard");
   };

   return (
      <div className="container">
         <h2 className="text-center mb-4">Canlı Müzayede Oluştur</h2>
         {message && <div className="alert alert-info">{message}</div>}

         <button
            type="button"
            className="btn btn-secondary ml-2 my-3"
            onClick={handleGoBack}
         >
            Geri Dön
         </button>
         <div className="mb-3">
            <label htmlFor="image" className="form-label">
               Image
            </label>
            <input
               type="file"
               className="form-control"
               id="image"
               accept="image"
               onChange={handleImageChange}
               ref={fileInputRef}
            />
         </div>
         <div className="mb-3">
            <label htmlFor="artName" className="form-label">
               Eser İsmi
            </label>
            <input
               type="text"
               className="form-control"
               id="artName"
               value={artName}
               onChange={(e) => setName(e.target.value)}
            />
         </div>
         <div className="mb-3">
            <label htmlFor="description" className="form-label">
               Açıklama
            </label>
            <textarea
               className="form-control"
               id="description"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
            ></textarea>
         </div>
         <div className="mb-3">
            <label htmlFor="startPrice" className="form-label">
               Başlangıç Fiyatı
            </label>
            <input
               type="number"
               className="form-control"
               id="startPrice"
               value={startPrice}
               onChange={(e) => setStartPrice(e.target.value)}
            />
         </div>
         <div className="mb-3">
            <label htmlFor="time" className="form-label">
               Süre (dakika)
            </label>
            <input
               type="number"
               className="form-control"
               id="time"
               value={time}
               onChange={handleTimeChange}
            />
         </div>
         <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
         >
            Oluştur
         </button>
      </div>
   );
}

export default Auctions;
