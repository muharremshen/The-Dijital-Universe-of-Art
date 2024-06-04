import React, { useState, useEffect, useRef } from "react";
import {
   Container,
   Row,
   Col,
   Image,
   Form,
   Button,
   Accordion,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
   fetchArtistProfile,
   changePassword,
   fetchArtistProfileById,
   fetchArtPieceId,
   deleteArtPiece,
} from "../Request/request";

const ProfileEdit = () => {
   const [name, setName] = useState("");
   const [birthDate, setBirthDate] = useState("");
   const [workshop, setWorkshop] = useState("");
   const [profileImage, setProfileImage] = useState("");
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [todo, setTodo] = useState("");
   const [exhibition, setExhibition] = useState([]);
   const [artPieces, setArtPieces] = useState([]);
   const fileInputRef = useRef(null);

   useEffect(() => {
      const loadProfile = async () => {
         const userId = localStorage.getItem("userId");
         const response = await fetchArtistProfileById(userId);

         setName(response.name);
         setBirthDate(response.birthDate);
         setWorkshop(response.workshop);
         setProfileImage(response.profileImage);
         setExhibition(response.exhibition);

         // Fetch user's art pieces
         const artData = await fetchArtPieceId(userId);
         setArtPieces(Array.isArray(artData) ? artData : [artData]);
      };

      loadProfile();
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Profil bilgileri ve eserler gönderildi:", {
         name,
         birthDate,
         workshop,
         profileImage,
         exhibition,
      });
      const payload = { name, birthDate, workshop, profileImage, exhibition };

      try {
         const response = await fetchArtistProfile(payload);
         console.log("Sunucudan gelen yanıt:", response);
         alert("Profil bilgileri başarıyla kaydedildi!");
      } catch (error) {
         console.error("Profil bilgileri kaydedilirken hata oluştu:", error);
         alert("Profil bilgileri kaydedilirken bir hata oluştu.");
      }
   };

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setProfileImage(reader.result);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleProfileImageClick = () => {
      fileInputRef.current.click();
   };

   const handlePasswordChange = async (e) => {
      e.preventDefault();
      try {
         const userId = localStorage.getItem("userId");
         await changePassword(userId, oldPassword, newPassword);
         alert("Şifre başarıyla değiştirildi!");
         setOldPassword("");
         setNewPassword("");
      } catch (error) {
         console.error("Şifre değiştirme hatası:", error);
         alert("Şifre değiştirme sırasında bir hata oluştu.");
      }
   };

   const addTodo = () => {
      if (todo.trim() !== "") {
         setExhibition([...exhibition, todo]);
         setTodo("");
      }
   };

   const removeTodo = (index) => {
      const newExhibition = [...exhibition];
      newExhibition.splice(index, 1);
      setExhibition(newExhibition);
   };

   const handleDeleteArtPiece = async (artId) => {
      try {
         await deleteArtPiece(artId);
         setArtPieces(artPieces.filter((art) => art._id !== artId));
         alert("Eser başarıyla silindi!");
      } catch (error) {
         console.error("Eser silinirken hata oluştu:", error);
         alert("Eser silinirken bir hata oluştu.");
      }
   };

   return (
      <Container className="mt-5 mb-5">
         <Row>
            <Col md={4} className="mb-3 d-flex justify-content-center mt-5">
               <div
                  onClick={handleProfileImageClick}
                  style={{ cursor: "pointer" }}
               >
                  <div className="profile-icon">
                     {profileImage ? (
                        <Image
                           src={profileImage}
                           alt="Sanatçı Fotoğrafı"
                           fluid
                        />
                     ) : (
                        <FontAwesomeIcon icon={faUser} size="10x" />
                     )}
                  </div>
               </div>
               <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  accept="image/*"
               />
            </Col>
            <Col md={8}>
               <Form onSubmit={handleSubmit}>
                  <div>
                     <h4>Kişisel Bilgiler</h4>
                     <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Ad Soyad:</Form.Label>
                        <Form.Control
                           type="text"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        />
                     </Form.Group>
                     <Form.Group className="mb-3" controlId="birthDate">
                        <Form.Label>Doğum Tarihi:</Form.Label>
                        <Form.Control
                           type="date"
                           value={birthDate}
                           onChange={(e) => setBirthDate(e.target.value)}
                        />
                     </Form.Group>
                     <Form.Group className="mb-3" controlId="workshop">
                        <Form.Label>Kişisel Bilgiler:</Form.Label>
                        <Form.Control
                           as="textarea"
                           rows={4}
                           value={workshop}
                           onChange={(e) => setWorkshop(e.target.value)}
                        />
                     </Form.Group>
                  </div>
                  <div className="mt-4">
                     <h4>Katıldığı Sergiler</h4>
                     <Form.Group className="mb-3" controlId="todo">
                        <Form.Control
                           type="text"
                           placeholder="Sergi adı..."
                           value={todo}
                           onChange={(e) => setTodo(e.target.value)}
                        />
                        <Button className="my-2" onClick={addTodo}>
                           Ekle
                        </Button>
                     </Form.Group>
                     <ul>
                        {exhibition.map((todo, index) => (
                           <li key={index}>
                              {todo}
                              <Button
                                 variant="danger"
                                 size="sm"
                                 className="ms-2 my-1"
                                 onClick={() => removeTodo(index)}
                              >
                                 Sil
                              </Button>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <Button variant="primary" type="submit">
                     Kaydet
                  </Button>
               </Form>
               <Accordion className="mt-4">
                  <Accordion.Item eventKey="0">
                     <Accordion.Header>Şifre Değiştirme</Accordion.Header>
                     <Accordion.Body>
                        <Form onSubmit={handlePasswordChange}>
                           <Form.Group className="mb-3" controlId="oldPassword">
                              <Form.Label>Eski Şifre:</Form.Label>
                              <Form.Control
                                 type="password"
                                 value={oldPassword}
                                 onChange={(e) =>
                                    setOldPassword(e.target.value)
                                 }
                                 autoComplete="new-password"
                              />
                           </Form.Group>
                           <Form.Group className="mb-3" controlId="newPassword">
                              <Form.Label>Yeni Şifre:</Form.Label>
                              <Form.Control
                                 type="password"
                                 value={newPassword}
                                 onChange={(e) =>
                                    setNewPassword(e.target.value)
                                 }
                                 autoComplete="new-password"
                              />
                           </Form.Group>
                           <Button variant="primary" type="submit">
                              Şifreyi Değiştir
                           </Button>
                        </Form>
                     </Accordion.Body>
                  </Accordion.Item>
               </Accordion>
               <div className="mt-4">
                  <h4>Eserler</h4>
                  <div className="row">
                     {artPieces.map((artPiece) => (
                        <div className="col-md-3 mb-4" key={artPiece._id}>
                           <div className="card">
                              <img
                                 src={artPiece.imageUrl}
                                 className="card-img-top"
                                 alt={artPiece.imageName}
                              />
                              <div className="card-body">
                                 <h5 className="card-title">
                                    {artPiece.imageName}
                                 </h5>
                                 <h6 className="card-title">
                                    Fiyat: {artPiece.price} TL
                                 </h6>
                                 <h6 className="card-title">
                                    Boyut: {artPiece.width} x {artPiece.height}
                                 </h6>
                                 <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() =>
                                       handleDeleteArtPiece(artPiece._id)
                                    }
                                 >
                                    Sil
                                 </Button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </Col>
         </Row>
      </Container>
   );
};

export default ProfileEdit;
