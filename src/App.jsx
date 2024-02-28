import "./App.css";
import "./Css/AtliKarinca.css";
import "./Css/SonEklenenler.css";
import "./Css/sanatci1.css";
import "./Css/Login.css";
import "./Css/Register.css";
import "./Css/Kategori.css";
import "./Css/FotografEkle.css";
import "./Css/EserlerDetay.css";
import { Routes, Route } from "react-router-dom";
import Anasayfa from "./Routes/Anasayfa";
import Contacts from "./Routes/Contacts";
import Sanatcilar from "./Routes/Sanatcilar";
import Sanatci from "./Routes/Sanatci";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import ResimPage from "./Routes/ResimPage";
import HeykelPage from "./Routes/HeykelPage";
import FotografPage from "./Routes/FotografPage";
import FotografEkle from "./Routes/FotografEkle";
import EserlerDetay from "./Routes/EserlerDetay";
import CanliMuzayede from "./Routes/CanliMuzayede";
import AlisverisSepeti from "./Routes/AlisverisSepeti";
function App() {
   return (
      <Routes>
         <Route path="/" element={<Anasayfa />} />
         <Route path="/contacts" element={<Contacts />} />
         <Route path="/sanatcilar" element={<Sanatcilar />} />
         <Route path="/sanatci" element={<Sanatci />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/kategori/resim" element={<ResimPage />} />
         <Route path="/kategori/heykel" element={<HeykelPage />} />
         <Route path="/kategori/fotograf" element={<FotografPage />} />
         <Route path="/ekle" element={<FotografEkle />} />
         <Route path="/sculpture" element={<EserlerDetay />} />
         <Route path="/canli-muzayede" element={<CanliMuzayede />} />
         <Route path="/alisveris-sepeti" element={<AlisverisSepeti />} />
      </Routes>
   );
}

export default App;
