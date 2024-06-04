import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../Request/request";
import { Link } from "react-router-dom"; // React Router ile geri butonu için

function Users() {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const getUsers = async () => {
         try {
            const users = await fetchUsers();
            setUsers(users);
         } catch (error) {
            console.error("Kullanıcılar alınamadı:", error);
         }
      };

      getUsers();
   }, []);

   const deleteUsers = async (userId) => {
      try {
         await deleteUser(userId);
         setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
         console.error("Kullanıcı silinemedi:", error);
      }
   };

   return (
      <div className="container">
         <h2 className="text-center mb-4">Kullanıcı Yönetimi</h2>
         <Link to="/dashboard" className="btn btn-primary mb-4">
            Geri
         </Link>
         <div className="row">
            {users.map((user) => (
               <div key={user._id} className="col-md-4 mb-4">
                  <div className="card user-card">
                     <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">
                           <strong>Email:</strong> {user.email}
                        </p>
                        <p className="card-text">
                           <strong>Durum:</strong> {user.status}
                        </p>
                        <button
                           onClick={() => deleteUsers(user._id)}
                           className="btn btn-sm btn-danger delete-button"
                        >
                           Sil
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default Users;
