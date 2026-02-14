
# 💳 NeoBank Pro – Frontend

Modern Digital Banking UI built with React + Vite + TailwindCSS.

This frontend connects to a Ledger-based Banking Backend and demonstrates:

- Secure Authentication (Cookie-based JWT)
- Multi-Account Management
- Ledger-based Transfers
- Idempotent Transactions
- Real-time Balance Calculation
- Transaction History
- Analytics Dashboard
- SweetAlert Modern UI Feedback
- Session Restore on Refresh
- Dark Fintech UI with Animations

---


## 🛠️ Tech Stack

- React (Vite)
- TailwindCSS
- Axios
- SweetAlert2
- Context API (Auth State Management)

---

## 🔐 Authentication Flow

- Login/Register via backend
- JWT stored in HTTP-only cookie
- Session auto-restores on page refresh
- Logout invalidates token (blacklist support in backend)

---

## 💰 Core Features

### 1️⃣ Multi-Account Support
Users can:
- Create multiple accounts
- Switch between accounts
- View individual balances

---

### 2️⃣ Ledger-Based Transfers
- Double-entry accounting system
- DEBIT from sender
- CREDIT to receiver
- Balance derived from ledger entries

---

### 3️⃣ Idempotency Protection
Each transaction includes:
```

idempotencyKey

```
Prevents duplicate transfers if request is retried.

---

### 4️⃣ Dashboard Analytics
Displays:
- Total Accounts
- Total Balance
- Last Transaction
- Animated Balance Count-Up

---

### 5️⃣ Transaction History
- Shows Debit (Red)
- Shows Credit (Green)
- Sorted latest first

---

## 🎨 UI Highlights

- Glassmorphism card design
- Glow animated background
- Modern Fintech dark theme
- Responsive layout
- Smooth transitions
- Count-up balance animation

---

## ⚙️ Environment Variables

Create `.env` file:

```

VITE_API_URL=[http://localhost:3000/api](http://localhost:3000/api)

```

For production:

```

VITE_API_URL=[https://your-backend-url/api](https://your-backend-url/api)

````

---

## 🧪 Run Locally

```bash
npm install
npm run dev
````

---

## 📂 Project Structure

```
src/
 ├── components/
 ├── context/
 ├── pages/
 ├── services/
 ├── utils/
 └── App.jsx
```

---

## 📌 Backend Repository

[https://github.com/anshob257/banking-backend](https://github.com/anshob257/banking-backend)

---

## 👨‍💻 Author

Ansh Oberai
Final Year B.Tech Student
DevOps & Backend Focused Engineer

---

## 🎯 Interview Talking Points

* Ledger-based balance derivation
* Double-entry accounting
* Idempotency in financial systems
* Cookie-based JWT authentication
* Session restore mechanism
* Transaction atomicity
* Frontend state management

---

## 📈 Future Improvements

* WebSockets for live balance updates
* Admin panel
* Account freeze
* Rate limiting
* Email verification
* Password reset
* Audit logs
* Microservices split

---

## ⭐ If you like this project

Give it a star ⭐

```

---

# 🔥 This README Looks:

- Professional
- Structured
- Interview-ready
- Fintech serious

---
