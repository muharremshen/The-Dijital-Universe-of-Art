import React, { useState, useEffect } from "react";
import {
   Container,
   Row,
   Col,
   Card,
   Button,
   Badge,
   Modal,
   Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { placeBid, getAuctionDetails } from "../Request/request";
import resim from "../img/heykel 6.jpeg";
import resim2 from "../img/resim 1.jpeg";
import resim3 from "../img/resim 2.jpeg";
import resim4 from "../img/resim 4.jpg";

const socket = io("http://localhost:5001", {
   withCredentials: true,
   transports: ["websocket"], // websocket'i varsayılan transport olarak ayarlayın
});

const AuctionPage = () => {
   const [auctionItems, setAuctionItems] = useState([
      {
         id: 1,
         title: "Kanatlı Balık",
         description: "Kanatlı Balık heykelimiz açık arttırmaya sunulmuştur.",
         currentBid: 10000,
         imageSrc: resim,
         endTime: new Date("2024-06-11T12:00:00"),
         timeLeft: "",
      },
      {
         id: 2,
         title: "Deniz",
         description: "Deniz Adlı Eserimiz açık arttırmaya sunulmuştur.",
         currentBid: 5000,
         imageSrc: resim2,
         endTime: new Date("2024-06-11T12:00:00"),
         timeLeft: "",
      },
      {
         id: 3,
         title: "Porselen Ağaç",
         description: "Porselen Ağaç resmimiz açık arttırmaya sunulmuştur.",
         currentBid: 5000,
         imageSrc: resim3,
         endTime: new Date("2024-06-11T12:00:00"),
         timeLeft: "",
      },
      {
         id: 4,
         title: "Çiçekler",
         description: "Çiçekler Resmimiz açık arttırmaya sunulmuştur.",
         currentBid: 5000,
         imageSrc: resim4,
         endTime: new Date("2024-02-01T12:00:00"),
         timeLeft: "",
      },
   ]);

   const [showModal, setShowModal] = useState(false);
   const [bidAmount, setBidAmount] = useState("");
   const [selectedItem, setSelectedItem] = useState(null);

   const calculateTimeLeft = (endTime) => {
      const now = new Date();
      const timeDifference = new Date(endTime) - now;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
         (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
         (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return `${days}g ${hours}sa ${minutes}dk ${seconds}s`;
   };

   const handleBidClick = (item) => {
      setSelectedItem(item);
      setShowModal(true);
   };

   const handleModalClose = () => {
      setShowModal(false);
   };

   const handleBidSubmit = async () => {
      const bid = {
         auctionId: selectedItem.id,
         userId: "currentUserId", // Bu değeri gerçek kullanıcı kimliğiyle değiştirin
         amount: parseInt(bidAmount),
      };

      try {
         const response = await placeBid(bid);
         console.log("Bid placed successfully:", response);
         socket.emit("placeBid", bid);
      } catch (error) {
         console.error("Error placing bid:", error);
      }

      setShowModal(false);
   };

   useEffect(() => {
      const intervalId = setInterval(() => {
         const updatedAuctionItems = auctionItems.map((item) => ({
            ...item,
            timeLeft: calculateTimeLeft(item.endTime),
         }));
         setAuctionItems(updatedAuctionItems);
      }, 1000);

      return () => clearInterval(intervalId);
   }, [auctionItems]);

   useEffect(() => {
      socket.on("connect", () => {
         console.log("Socket.IO bağlantısı kuruldu!");
      });

      socket.on("bidUpdate", ({ auctionId, newBid }) => {
         setAuctionItems((prevItems) =>
            prevItems.map((item) =>
               item.id === auctionId ? { ...item, currentBid: newBid } : item
            )
         );
      });

      return () => {
         socket.disconnect();
      };
   }, []);

   return (
      <Container className="auction-page">
         <Row>
            {auctionItems.map((item) => (
               <Col key={item.id} sm={6} md={4} lg={3}>
                  <Card className="auction-item">
                     <Card.Img variant="top" src={item.imageSrc} />
                     <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                           <Badge bg="secondary">{item.currentBid} TL</Badge>
                           <Button
                              variant="primary"
                              onClick={() => handleBidClick(item)}
                           >
                              Teklif Ver
                           </Button>
                        </div>
                        <div>Kalan Süre: {item.timeLeft}</div>
                     </Card.Body>
                  </Card>
               </Col>
            ))}
         </Row>
         <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
               <Modal.Title>Teklif Ver</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Form.Group controlId="formBidAmount">
                     <Form.Label>Teklif Tutarı</Form.Label>
                     <Form.Control
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                     />
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleModalClose}>
                  Kapat
               </Button>
               <Button variant="primary" onClick={handleBidSubmit}>
                  Teklif Ver
               </Button>
            </Modal.Footer>
         </Modal>
      </Container>
   );
};

export default AuctionPage;
