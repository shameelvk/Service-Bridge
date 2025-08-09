// Setup script for Service Bridge Malappuram
// This script helps set up the application with sample data

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Service Bridge Malappuram...');

// Create .env.local if it doesn't exist
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  const envContent = `MONGODB_URI=mongodb://localhost:27017/service-bridge-malappuram
JWT_SECRET=service-bridge-malappuram-secret-key-change-in-production
ADMIN_PHONE=+919876543210`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
} else {
  console.log('✅ .env.local already exists');
}

console.log(`
📋 Setup Instructions:

1. Install MongoDB:
   - macOS: brew install mongodb-community
   - Or use MongoDB Atlas (cloud): https://cloud.mongodb.com

2. Start MongoDB (if using local):
   brew services start mongodb-community

3. Seed the database:
   curl -X POST http://localhost:3000/api/seed

4. Access the application:
   - User side: http://localhost:3000
   - Admin login: http://localhost:3000/admin
   - Default admin: username=admin, password=admin123

🎉 Setup complete! Your Service Bridge Malappuram app is ready.
`);
