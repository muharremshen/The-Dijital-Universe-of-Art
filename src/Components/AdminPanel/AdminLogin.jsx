import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "../../Request/request";

function Login() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await AdminLogin(username, password);
         if (response._id) {
            navigate("/dashboard");
         } else {
            alert("Giriş başarısız");
         }
      } catch (error) {
         console.error("Giriş hatası:", error);
         alert("Giriş başarısız");
      }
   };

   return (
      <div className="adminlogin-container">
         <div className="adminlogin">
            <div className="card p-4">
               <div className="card-body">
                  <h2 className="card-title text-center mb-4">Admin Girişi</h2>
                  <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label>Kullanıcı Adı:</label>
                        <input
                           type="text"
                           className="form-control"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           required
                        />
                     </div>
                     <div className="form-group">
                        <label>Şifre:</label>
                        <input
                           type="password"
                           className="form-control"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                        />
                     </div>
                     <div className="form-group">
                        <button
                           type="submit"
                           className="btn btn-primary btn-block"
                        >
                           Giriş Yap
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Login;
