# E-commerce Admin Dashboard

This is a web-based admin dashboard built using **Vue.js**, **Node.js**, and **Prisma**, designed to help e-commerce managers track sales, revenue, inventory, and product performance efficiently.

## Features

### Revenue Analysis Page
- KPI Cards: Total Sales, Orders, Revenue, Visitors, Conversion Rate
- Line Chart: Sales over time (daily, weekly, monthly)
- Pie Chart: Revenue by category
- Bar Chart: Orders by category
- Top Product and Top Category insight

### Inventory Management Page
- Product list with search, filter, and sort
- Inline inventory editing
- Low inventory alert badges
- Forecasting via average daily sales

### Product Registration Page
- Form to register new products
- Upload product images
- Auto-update inventory on submission

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ecommerce-admin-dashboard.git
cd ecommerce-admin-dashboard
```
### 2. Install dependencies
```bash
npm install
```
### 3. Setup Database
Update the .env file with your database URL:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/your-db-name"
```
Run Prisma migrations and seed data:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```
### 4. Run the development server
```bash
npm run dev
```
---

## Navigating the Dashboard
- **Dashboard (Home)**: View high-level KPIs and charts related to sales and orders.
- **Inventory**: Manage stock levels and search/filter products.
- **Add Product**: Register a new product with details and image upload.

---

## Tech Stack
- **Frontend:** Vue.js + TailwindCSS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL + Prisma ORM
- **Charts:** Chart.js or ECharts
- **Hosting:** Vercel / Netlify (Frontend), Render / Railway (Backend)

---
## Notes
- Sample data is generated for orders and visitors between April–July 2025.
- Product additions are persisted via Prisma and affect inventory stats in real time.
