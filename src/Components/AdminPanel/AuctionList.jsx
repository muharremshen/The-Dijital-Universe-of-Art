import React, { useEffect, useState } from "react";
import { fetchAuctions, deleteAuction } from "../../Request/request";
import { Link } from "react-router-dom"; // React Router ile geri butonu için

function Auctions() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const getAuctions = async () => {
      try {
        const auctionsData = await fetchAuctions();
        setAuctions(auctionsData);
      } catch (error) {
        console.error("Müzayedeler alınamadı:", error);
      }
    };

    getAuctions();
  }, []);

  const deleteAuctionById = async (auctionId) => {
    try {
      await deleteAuction(auctionId);
      setAuctions(auctions.filter((auction) => auction._id !== auctionId));
    } catch (error) {
      console.error("Müzayede silinemedi:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Müzayede Yönetimi</h2>
      <Link to="/dashboard" className="btn btn-primary mb-4">
        Geri
      </Link>
      <div className="row">
        {auctions.map((auction) => (
          <div key={auction._id} className="col-md-4 mb-4">
            <div className="card auction-card">
              <img
                src={auction.image}
                alt={auction.artName}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{auction.artName}</h5>
                <p className="card-text">
                  <strong>Açıklama:</strong> {auction.description}
                </p>
                <p className="card-text">
                  <strong>Başlangıç Fiyatı:</strong> {auction.startPrice}
                </p>
                <p className="card-text">
                  <strong>Süre:</strong> {auction.time} dakika
                </p>
                <p className="card-text">
                  <strong>Oluşturulma Tarihi:</strong>{" "}
                  {new Date(auction.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => deleteAuctionById(auction._id)}
                  className="btn btn-sm btn-danger delete-button"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Auctions;
