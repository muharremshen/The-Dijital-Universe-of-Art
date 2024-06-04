import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchHeykelPieces } from "../../Request/request";

const Heykel = () => {
   const [sculptures, setSculptures] = useState([]);
   const [filteredSculptures, setFilteredSculptures] = useState([]);

   const [colorFilter, setColorFilter] = useState("");
   const [priceRange, setPriceRange] = useState("");
   const [sizeFilter, setSizeFilter] = useState("");
   const [themeFilter, setThemeFilter] = useState("");
   const [techniqueFilter, setTechniqueFilter] = useState("");

   const priceRanges = {
      "1000-25000": { min: 1000, max: 25000 },
      "25000-50000": { min: 25000, max: 50000 },
      "50000-100000": { min: 50000, max: 100000 },
   };

   useEffect(() => {
      const fetchArtPieces = async () => {
         try {
            const data = await fetchHeykelPieces();
            setSculptures(data);
            setFilteredSculptures(data);
         } catch (error) {
            console.error("Sanat eserleri çekilemedi", error);
         }
      };

      fetchArtPieces();
   }, []);

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
            const sculptureSize = sculpture.height * sculpture.width;
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
            (sculpture) => sculpture.technical === techniqueFilter
         );
      }

      setFilteredSculptures(filtered);
   }, [
      sculptures,
      colorFilter,
      priceRange,
      sizeFilter,
      themeFilter,
      techniqueFilter,
   ]);

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
                     <option value="1000-25000">1000 - 25000 TL</option>
                     <option value="25000-50000">25000 - 50000 TL</option>
                     <option value="50000-100000">50000 - 100000 TL</option>
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
                     <option value="siyah">Siyah</option>
                     <option value="yesil">Yeşil</option>
                     <option value="kahverengi">Kahverengi</option>
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
                     <option value="0-625">25 cm²'den küçük değerler</option>
                     <option value="626-2500">26 - 50 cm²</option>
                     <option value="2501-5625">51 - 75 cm²</option>
                  </select>
               </div>
               <div className="mb-3">
                  <label
                     htmlFor="themeFilter"
                     className="form-label
"
                  >
                     Tema
                  </label>
                  <select
                     id="themeFilter"
                     className="form-select"
                     onChange={(e) => setThemeFilter(e.target.value)}
                     value={themeFilter}
                  >
                     <option value="">Tümü</option>
                     <option value="soyut">Soyut</option>
                     <option value="figuratif">Figüratif</option>
                     <option value="doga">Doğa</option>
                     <option value="insan">İnsan</option>
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
                     <option value="Ahşap">Ahşap</option>
                     <option value="Metal">Metal</option>
                     <option value="Mermer">Mermer</option>
                     <option value="Seramik">Seramik</option>
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
                     <Col md={4} key={sculpture._id} className="mb-4">
                        <Card className="h-100">
                           <Link to={`/sculpture/${sculpture._id}`}>
                              <Card.Img
                                 variant="top"
                                 src={sculpture.imageUrl}
                                 className="sculpture-image"
                              />
                           </Link>
                           <Card.Body>
                              <Card.Title>{sculpture.imageName}</Card.Title>
                              <Card.Text className="kategoriopacity">
                                 Fiyat: {sculpture.price} TL
                                 <br />
                                 Boyut: {sculpture.height} x {sculpture.width}{" "}
                                 cm
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

export default Heykel;
