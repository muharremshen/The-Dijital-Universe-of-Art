import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { fetchArtistProfileById } from "../../Request/request";
import Eserler from "../Eserler";

const Sanatci = () => {
   const [artist, setArtist] = useState({});
   const { id } = useParams();

   useEffect(() => {
      const getArtist = async () => {
         try {
            const artistData = await fetchArtistProfileById(id);
            await setArtist(artistData);

            localStorage.setItem("artistName", artistData.name);
         } catch (error) {
            console.error("Sanatçı verisi alınamadı:", error);
         }
      };

      getArtist(); // useEffect içinde fonksiyon çağırarak veriyi getiriyoruz
   }, [id]); // id değiştiğinde useEffect tekrar çalışacak

   return (
      <Container className="mt-5">
         <Row>
            <Col md={3} className="mb-3">
               <Image
                  src={artist.profileImage}
                  alt={artist.name}
                  fluid
                  rounded
               />{" "}
            </Col>
            <Col md={9} className="mb-3 ">
               <h3 className="font-weight-bold">{artist.name}</h3>
               <p>
                  <strong>Doğum Tarihi:</strong> {artist.birthDate}
               </p>
               <p className="opacity-workshop">
                  {artist.workshop &&
                     artist.workshop.split("\n").map((paragraph, index) => (
                        <React.Fragment key={index}>
                           {paragraph}
                           <br />{" "}
                           {/* Her paragrafın sonuna bir satır ekleyin */}
                        </React.Fragment>
                     ))}
               </p>
               <strong className="d-block mb-2">Katıldığı Sergiler:</strong>{" "}
               <p className="opacity-sergi">
                  {artist.exhibition &&
                     artist.exhibition.map((exhibition, index) => (
                        <React.Fragment key={index}>
                           {index !== 0 && <br />} {exhibition}
                        </React.Fragment>
                     ))}
               </p>
            </Col>
         </Row>
         <Eserler artistName={artist.name} />
      </Container>
   );
};

export default Sanatci;
