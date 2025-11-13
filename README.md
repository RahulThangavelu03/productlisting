# Product Listing App

A responsive Next.js + React + Material UI web application that displays products fetched from a public API. It allows users to search, filter, and browse products efficiently across devices.

---

## Features

- Dynamic product grid — responsive layout using Material UI Grid and CSS Grid.
- Live search — filter products by title or description as you type.
- Category filter — narrow products by category.
- Rating filter — show products above a selected rating.
- Price range slider — filter products within a custom price range.
- Reset filters — quickly clear all applied filters.
- Loading state — displays a spinner while fetching data.
- Error handling — shows a friendly error message and retry option on failure.
- Responsive design — mobile, tablet, and desktop support.

---

## Tech Stack

- Next.js
- React 18
- Material UI (MUI v5)
- JavaScript (ES6+)
- Fetch API

---

## API

Product data is fetched from:
https://dummyjson.com/products

---

## How it works

1. On page load the app fetches products from the API.
2. Data is held in component state using `useState` and `useEffect`.
3. Filters (search, category, rating, price range) update state and a derived filtered list is shown.
4. The grid layout uses responsive breakpoints so the number of columns adapts to screen size.

---

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/RahulThangavelu03/productlisting.git

   ```

2. Change into the project folder
   cd next-app

3 .Install dependencies
npm install

4.Run the development server
npm run dev
