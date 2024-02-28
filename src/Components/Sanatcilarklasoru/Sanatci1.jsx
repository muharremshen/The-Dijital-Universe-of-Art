import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import AdemKipcak from "../../img/AdemKipcak.png";
const Sanatci1 = () => {
   return (
      <Container className="mt-5">
         <Row>
            <Col md={4} className="mb-3">
               <Image src={AdemKipcak} alt="Artist Photo" fluid />
            </Col>

            <Col md={8} className="d-flex  flex-column">
               <h2>Adem Kipçak</h2>
               <p>
                  1992 yılında Van’da doğdu. 2010 yılında Van Güzel Sanatlar
                  Lisesi'nden mezun oldu. 2016 yılında Eskişehir Anadolu
                  Üniversitesi Güzel Sanatlar Fakültesi resim bölümünden mezun
                  oldu. Çalışmalarına kendi atölyesinde devam etmektedir.
               </p>

               <h5 className="sanatci-baslik">‘’TAŞLAR”</h5>
               <p>
                  Yapmış olduğum çalışmaların ana merkezinde yer alan taşlar;
                  yıkımdan uzak ve kendi ütopyamda yeniden şekillenmektedir.
                  İnsanlık olarak doğadan uzaklaştıkça bireyselleştik ve
                  kendimize kurduğumuz alanlar tekinsiz bir hal almaya başladı.
                  Pandemi ile bu durumu somut bir biçimde hissetmiş olduk.
                  Doğaya karşı olan özlem bize onu ne denli yok ettiğimiz
                  gerçeğini de göstermekte ve bu durumu üzüntüyle
                  seyretmekteyim. Resimlerimin oluşma sürecinde yerini alan bu
                  duyguların konu olarak kurgusal doğa manzaralarını seçmemdeki
                  yeri yadsınamaz.
               </p>

               <h5 className="sanatci-baslik">KATILDIĞI SERGİLER</h5>
               <ul>
                  <li>
                     2014 - Türkiye Delegasyonu Çoğalma, Societe Nationale Des
                     Beaux-Arts, Fransa
                  </li>
                  <li>
                     2014/2015 - Küçük Şeyler 17. Resim ve Seramik Sergisi,
                     Ankara
                  </li>
                  <li>
                     2015 - Toplum Sanat İlişkisi ve Süreç Proje Sergisi Kamusal
                     Alanda Diyalog, Anadolu Ün. Çağdaş Sanatlar Müzesi,
                     Eskişehir
                  </li>
                  <li>
                     2015 - Gençler Resim Sergisi, Terakki Sanat Galerisi,
                     İstanbul
                  </li>
                  <li>
                     2016 - “Yeni Aralık/ Nev Space “Projesi Sergisi, Galeri
                     Soyut, Ankara
                  </li>
                  <li>2017 - Art Ankara Çağdaş Sanat Fuarı, Ankara</li>
                  <li>2021 - "Aldatılmış Yuva" Oddartspace, İstanbul</li>
                  <li>
                     2022 - Ankara 8. Çağdaş Sanat Fuarı Alarmart / Yeşil Dalga
                  </li>
                  <li>2022 - Artcontact İstanbul Alarmart / Yeşil Dalga</li>
                  <li>2022 - "Renklerin Ahengi" Karma sergi, İzmir</li>
                  <li>2022 - Bodrum Çağdaş Sanat Fuarı / Gala Galeri</li>
                  <li>
                     2023 - "Taşlar" Kişisel sergi, Mira Koldaş Galeri, Ankara
                  </li>
                  <li>2023 - Artcontact İstanbul</li>
               </ul>
            </Col>
         </Row>
      </Container>
   );
};

export default Sanatci1;
