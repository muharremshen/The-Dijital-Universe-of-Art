import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function ArtworkUploadForm() {
   const [artwork, setArtwork] = useState({
      photo: null,
      name: "",
      category: "",
      price: "",
      size: "",
      theme: "",
   });

   const handleChange = (event) => {
      const { name, value, files } = event.target;
      setArtwork({
         ...artwork,
         [name]: files ? files[0] : value,
      });
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      // Burada form verilerini işleyecek bir backend servisine gönderme işlemi yapılacak.
      console.log(artwork);
   };

   return (
      <Container fluid className="container-foto">
         <Row>
            <Col md={{ span: 6, offset: 3 }}>
               <Form onSubmit={handleSubmit} className="my-5">
                  <Form.Group controlId="formFile" className="mb-3">
                     <Form.Label>Fotoğraf</Form.Label>
                     <Form.Control
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        accept=".jpg, .jpeg, .png"
                        required
                     />
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Fotoğraf İsmi</Form.Label>
                     <Form.Control
                        type="text"
                        name="name"
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
                        type="text"
                        name="price"
                        onChange={handleChange}
                        required
                     />
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Boyut</Form.Label>
                     <Form.Control
                        type="text"
                        name="size"
                        placeholder="örn: 60x40 cm"
                        onChange={handleChange}
                        required
                     />
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Tema</Form.Label>
                     <Form.Select name="theme" onChange={handleChange} required>
                        <option value="">Seçiniz...</option>
                        <option value="soyut">Soyut</option>
                        <option value="figuratif">Figüratif</option>
                        <option value="dogan">Doğa</option>
                        <option value="insan">İnsan</option>
                     </Form.Select>
                  </Form.Group>

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
