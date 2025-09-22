# React + TypeScript + Vite

# 🌍 ALX Project Nexus – Frontend Engineering Learnings

# Fresh Groceries E-Commerce App

A modern, responsive e-commerce application built with React and powered by a JSON server. This app provides a seamless and interactive grocery shopping experience, showcasing key front-end development skills and a clean, user-friendly interface.

## Key Features

### Product Management
* **API Integration:** Fetches product data from a local JSON server (`db.json`) to dynamically render products.
* **Add New Product:** A user-friendly form allows new products to be added directly to the database.

### Filtering, Sorting, & Search
* **Product Filtering:** Users can filter products by category (e.g., fruits, vegetables, dairy).
* **Product Sorting:** Products can be sorted by price in ascending or descending order.
* **Search Functionality:** An integrated search bar allows users to find products by name quickly.

### User Experience
* **Infinite Scrolling:** Products are loaded in batches as the user scrolls, ensuring a smooth experience for large inventories.
* **Shopping Cart:** Users can add products to a shopping cart and view their total.
* **Checkout & Confirmation:** A modal provides a seamless checkout process, followed by a detailed confirmation page with an order summary.

 ## Installation and Usage

You can follow these steps to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed:
* **Node.js**: [https://nodejs.org/](https://nodejs.org/) (version 14 or higher)
* **npm** (comes with Node.js) or **yarn**

### Clone the Repository

Clone this repository to your local machine using a terminal or command prompt:
```bash
git clone <your-repository-url>
cd <your-project-folder>

 ### Install Dependencies
npm install
# or
yarn install

### Install concurrently
npm install concurrently --save-dev
# or
yarn add concurrently --dev

### Add a dev script to package.json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "server": "json-server --watch db.json --port 5000",
  "dev": "concurrently \"npm run start\" \"npm run server\""
}

### Run the JSON Server
npm run server
# or
yarn server
The server will run on http://localhost:5000.

### Start the Application
npm start
# or
yarn start
