# Service Bridge Malappuram

A complete full-stack web application connecting users with trusted service providers in Malappuram. Built with Next.js, Tailwind CSS, and MongoDB.

## Features

### User Side
- Browse services by categories and subcategories
- View detailed service information and pricing
- Book services with a simple form
- Responsive design with dark/light mode toggle
- SEO-optimized pages with dynamic meta tags

### Admin Side
- Secure admin login with JWT authentication
- Dashboard with booking management
- Category and subcategory management
- Service provider management
- Real-time booking notifications

## Tech Stack

- **Frontend**: Next.js (Pages Router), Tailwind CSS, Heroicons
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT with HTTP-only cookies
- **Styling**: Tailwind CSS with dark mode support
- **Theme**: next-themes for theme switching

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/service-bridge-malappuram
JWT_SECRET=your-secret-key-change-in-production
```

3. Seed the database:
```bash
# Start the development server first
npm run dev

# Then in another terminal, seed the database
curl -X POST http://localhost:3000/api/seed
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

### Default Admin Credentials
- Username: `admin`
- Password: `admin123`

## Project Structure

```
├── components/          # Reusable UI components
├── lib/                # Utility libraries (MongoDB, auth)
├── models/             # Mongoose schemas
├── pages/              # Next.js pages and API routes
│   ├── api/           # Backend API endpoints
│   ├── admin/         # Admin pages
│   └── services/      # Dynamic service pages
├── styles/            # Global CSS
└── utils/             # Helper functions
```

## API Endpoints

### Public
- `GET /api/categories` - Get all categories
- `GET /api/subcategories` - Get all subcategories
- `POST /api/bookings` - Create new booking

### Admin (Protected)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/check-auth` - Check authentication
- `PUT /api/bookings` - Update booking status
- CRUD operations for categories, subcategories, and providers

## Database Schema

### Collections
- **categories**: Service categories
- **subcategories**: Individual services with rates and details
- **bookings**: User service bookings
- **providers**: Service provider information
- **admin**: Admin user credentials

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service. Make sure to:

1. Set up environment variables in your deployment platform
2. Connect to a MongoDB database (MongoDB Atlas recommended)
3. Update the JWT secret for production

## License

This project is built for Service Bridge Malappuram.
