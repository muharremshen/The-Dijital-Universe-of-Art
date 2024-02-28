import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReactImageMagnify from "react-image-magnify";
import { Link } from "react-router-dom";
import eserDetayi from "../img/heykel 6.jpeg";

const ProductDetail = ({ product }) => {
   const exampleProduct = {
      name: "Kanatlı Balık",
      artist: "Murat Yıldırımçakar",
      year: "2023",
      size: "100 cm x 76 cm x 65 cm",
      material: "Metal",
      image: eserDetayi,
      code: "23132132132",
   };

   return (
      <Container className="product-detail my-5">
         <Row>
            <Col md={6} className="product-image">
               <ReactImageMagnify
                  {...{
                     smallImage: {
                        alt: "Kanatlı Balık",
                        isFluidWidth: true,
                        src: exampleProduct.image,
                     },
                     largeImage: {
                        src: exampleProduct.image,
                        width: 1200,
                        height: 1800,
                     },
                  }}
               />
            </Col>
            <Col md={6} className="product-info mx-4 my-5">
               <Link to="/sanatci">
                  <p>
                     <span className="exampleproduct-artist">
                        {exampleProduct.artist}
                     </span>
                  </p>
               </Link>
               <h2>{exampleProduct.name}</h2>

               <p>
                  <span style={{ opacity: 0.8, fontWeight: 500, fontSize: 20 }}>
                     {exampleProduct.material}
                  </span>
               </p>

               <p style={{ opacity: 0.8 }}>{exampleProduct.size}</p>
               <p>
                  <em style={{ opacity: 0.8 }}>
                     Yapım Yılı: {exampleProduct.year}
                  </em>
               </p>
               <Link to="/alisveris-sepeti">
                  <Button variant="primary" className="my-2">
                     Sepete Ekle
                  </Button>
               </Link>
               <p>
                  <span style={{ opacity: 0.8, letterSpacing: 0.2 }}>
                     Eser Kodu: {exampleProduct.code}
                  </span>
               </p>
            </Col>
         </Row>
      </Container>
   );
};

export default ProductDetail;
