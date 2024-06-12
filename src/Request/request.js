// import { BASE_URL } from "@env";
const BASE_URL = "http://localhost:5001";
const token =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ0N2VkYzNhN2Q4OGEyZDlkMmQ2YmQiLCJpYXQiOjE3MTU5MzIzMDYsImV4cCI6MTcxNTkzNTkwNn0.kozx0KrHmMHLW1-6UQwyXmvdMEctQvFFt1nRLG-oQz8";

export const colors = {
   COLOR_PRIMARY: "#f96163",
   COLOR_LIGHT: "#fff",
   COLOR_DARK: "#000",
   COLOR_DARK_ALT: "#262626",
};

export const fetchLogin = async (payload) => {
   try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
         throw new Error(data.message || "Giriş işlemi başarısız oldu.");
      }

      localStorage.setItem("status", data.user.status);
      localStorage.setItem("token", data.token);
      return data;
   } catch (error) {
      console.error("Giris Yapılamadı:", error);
      throw error;
   }
};

export const registerUser = async (userData) => {
   try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(userData),
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Kayıt işlemi başarısız oldu.");
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error registering user:", error);
      throw error;
   }
};

export const fetchArtistProfile = async (payload) => {
   try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await fetch(`${BASE_URL}/artist/${userId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
         throw new Error(data.message || "Profil güncelleme başarısız oldu.");
      }

      localStorage.setItem("status", data.user.status);
      return data;
   } catch (error) {
      console.error("Error fetching artist profile:", error);
      throw error;
   }
};

export const changePassword = async (userId, oldPassword, newPassword) => {
   try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/artist/change-password`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ userId, oldPassword, newPassword }),
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Şifre değiştirme başarısız.");
      }

      const data = await response.json();
      console.log("Şifre değiştirme başarılı:", data.message);
   } catch (error) {
      console.error("Şifre değiştirme hatası:", error);
      throw error;
   }
};

export const getSanatcilar = async () => {
   try {
      const response = await fetch(`${BASE_URL}/artist/sanatcilar`, {});

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Sanatçı verileri alınamadı:", error);
      throw error;
   }
};

export const fetchArtistProfileById = async (userId) => {
   try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/artist/${userId}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Sanatçı profil verileri alınamadı:", error);
      throw error;
   }
};
export const fetchArtists = async (userId) => {
   try {
      const response = await fetch(`${BASE_URL}/artist/${userId}`);

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Sanatçı profil verileri alınamadı:", error);
      throw error;
   }
};

export const fetchArtPiece = async (payload) => {
   try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/art-piece/`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify(payload),
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Sanatçı bilgileri alınamadı");
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Sanatçı bilgileri alınamadı.", error);
      throw error;
   }
};

export const fetchArtPieceId = async (userId) => {
   try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/art-piece/user/${userId}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Eser bulunamadı");
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Bağlanılamadı.", error);
      throw error;
   }
};

export const fetchLatestArtPieces = async () => {
   try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/art-piece/latest`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });
      if (!response.ok) {
         throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching latest art pieces:", error);
      throw error;
   }
};

export const deleteArtPiece = async (userId) => {
   try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/art-piece/${userId}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Eser silinemedi");
      }

      return response.json();
   } catch (error) {
      console.error("Eser silinemedi:", error);
      throw error;
   }
};

export const fetchFotografPieces = async () => {
   try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/art-piece/fotograf`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Sanat eserleri bulunamadı");
      }

      return response.json();
   } catch (error) {
      console.error("Sanat eserleri çekilemedi", error);
      throw error;
   }
};
export const fetchResimPieces = async () => {
   try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/art-piece/resim`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Sanat eserleri bulunamadı");
      }

      return response.json();
   } catch (error) {
      console.error("Sanat eserleri çekilemedi", error);
      throw error;
   }
};

export const fetchHeykelPieces = async () => {
   try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/art-piece/heykel`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Sanat eserleri bulunamadı");
      }

      return response.json();
   } catch (error) {
      console.error("Sanat eserleri çekilemedi", error);
      throw error;
   }
};

export const startAuction = async (auctionData) => {
   try {
      const response = await fetch(`${BASE_URL}/auction/start`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(auctionData),
      });
      if (!response.ok) {
         throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error starting auction:", error);
      throw error;
   }
};

export const placeBid = async (bidData) => {
   try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/auction/bid`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify(bidData),
      });

      if (!response.ok) {
         throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error placing bid:", error);
      throw error;
   }
};

export const AdminLogin = async (username, password) => {
   try {
      const response = await fetch(`${BASE_URL}/admin/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Giriş başarısız");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data;
   } catch (error) {
      console.error("Giriş hatası:", error);
      throw error;
   }
};

export const fetchUsers = async () => {
   try {
      const response = await fetch(`${BASE_URL}/auth/users`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Kullanıcılar alınamadı");
      }

      return response.json();
   } catch (error) {
      console.error("Kullanıcılar çekilemedi", error);
      throw error;
   }
};

export const fetchAuctions = async () => {
   try {
      const response = await fetch(`${BASE_URL}/auction/list`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      });

      if (!response.ok) {
         throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching auctions:", error);
      throw error;
   }
};

export const deleteUser = async (userId) => {
   try {
      const response = await fetch(`${BASE_URL}/auth/${userId}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
      });
      if (!response.ok) {
         throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
   }
};

export const deleteAuction = async (userId) => {
   try {
      const response = await fetch(`${BASE_URL}/auction/${userId}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
      });
      if (!response.ok) {
         throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching auction details:", error);
      throw error;
   }
};

export const getArtPieceDetail = async (id) => {
   try {
      const response = await fetch(`${BASE_URL}/art-piece/${id}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      });
      if (!response.ok) {
         throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching art piece details:", error);
      throw error;
   }
};
