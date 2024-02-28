import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import fotograf1 from "../../img/fotograf 1.jpg";
import fotograf2 from "../../img/fotograf 2.jpg";
import fotograf3 from "../../img/fotograf 3.jpg";
import fotograf4 from "../../img/fotograf 4.jpg";

const Fotograf = () => {
   const initialSculptures = [
      {
         id: 1,
         name: "Fotoğraf 1",
         image: fotograf1,
         price: 1000,
         color: "Kahverengi",
         size: "51cm",
         theme: "İnsan",
         technique: "Kağıt Üzerine Baskı",
      },
      {
         id: 2,
         name: "Fotoğraf 2",
         image: fotograf2,
         price: 3000,
         color: "Siyah",
         size: "20cm",
         theme: "Soyut",
         technique: "Fotoblok Üzerine Baskı",
      },
      {
         id: 3,
         name: "Fotoğraf 3",
         image: fotograf3,
         price: 7500,
         color: "Yeşil",
         size: "30cm",
         theme: "Figüratif",
         technique: "Dijital Baskı",
      },
      {
         id: 4,
         name: "Fotoğraf 4",
         image: fotograf4,
         price: 9000,
         color: "Yeşil",
         size: "10cm",
         theme: "Doğa",
         technique: "Fotoblok Üzerine Baskı",
      },
   ];
   const [sculptures, setSculptures] = useState(initialSculptures);
   const [filteredSculptures, setFilteredSculptures] =
      useState(initialSculptures);

   const [colorFilter, setColorFilter] = useState("");
   const [priceRange, setPriceRange] = useState("");
   const [sizeFilter, setSizeFilter] = useState("");
   const [themeFilter, setThemeFilter] = useState("");
   const [techniqueFilter, setTechniqueFilter] = useState("");

   const priceRanges = {
      "1000-2500": { min: 1000, max: 2500 },
      "2500-5000": { min: 2500, max: 5000 },
      "5000-10000": { min: 5000, max: 10000 },
   };

   useEffect(() => {
      let filtered = sculptures;

      if (colorFilter) {
         filtered = filtered.filter(
            (sculpture) => sculpture.color === colorFilter
         );
      }

      if (priceRange) {
         const { min, max } = priceRanges[priceRange];
         filtered = filtered.filter(
            (sculpture) => sculpture.price >= min && sculpture.price <= max
         );
      }

      if (sizeFilter) {
         const [minSize, maxSize] = sizeFilter.split("-").map(Number);
         filtered = filtered.filter((sculpture) => {
            const sculptureSize = parseInt(sculpture.size, 10);
            return sculptureSize >= minSize && sculptureSize <= maxSize;
         });
      }

      if (themeFilter) {
         filtered = filtered.filter(
            (sculpture) => sculpture.theme === themeFilter
         );
      }

      if (techniqueFilter) {
         filtered = filtered.filter(
            (sculpture) => sculpture.technique === techniqueFilter
         );
      }

      setFilteredSculptures(filtered);
   }, [colorFilter, priceRange, sizeFilter, themeFilter, techniqueFilter]);

   const clearFilters = () => {
      setColorFilter("");
      setPriceRange("");
      setSizeFilter("");
      setThemeFilter("");
      setTechniqueFilter("");
      setFilteredSculptures(sculptures);
   };

   return (
      <Container className="mt-3">
         <div className="border-bottom p-2 my-4 ">
            <h6
               style={{
                  opacity: 0.6,
               }}
            >
               Fotoğraf
            </h6>
            <p>
               Fotoğraf, çağdaş sanatın yenilikçi dilini konuşan ve son yıllarda
               önde gelen sanat fuarlarından müzayedelere, özel koleksiyonlara
               kadar geniş bir platformda kendine yer bulan bir sanat formudur.
               Fotoğraf sanatçısının objektifi aracılığıyla yakalanan anılar,
               izleyicilere "müze kalitesi"nde bir deneyim sunar, her karede
               sanatseverleri etkileyen bir hikaye anlatır.
            </p>
         </div>
         <Row>
            <Col md={3} className="filter-section">
               <div className="mb-3">
                  <label htmlFor="priceRange" className="form-label">
                     Fiyat Aralığı
                  </label>
                  <select
                     id="priceRange"
                     className="form-select"
                     onChange={(e) => setPriceRange(e.target.value)}
                     value={priceRange}
                  >
                     <option value="">Tümü</option>
                     <option value="1000-2500">1000 - 2500 TL</option>
                     <option value="2500-5000">2500 - 5000 TL</option>
                     <option value="5000-10000">5000 - 10000 TL</option>
                  </select>
               </div>
               <div className="mb-3">
                  <label htmlFor="colorFilter" className="form-label">
                     Renk
                  </label>
                  <select
                     id="colorFilter"
                     className="form-select"
                     onChange={(e) => setColorFilter(e.target.value)}
                     value={colorFilter}
                  >
                     <option value="">Tümü</option>
                     <option value="Siyah">Siyah</option>
                     <option value="Yeşil">Yeşil</option>
                     <option value="Kahverengi">Kahverengi</option>
                  </select>
               </div>
               <div className="mb-3">
                  <label htmlFor="sizeFilter" className="form-label">
                     Boyut
                  </label>
                  <select
                     id="sizeFilter"
                     className="form-select"
                     onChange={(e) => setSizeFilter(e.target.value)}
                     value={sizeFilter}
                  >
                     <option value="">Tümü</option>
                     <option value="0-25">25cm'den küçük değerler</option>
                     <option value="26-50">26 - 50 cm</option>
                     <option value="51-75">51 - 75 cm</option>
                  </select>
               </div>
               <div className="mb-3">
                  <label htmlFor="themeFilter" className="form-label">
                     Tema
                  </label>
                  <select
                     id="themeFilter"
                     className="form-select"
                     onChange={(e) => setThemeFilter(e.target.value)}
                     value={themeFilter}
                  >
                     <option value="">Tümü</option>
                     <option value="Soyut">Soyut</option>
                     <option value="Figüratif">Figüratif</option>
                     <option value="Doğa">Doğa</option>
                     <option value="İnsan">İnsan</option>
                  </select>
               </div>
               <div className="mb-3">
                  <label htmlFor="techniqueFilter" className="form-label">
                     Teknik
                  </label>
                  <select
                     id="techniqueFilter"
                     className="form-select"
                     onChange={(e) => setTechniqueFilter(e.target.value)}
                     value={techniqueFilter}
                  >
                     <option value="">Tümü</option>
                     <option value="Kağıt Üzerine Baskı">
                        Kağıt Üzerine Baskı
                     </option>
                     <option value="Fotoblok Üzerine Baskı">
                        Fotoblok Üzerine Baskı
                     </option>
                     <option value="Dijital Baskı">Dijital Baskı</option>
                  </select>
               </div>
               <div className="mb-3">
                  <Button variant="secondary" onClick={clearFilters}>
                     Filtreleri Temizle
                  </Button>
               </div>
            </Col>
            <Col md={9}>
               <Row>
                  {filteredSculptures.map((sculpture) => (
                     <Col md={4} key={sculpture.id} className="mb-4">
                        <Card className="h-100">
                           <Link to={"/sculpture"}>
                              <Card.Img
                                 variant="top"
                                 src={sculpture.image}
                                 className="sculpture-image"
                              />
                           </Link>
                           <Card.Body>
                              <Card.Title>{sculpture.name}</Card.Title>
                              <Card.Text className="kategoriopacity">
                                 Fiyat: {sculpture.price} TL
                                 <br />
                                 Renk: {sculpture.color}
                                 <br />
                                 Boyut: {sculpture.size}
                                 <br />
                                 Tema: {sculpture.theme}
                                 <br />
                                 Teknik: {sculpture.technique}
                              </Card.Text>
                           </Card.Body>
                        </Card>
                     </Col>
                  ))}
               </Row>
            </Col>
         </Row>
      </Container>
   );
};

export default Fotograf;
