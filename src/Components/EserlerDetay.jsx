import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReactImageMagnify from "react-image-magnify";
import { Link, useParams } from "react-router-dom";
import { getArtPieceDetail, fetchArtistProfileById } from "../Request/request";
import { useCart } from "../Contexts/CartContext";

const ProductDetail = () => {
   const { id } = useParams();
   const { addToCart } = useCart(); // useCart'ı kullanın
   const [product, setProduct] = useState(null);
   const [artist, setArtist] = useState({});
   const [error, setError] = useState(null);
   const [magnifyActive, setMagnifyActive] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const productData = await getArtPieceDetail(id);
            const artistData = await fetchArtistProfileById(productData.userId);
            setProduct(productData);
            setArtist(artistData);
         } catch (error) {
            setError("Ürün detayları alınırken bir hata oluştu");
         }
      };

      fetchData();
   }, [id]);

   const toggleMagnify = (isActive) => {
      setMagnifyActive(isActive);
   };

   if (error) {
      return <div>{error}</div>;
   }

   if (!product || !artist) {
      return <div>Yükleniyor...</div>;
   }

   // Sanatçının profil linki
   const artistProfileLink = `/sanatci/${artist._id}`;

   return (
      <Container className="product-detail my-5">
         <Row>
            <Col md={6} className="product-image">
               <div
                  className={`magnify-overlay ${magnifyActive ? "active" : ""}`}
               ></div>
               <ReactImageMagnify
                  {...{
                     smallImage: {
                        alt: product.imageName,
                        isFluidWidth: true,
                        src: product.imageUrl,
                     },
                     largeImage: {
                        src: product.imageUrl,
                        width: 1200,
                        height: 1800,
                     },
                     enlargedImagePosition: "over",
                     enlargedImageContainerDimensions: {
                        width: "200%",
                        height: "100%",
                     },
                     onZoomEnd: () => toggleMagnify(false),
                     onZoomStart: () => toggleMagnify(true),
                  }}
               />
            </Col>
            <Col md={5} className="product-info mx-4 my-5">
               <Link to={artistProfileLink}>
                  <p>
                     <span className="product-artist">{artist.name}</span>
                  </p>
               </Link>
               <h2>{product.imageName}</h2>
               <p>
                  <span style={{ opacity: 0.8, fontWeight: 500, fontSize: 20 }}>
                     {product.technical}
                  </span>
               </p>
               <p style={{ opacity: 0.8 }}>
                  {product.width} cm x {product.height} cm
               </p>
               <p>
                  <em style={{ opacity: 0.8 }}>
                     Yapım Yılı: {new Date(product.createdAt).getFullYear()}
                  </em>
               </p>
               <Button
                  variant="primary"
                  className="my-2"
                  onClick={() => {
                     addToCart({
                        id: product._id,
                        name: product.imageName,
                        price: product.price,
                        quantity: 1,
                     });
                     alert("Ürün başarıyla sepete eklendi.");
                  }}
               >
                  Sepete Ekle
               </Button>
               <p>
                  <span style={{ opacity: 0.8, letterSpacing: 0.2 }}>
                     Eser Kodu: {product._id}
                  </span>
               </p>
               <p>
                  <span style={{ opacity: 0.8, letterSpacing: 0.2 }}>
                     Fiyat: {product.price} TL
                  </span>
               </p>
            </Col>
         </Row>
      </Container>
   );
};

export default ProductDetail;
