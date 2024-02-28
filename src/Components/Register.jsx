import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginFoto from "../img/SanatınDijitalEvreni.png";

const RegisterPage = () => {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [firstNameError, setFirstNameError] = useState("");
   const [lastNameError, setLastNameError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");
   const [confirmPasswordError, setConfirmPasswordError] = useState("");
   const [userType, setUserType] = useState("");

   const validateFirstName = () => {
      if (!firstName.trim()) {
         setFirstNameError("Ad alanı boş bırakılamaz.");
      } else {
         setFirstNameError("");
      }
   };

   const validateLastName = () => {
      if (!lastName.trim()) {
         setLastNameError("Soyad alanı boş bırakılamaz.");
      } else {
         setLastNameError("");
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
      validateLastName();
      validateEmail();
      validatePassword();
      validateConfirmPassword();
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      validateAllFields();

      if (
         !firstNameError &&
         !lastNameError &&
         !emailError &&
         !passwordError &&
         !confirmPasswordError &&
         userType
      ) {
         // Backend'e gönderme işlemleri
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
                        <Form.Label>Adınız</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Name"
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                           onBlur={validateFirstName}
                        />
                        {firstNameError && (
                           <Form.Text className="text-danger">
                              {firstNameError}
                           </Form.Text>
                        )}
                     </Form.Group>

                     <Form.Group
                        controlId="formBasicLastName"
                        className="Register"
                     >
                        <Form.Label>Soyadınız</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Surname"
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                           onBlur={validateLastName}
                        />
                        {lastNameError && (
                           <Form.Text className="text-danger">
                              {lastNameError}
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
                              checked={userType === "artist"}
                              onChange={() => handleUserTypeChange("artist")}
                           />
                           <Form.Check
                              type="radio"
                              label="Sanatsever"
                              value="artLover"
                              checked={userType === "artLover"}
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
