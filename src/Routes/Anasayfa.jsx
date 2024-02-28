import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AtliKarinca from "../Components/Atlikarinca";
import SonEklenenler from "../Components/Soneklenenler";
import Reklam from "../Components/Reklam";
const Anasayfa = () => {
   return (
      <div>
         <Navbar />
         <AtliKarinca />
         <SonEklenenler />
         <Reklam />
         <Footer />
      </div>
   );
};

export default Anasayfa;
