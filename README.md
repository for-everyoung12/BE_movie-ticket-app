# 🎟️ Movie Ticket App - Backend

Đây là backend của ứng dụng **Movie Ticket Booking** được xây dựng bằng **Node.js, Express, MongoDB**.

## 🚀 Link Deploy  
🔗 **Backend API:** [Movie Ticket Backend](https://movie-ticket-backend-k4wm.onrender.com/)  

---

## 📌 Công Nghệ Sử Dụng  
### **🛠 Backend**
- **Node.js & Express.js** → Xử lý API  
- **MongoDB & Mongoose** → Lưu trữ dữ liệu  
- **JSON Web Token (JWT)** → Xác thực người dùng  
- **PayPal API** → Xử lý thanh toán  
- **Nodemailer (Gmail SMTP)** → Gửi email xác nhận  
- **Node-cron** → Quản lý cron job tự động  

### **🌍 Deploy**
- **MongoDB Atlas** → Lưu trữ database online  
- **Render** → Deploy backend Node.js  
- **GitHub** → Quản lý source code  
- **Postman** → Kiểm thử API  

---

## 🛠 Cách Chạy Dự Án Local  
### 1️⃣ **Cài đặt các thư viện**  
```sh
npm install
```

### 2️⃣ **Tạo file `.env`** (đặt trong thư mục gốc)  
```env
# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@movieticketcluster.mongodb.net/MovieTicketDB?retryWrites=true&w=majority

# Server Config
PORT=5000
JWT_SECRET=<your_secret_key>

# PayPal API (Thanh toán)
PAYPAL_CLIENT_ID=<your_paypal_client_id>
PAYPAL_CLIENT_SECRET=<your_paypal_client_secret>
PAYPAL_BASEURL=https://api-m.sandbox.paypal.com
PAYPAL_REDIRECT_BASE_URL=http://localhost:5173

# Email Service (Gửi Email)
EMAIL_SERVICE=gmail
EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_password>
```

🔴 **Lưu ý:**  
- **Không commit file `.env` lên GitHub**, vì nó chứa thông tin nhạy cảm.  
- Thay `<your_paypal_client_id>` và `<your_email>` bằng thông tin thật khi chạy local.  

### 3️⃣ **Chạy server**  
```sh
npm start
```
Hoặc nếu có **nodemon**:  
```sh
npm run dev
```

---

## 🔥 API Documentation  

### **1️⃣ Xác thực người dùng**  
#### 🔹 Đăng ký tài khoản  
```http
POST /api/auth/register
```
**Body JSON:**  
```json
{
  "name": "Nguyen Van A",
  "email": "nguyenvana@example.com",
  "password": "123456"
}
```

#### 🔹 Đăng nhập  
```http
POST /api/auth/login
```
**Body JSON:**  
```json
{
  "email": "nguyenvana@example.com",
  "password": "123456"
}
```
**Response JSON:**  
```json
{
  "accessToken": "eyJhbGciOiJIUzI1...",
  "refreshToken": "eyJhbGciOiJIUzI1..."
}
```

---

### **2️⃣ Quản lý phim**
#### 🔹 Lấy danh sách phim  
```http
GET /api/movies
```
**Response JSON:**  
```json
[
  {
    "_id": "6601e8c5...",
    "title": "Avengers: Endgame",
    "genre": "Action",
    "rating": 8.5
  }
]
```

#### 🔹 Thêm phim mới (Admin)  
```http
POST /api/movies
```
**Yêu cầu Header:**  
```http
Authorization: Bearer <accessToken>
```
**Body JSON:**  
```json
{
  "title": "Spider-Man: No Way Home",
  "genre": "Action",
  "rating": 8.7
}
```

---

### **3️⃣ Quản lý vé xem phim**  
#### 🔹 Đặt vé xem phim  
```http
POST /api/tickets
```
**Body JSON:**  
```json
{
  "userId": "6601e8c5...",
  "showtimeId": "6601e9d1...",
  "seats": ["A1", "A2"]
}
```

#### 🔹 Lấy vé của user  
```http
GET /api/tickets
```
**Yêu cầu Header:**  
```http
Authorization: Bearer <accessToken>
```

---

## 📝 **Tác giả**
👨‍💻 **Hải Sơn**  
📧 Email: [haison121202@gmail.com]  
📌 Github: [github.com/for-everyoung12](https://github.com/for-everyoung12)
