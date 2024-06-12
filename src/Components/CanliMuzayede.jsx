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
import io from "socket.io-client";
import { placeBid, fetchAuctions } from "../Request/request";

const AuctionPage = () => {
   const [auctionItems, setAuctionItems] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [bidAmount, setBidAmount] = useState("");
   const [selectedItem, setSelectedItem] = useState(null);
   const [socket, setSocket] = useState(null);

   const handleBidClick = (item) => {
      setSelectedItem(item);
      setShowModal(true);
   };

   const handleModalClose = () => {
      setShowModal(false);
   };

   const handleBidSubmit = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
         console.error("User ID not found in localStorage");
         alert("Hesabınıza giriş yapmalısınız.");
         return;
      }
      const bid = {
         auctionId: selectedItem._id,
         userId: userId,
         amount: parseInt(bidAmount),
      };

      if (bid.amount <= selectedItem.currentBid) {
         alert("Teklif miktarı mevcut tekliften yüksek olmalıdır.");
         return;
      }

      try {
         const response = await placeBid(bid);
         console.log("Bid placed successfully:", response);
         socket.emit("placeBid", { ...bid, userName: response.userName });
      } catch (error) {
         console.error("Error placing bid:", error);
      }

      setShowModal(false);
   };

   useEffect(() => {
      const newSocket = io("http://localhost:5001", {
         withCredentials: true,
         transports: ["websocket"],
      });

      setSocket(newSocket);

      return () => {
         newSocket.disconnect();
      };
   }, []);

   useEffect(() => {
      if (!socket) return;

      socket.on("connect", () => {
         console.log("Socket.IO bağlantısı kuruldu!");
      });

      socket.on("bidUpdate", ({ auctionId, newBid, userName }) => {
         setAuctionItems((prevItems) =>
            prevItems.map((item) =>
               item._id === auctionId
                  ? { ...item, currentBid: newBid, lastBidder: userName }
                  : item
            )
         );
      });

      return () => {
         socket.off("connect");
         socket.off("bidUpdate");
      };
   }, [socket]);

   useEffect(() => {
      const fetchAuctionDetails = async () => {
         try {
            const auctionData = await fetchAuctions();
            setAuctionItems(auctionData);
         } catch (error) {
            console.error("Error fetching auction details:", error);
         }
      };

      fetchAuctionDetails();

      const intervalId = setInterval(() => {
         setAuctionItems((prevItems) =>
            prevItems.map((item) => {
               const endTime = new Date(item.endTime);
               const timeDifference = endTime - new Date();
               const minutes = Math.floor(timeDifference / (1000 * 60));
               const seconds = Math.floor(
                  (timeDifference % (1000 * 60)) / 1000
               );
               const timeLeft =
                  timeDifference > 0 ? `${minutes}dk ${seconds}s` : null;
               const isExpired = timeDifference <= 0;
               return {
                  ...item,
                  timeLeft: timeLeft,
                  isExpired: isExpired,
               };
            })
         );
      }, 1000);

      return () => clearInterval(intervalId);
   }, []);

   return (
      <Container className="auction-page">
         <Row>
            {auctionItems.map((item) => (
               <Col key={item._id} sm={6} md={4} lg={3}>
                  <Card className="auction-item">
                     <Card.Img variant="top" src={item.image} />
                     <Card.Body>
                        <Card.Title>{item.artName}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                           <Badge bg="secondary">
                              {item.currentBid || item.startPrice} TL
                           </Badge>
                           <Button
                              variant="primary"
                              onClick={() => handleBidClick(item)}
                              disabled={item.isExpired}
                           >
                              Teklif Ver
                           </Button>
                        </div>
                        {item.timeLeft && (
                           <div>Kalan Süre: {item.timeLeft}</div>
                        )}
                        {item.lastBidder && (
                           <div>Son Teklif Veren: {item.lastBidder}</div>
                        )}
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
