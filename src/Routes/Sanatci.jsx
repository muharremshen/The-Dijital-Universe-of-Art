import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Sanatci1 from "../Components/Sanatcilarklasoru/Sanatci1";
import Eserler from "../Components/Eserler";
const Sanatci = () => {
   return (
      <div>
         <Navbar />
         <Sanatci1 />
         <Eserler />
         <Footer />
      </div>
   );
};

export default Sanatci;
