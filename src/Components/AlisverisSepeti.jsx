// AlisverisSepeti.js

import React, { useState, useEffect } from "react";
import {
   Table,
   Button,
   InputGroup,
   FormControl,
   Container,
   Row,
   Col,
   Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";

const AlisverisSepeti = () => {
   const { cartItems, removeFromCart, clearCart, handleQuantityChange } =
      useCart();
   const [discountCode, setDiscountCode] = useState("");
   const [discountApplied, setDiscountApplied] = useState(false);
   const [discountPercent, setDiscountPercent] = useState(0);
   const [discountAmount, setDiscountAmount] = useState(0);

   useEffect(() => {
      const subtotal = cartItems.reduce(
         (total, item) => total + item.price * item.quantity,
         0
      );
      const discount = discountApplied ? (subtotal * discountPercent) / 100 : 0;
      setDiscountAmount(discount);
   }, [cartItems, discountApplied, discountPercent]);

   const handleApplyDiscount = () => {
      if (discountCode === "INDIRIM10") {
         setDiscountPercent(10);
         setDiscountApplied(true);
      } else {
         alert("Geçersiz indirim kodu.");
      }
   };

   const calculateTotal = () => {
      const subtotal = cartItems.reduce(
         (total, item) => total + item.price * item.quantity,
         0
      );
      return (subtotal - discountAmount).toFixed(2);
   };

   return (
      <Container>
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>Eser</th>
                  <th>Birim Fiyat</th>
                  <th>Miktar</th>
                  <th>Ara Toplam</th>
                  <th>İşlem</th>
               </tr>
            </thead>
            <tbody>
               {cartItems.map((item) => (
                  <tr key={item.id}>
                     <td>{item.name}</td>
                     <td>{`${item.price.toFixed(2)} TL`}</td>
                     <td>
                        <input
                           type="number"
                           value={item.quantity}
                           onChange={(e) =>
                              handleQuantityChange(
                                 item.id,
                                 parseInt(e.target.value)
                              )
                           }
                           min={0}
                        />
                     </td>
                     <td>{`${(item.price * item.quantity).toFixed(2)} TL`}</td>
                     <td>
                        <Button
                           variant="outline-danger"
                           onClick={() => removeFromCart(item.id)}
                        >
                           Sil
                        </Button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
         <Row className="align-items-center">
            <Col>
               <Link to="/kategori/heykel">
                  <Button variant="info">Alışverişe Devam</Button>
               </Link>
            </Col>
            <Col className="text-right">
               <Button variant="secondary" onClick={clearCart}>
                  Alışveriş Sepetini Temizle
               </Button>
            </Col>
         </Row>
         <Row className="mt-3">
            <Col md={6}>
               <InputGroup className="mb-3">
                  <FormControl
                     placeholder="Varsa kupon kodunuzu giriniz."
                     aria-label="Discount code"
                     value={discountCode}
                     onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <Button variant="dark" onClick={handleApplyDiscount}>
                     Kuponu Uygula
                  </Button>
               </InputGroup>

               {discountApplied && (
                  <Alert variant="success">İndirim başarıyla uygulandı!</Alert>
               )}
            </Col>
            <Col md={6}>
               <Table>
                  <tbody>
                     <tr>
                        <td>Ara Toplam</td>
                        <td>{`${calculateTotal()} TL`}</td>
                     </tr>
                     {discountApplied && (
                        <tr>
                           <td>İndirim ({discountPercent}%)</td>
                           <td>-{`${discountAmount.toFixed(2)} TL`}</td>
                        </tr>
                     )}
                     <tr>
                        <td>Taksit Tutarları</td>
                        <td>0,00 TL</td>
                     </tr>
                     <tr>
                        <td>Genel Toplam</td>
                        <td>{`${calculateTotal()} TL`}</td>
                     </tr>
                  </tbody>
               </Table>
               <Button variant="dark" size="lg" className="w-100">
                  ÖDEME YAP
               </Button>
            </Col>
         </Row>
      </Container>
   );
};

export default AlisverisSepeti;
