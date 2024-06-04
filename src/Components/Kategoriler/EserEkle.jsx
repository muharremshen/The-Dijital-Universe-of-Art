import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { fetchArtPiece } from "../../Request/request";

function ArtworkUploadForm() {
   const [artwork, setArtwork] = useState({
      imageUrl: "",
      imageName: "",
      category: "",
      price: "",
      height: "",
      width: "",
      theme: "",
      color: "",
   });

   const [technicalOptions, setTechnicalOptions] = useState([]);

   const handleArtPiece = async () => {
      try {
         const response = await fetchArtPiece(artwork);
         console.log("Sanat eseri başarıyla eklendi:", response);
      } catch (error) {
         console.error("Sanat eseri eklenirken bir hata oluştu:", error);
      }
   };

   const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === "category") {
         setArtwork({
            ...artwork,
            [name]: value,
         });
         if (value === "heykel") {
            setTechnicalOptions(["Ahşap", "Metal", "Mermer", "Seramik"]);
         } else if (value === "fotograf") {
            setTechnicalOptions([
               "kagit uzerine baski",
               "fotoblok uzerine baski",
               "dijital baski",
            ]);
         } else {
            setTechnicalOptions([]);
         }
      } else {
         setArtwork({
            ...artwork,
            [name]: value,
         });
      }
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const parsedArtwork = {
         ...artwork,
         height: parseInt(artwork.height),
         width: parseInt(artwork.width),
      };
      console.log(parsedArtwork);
      await handleArtPiece(); // Form submit edildiğinde handleArtPiece çağrılır
   };

   return (
      <Container fluid className="container-foto">
         <Row>
            <Col md={{ span: 6, offset: 3 }}>
               <Form onSubmit={handleSubmit} className="my-5">
                  <Form.Group className="mb-3">
                     <Form.Label>Fotoğraf URL</Form.Label>
                     <Form.Control
                        type="text"
                        name="imageUrl"
                        onChange={handleChange}
                        value={artwork.imageUrl}
                        required
                     />
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Fotoğraf İsmi</Form.Label>
                     <Form.Control
                        type="text"
                        name="imageName"
                        onChange={handleChange}
                        required
                     />
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Kategori</Form.Label>
                     <Form.Select
                        name="category"
                        onChange={handleChange}
                        required
                     >
                        <option value="">Seçiniz...</option>
                        <option value="resim">Resim</option>
                        <option value="heykel">Heykel</option>
                        <option value="fotograf">Fotoğraf</option>
                     </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Fiyat</Form.Label>
                     <Form.Control
                        type="number"
                        name="price"
                        onChange={handleChange}
                        required
                     />
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Boyut (cm)</Form.Label>
                     <div className="d-flex align-items-center">
                        <Form.Control
                           type="number"
                           name="height"
                           placeholder="Yükseklik"
                           onChange={handleChange}
                           required
                           style={{ width: "calc(15% - 20px)" }}
                        />
                        <span className="mx-2">x</span>
                        <Form.Control
                           type="number"
                           name="width"
                           placeholder="Genişlik"
                           onChange={handleChange}
                           required
                           style={{ width: "calc(15% - 20px)" }}
                        />
                     </div>
                     <Form.Text className="text-muted">
                        Sadece sayısal değerler giriniz.
                     </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Tema</Form.Label>
                     <Form.Select name="theme" onChange={handleChange} required>
                        <option value="">Seçiniz...</option>
                        <option value="soyut">Soyut</option>
                        <option value="figuratif">Figüratif</option>
                        <option value="doga">Doğa</option>
                        <option value="insan">İnsan</option>
                     </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Renk</Form.Label>
                     <Form.Select name="color" onChange={handleChange} required>
                        <option value="">Seçiniz...</option>
                        <option value="siyah">Siyah</option>
                        <option value="yesil">Yeşil</option>
                        <option value="kahverengi">Kahverengi</option>
                     </Form.Select>
                  </Form.Group>

                  {technicalOptions.length > 0 && (
                     <Form.Group className="mb-3">
                        <Form.Label>Teknik</Form.Label>
                        <Form.Select
                           name="technical"
                           onChange={handleChange}
                           required
                        >
                           <option value="">Seçiniz...</option>
                           {technicalOptions.map((option, index) => (
                              <option key={index} value={option}>
                                 {option}
                              </option>
                           ))}
                        </Form.Select>
                     </Form.Group>
                  )}

                  <Button variant="primary" type="submit">
                     Ekle
                  </Button>
               </Form>
            </Col>
         </Row>
      </Container>
   );
}

export default ArtworkUploadForm;
