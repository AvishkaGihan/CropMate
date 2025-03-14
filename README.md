# CropMate

A full-stack MERN application enabling farmers to list crops for sale, buyers to purchase crops, and drivers to manage deliveries. The platform streamlines the agricultural supply chain by connecting farmers, buyers, and delivery drivers.

## Features

- Role-based authentication (Farmers, Buyers, Drivers)
- Crop listing and management
- Order tracking system
- Responsive user interface
- Secure payment processing
- Real-time delivery updates

## Tech Stack

- MongoDB - Database
- Express.js - Backend framework
- React.js - Frontend framework
- Node.js - Runtime environment
- Redux Toolkit - State management
- TailwindCSS - Styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm
- MongoDB

### Installation

1. Clone the repository

```bash
git clone https://github.com/AvishkaGihan/cropmate.git
cd cropmate
```

2. Install dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
```

3. Create environment files

```bash
# Root directory
cp example.env .env

# Client directory
cd client
cp example.env .env.development
```

4. Start development servers

```bash
# From root directory
npm run dev
```

The application will start with the backend on http://localhost:5000 and frontend on http://localhost:5173

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
