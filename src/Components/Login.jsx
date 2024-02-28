import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import LoginFoto from "../img/SanatınDijitalEvreni.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");

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

   const handleSubmit = (e) => {
      e.preventDefault();

      validateEmail();
      validatePassword();

      // Eğer hata mesajları boşsa, formu gönder
      if (!emailError && !passwordError) {
         // Form gönderme işlemleri
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
                     <Form.Group controlId="formBasicEmail" className="E-mail">
                        <Form.Label>E-posta Adresiniz</Form.Label>
                        <Form.Control
                           type="email"
                           placeholder="E-mail"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           onBlur={validateEmail}
                        />
                        {emailError && (
                           <Form.Text className="text-danger">
                              {emailError}
                           </Form.Text>
                        )}
                     </Form.Group>

                     <Form.Group controlId="formBasicPassword">
                        <Form.Label>Şifre</Form.Label>
                        <Form.Control
                           type="password"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           onBlur={validatePassword}
                        />
                        {passwordError && (
                           <Form.Text className="text-danger">
                              {passwordError}
                           </Form.Text>
                        )}
                     </Form.Group>
                     <div className="giriskayit">
                        <Button variant="primary" type="submit">
                           Giriş Yap
                        </Button>

                        <Form.Text className="text-muted">
                           Hesabın yok mu?{" "}
                           <Link to="/register" className="kayit">
                              Buradan kayıt olabilirsin
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

export default LoginPage;
