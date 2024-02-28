import React, { useState } from "react";
import { useEffect } from "react";
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

const AlisverisSepeti = () => {
   const [cartItems, setCartItems] = useState([
      {
         id: 1,
         name: "Nilüferler",
         price: 8000,
         quantity: 1,
      },
      {
         id: 2,
         name: "Kanatlı Balık",
         price: 20000,
         quantity: 1,
      },
   ]);
   const [discountCode, setDiscountCode] = useState(""); // Kullanıcının girdiği indirim kodu
   const [discountApplied, setDiscountApplied] = useState(false); // İndirim kodunun uygulanıp uygulanmadığını belirten state
   const [discountPercent, setDiscountPercent] = useState(0); // Uygulanan indirim yüzdesini tutan state
   const [discountAmount, setDiscountAmount] = useState(0); // Hesaplanan indirim miktarını tutan state

   useEffect(() => {
      // sayfa yenilendiğinde veya cartitems,discountapplied,discountpercent değiştiğinde tetiklenir ve günceller.
      const subtotal = cartItems.reduce(
         (total, item) => total + item.price * item.quantity,
         0
      );
      const discount = discountApplied ? (subtotal * discountPercent) / 100 : 0;

      setDiscountAmount(discount);
   }, [cartItems, discountApplied, discountPercent]);

   const handleQuantityChange = (itemId, quantity) => {
      console.log("Değiştirildi", quantity, itemId);
      setCartItems((currentItems) =>
         currentItems.map((item) =>
            item.id === itemId ? { ...item, quantity: quantity } : item
         )
      );
   };

   const handleRemoveItem = (itemId) => {
      setCartItems((currentItems) =>
         currentItems.filter((item) => item.id !== itemId)
      );
   };

   const handleApplyDiscount = () => {
      if (discountCode === "INDIRIM10") {
         setDiscountPercent(10);
         setDiscountApplied(true);
      } else {
         alert("Geçersiz indirim kodu.");
      }
   };

   const handleClearCart = () => {
      setCartItems([]);
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
                           onClick={() => handleRemoveItem(item.id)}
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
               <Button variant="secondary" onClick={handleClearCart}>
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
