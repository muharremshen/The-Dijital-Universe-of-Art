import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginFoto from "../img/SanatınDijitalEvreni.png";
import { registerUser } from "../Request/request";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
   const [name, setFirstName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [firstNameError, setFirstNameError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");
   const [confirmPasswordError, setConfirmPasswordError] = useState("");
   const [status, setUserType] = useState("");
   const navigate = useNavigate();

   const validateFirstName = () => {
      if (!name.trim()) {
         setFirstNameError("Ad alanı boş bırakılamaz.");
      } else {
         setFirstNameError("");
      }
   };

   const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.trim()) {
         setEmailError("E-posta alanı boş bırakılamaz.");
      } else if (!emailRegex.test(email)) {
         setEmailError("Geçerli bir e-posta adresi giriniz.");
      } else {
         setEmailError("");
      }
   };

   const validatePassword = () => {
      if (!password.trim()) {
         setPasswordError("Şifre alanı boş bırakılamaz.");
      } else if (password.length < 6) {
         setPasswordError("Şifre en az 6 karakter olmalıdır.");
      } else {
         setPasswordError("");
      }
   };

   const validateConfirmPassword = () => {
      if (!confirmPassword.trim()) {
         setConfirmPasswordError("Şifre onay alanı boş bırakılamaz.");
      } else if (confirmPassword !== password) {
         setConfirmPasswordError("Şifreler eşleşmiyor.");
      } else {
         setConfirmPasswordError("");
      }
   };

   const handleUserTypeChange = (selectedType) => {
      setUserType(selectedType);
   };

   const validateAllFields = () => {
      validateFirstName();
      validateEmail();
      validatePassword();
      validateConfirmPassword();
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const data = {
         name,
         email,
         password,
         status,
      };

      validateAllFields();

      const response = await registerUser(data);

      if (response && response.message) {
         alert("Kayıt başarıyla tamamlandı!");
         // İsteğe bağlı olarak başka bir işlem yapabilirsiniz, örneğin:
         navigate("/login"); // Kayıt başarılı olduğunda otomatik olarak giriş sayfasına yönlendirme
      } else {
         alert("Kayıt başarısız oldu. Lütfen tekrar deneyin.");
      }
   };

   return (
      <Container fluid>
         <Row>
            <Col md={6}>
               <img
                  src={LoginFoto}
                  alt="Login Page Image"
                  style={{ width: "100%", height: "100vh", objectFit: "cover" }}
               />
            </Col>
            <Col md={6}>
               <div
                  style={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     height: "100vh",
                  }}
               >
                  <Form style={{ width: "80%" }} onSubmit={handleSubmit}>
                     <Form.Group
                        controlId="formBasicFirstName"
                        className="Register"
                     >
                        <Form.Label>Adınız-Soyadınız</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Name"
                           value={name}
                           onChange={(e) => setFirstName(e.target.value)}
                           onBlur={validateFirstName}
                           required
                        />
                        {firstNameError && (
                           <Form.Text className="text-danger">
                              {firstNameError}
                           </Form.Text>
                        )}
                     </Form.Group>

                     <Form.Group
                        controlId="formBasicEmail"
                        className="Register"
                     >
                        <Form.Label>E-posta Adresiniz</Form.Label>
                        <Form.Control
                           type="email"
                           placeholder="E-mail"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           onBlur={validateEmail}
                           required
                        />
                        {emailError && (
                           <Form.Text className="text-danger">
                              {emailError}
                           </Form.Text>
                        )}
                     </Form.Group>

                     <Form.Group
                        controlId="formBasicPassword"
                        className="Register"
                     >
                        <Form.Label>Şifre</Form.Label>
                        <Form.Control
                           type="password"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           onBlur={validatePassword}
                           required
                        />
                        {passwordError && (
                           <Form.Text className="text-danger">
                              {passwordError}
                           </Form.Text>
                        )}
                     </Form.Group>

                     <Form.Group
                        controlId="formBasicConfirmPassword"
                        className="Register"
                     >
                        <Form.Label>Şifre Tekrar</Form.Label>
                        <Form.Control
                           type="password"
                           placeholder="Confirm Password"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           onBlur={validateConfirmPassword}
                           required
                        />
                        {confirmPasswordError && (
                           <Form.Text className="text-danger">
                              {confirmPasswordError}
                           </Form.Text>
                        )}
                     </Form.Group>
                     <Form.Group
                        controlId="formBasicUserType"
                        className="Register"
                     >
                        <Form.Label>Sanat Alanınız</Form.Label>
                        <div>
                           <Form.Check
                              type="radio"
                              label="Sanatçı"
                              value="artist"
                              checked={status === "artist"}
                              onChange={() => handleUserTypeChange("artist")}
                           />
                           <Form.Check
                              type="radio"
                              label="Sanatsever"
                              value="artLover"
                              checked={status === "artLover"}
                              onChange={() => handleUserTypeChange("artLover")}
                           />
                        </div>
                     </Form.Group>

                     <div className="giriskayit">
                        <Button variant="primary" type="submit">
                           Kayıt Ol
                        </Button>

                        <Form.Text className="text-muted">
                           Hesabın var mı?{" "}
                           <Link to="/login" className="kayit">
                              Buradan giriş yapabilirsin
                           </Link>
                        </Form.Text>
                     </div>
                  </Form>
               </div>
            </Col>
         </Row>
      </Container>
   );
};

export default RegisterPage;
