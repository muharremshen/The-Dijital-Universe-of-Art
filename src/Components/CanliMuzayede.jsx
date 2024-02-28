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
import resim from "../img/heykel 6.jpeg";
import { Link } from "react-router-dom";
import resim2 from "../img/resim 1.jpeg";
import resim3 from "../img/resim 2.jpeg";
import resim4 from "../img/resim 4.jpg";

const AuctionPage = () => {
   const [auctionItems, setAuctionItems] = useState([
      {
         id: 1,
         title: "Eser 1",
         description: "Kanatlı Balık heykelimiz açık arttırmaya sunulmuştur.",
         currentBid: 10000,
         imageSrc: resim,
         endTime: new Date("2024-02-01T12:00:00"), // Bitiş tarihi
         timeLeft: "", // Kalan süre
      },
      {
         id: 2,
         title: "Eser 2",
         description: "Kanatlı Balık heykelimiz açık arttırmaya sunulmuştur.",
         currentBid: 5000,
         imageSrc: resim2,
         endTime: new Date("2024-02-01T12:00:00"), // Bitiş tarihi
         timeLeft: "", // Kalan süre
      },
      {
         id: 3,
         title: "Eser 2",
         description: "Kanatlı Balık heykelimiz açık arttırmaya sunulmuştur.",
         currentBid: 5000,
         imageSrc: resim3,
         endTime: new Date("2024-02-01T12:00:00"), // Bitiş tarihi
         timeLeft: "", // Kalan süre
      },
      {
         id: 4,
         title: "Eser 2",
         description: "Kanatlı Balık heykelimiz açık arttırmaya sunulmuştur.",
         currentBid: 5000,
         imageSrc: resim4,
         endTime: new Date("2024-02-01T12:00:00"), // Bitiş tarihi
         timeLeft: "", // Kalan süre
      },
   ]);

   const [showModal, setShowModal] = useState(false);
   const [bidAmount, setBidAmount] = useState("");

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

   const handleBidClick = () => {
      setShowModal(true);
   };

   const handleModalClose = () => {
      setShowModal(false);
   };

   const handleBidSubmit = () => {
      // Burada teklifi sunucuya gönderme işlemini yapacağız.
      // Sunucu yanıtına göre teklifin kabul edilip edilmediğini kontrol edin.
      // Başarılı bir şekilde kabul edilirse, currentBid'i güncelle ve modalı kapat.

      console.log("Yeni teklif:", bidAmount);
      // Teklif gönderildikten sonra:
      // setAuctionItems ile güncelleme yapılmalı
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

   const [showWelcomeModal, setShowWelcomeModal] = useState(false);
   useEffect(() => {
      // Kullanıcı sayfaya her giriş yaptığında karşılama modalını göster
      setShowWelcomeModal(true);
   }, []);

   const handleWelcomeModalClose = () => {
      setShowWelcomeModal(false);
   };
   return (
      <Container>
         {/* Hoş Geldiniz*/}
         <Modal show={showWelcomeModal} onHide={handleWelcomeModalClose}>
            <Modal.Header closeButton>
               <Modal.Title>Hoş Geldiniz!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p>Canlı müzayedemize hoş geldiniz!</p>
               <ul>
                  <li>
                     Her eser için belirlenen süre içinde teklif verebilirsiniz.
                  </li>
                  <li>En yüksek teklifi veren kişi eseri kazanır.</li>
                  <li>Tekliflerinizi artırarak şansınızı artırabilirsiniz.</li>
               </ul>
               <p>Müzayedemizde iyi şanslar!</p>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleWelcomeModalClose}>
                  Anladım
               </Button>
            </Modal.Footer>
         </Modal>
         <Row>
            {auctionItems.map((item) => (
               <Col key={item.id} sm={12} md={6} lg={4}>
                  <Card className="mb-4 w-100">
                     <Link to="/sculpture">
                        <Card.Img
                           variant="top"
                           src={item.imageSrc}
                           alt={item.title}
                        />
                     </Link>
                     <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Text>
                           <Badge bg="info">Kalan Süre: {item.timeLeft}</Badge>
                        </Card.Text>
                        <Card.Text>
                           Şu anki teklif: <strong>{item.currentBid}TL</strong>
                        </Card.Text>
                        <Button variant="primary" onClick={handleBidClick}>
                           Teklif Ver
                        </Button>
                     </Card.Body>
                  </Card>
               </Col>
            ))}
         </Row>

         {/* Teklif Modal */}
         <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
               <Modal.Title>Teklif Ver</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Form.Group controlId="bidAmount">
                     <Form.Label>Teklif Miktarı</Form.Label>
                     <Form.Control
                        type="number"
                        placeholder="Teklif miktarını girin"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                     />
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleModalClose}>
                  İptal
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
