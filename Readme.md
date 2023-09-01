## Serverless REST API with Netlify Functions and Fauna

This is a RESTful API designed to perform basic CRUD (Create, Read, Update, Delete) operations on an inventory resource. It's built with Netlify Functions and uses Fauna as the database.

### Getting Started

```bash
git clone https://github.com/your-repo/inventory-api.git
cd inventory-api
npm install
```

You need to create a .env file to save your Fauna key securely
```bash
FAUNA_SECRET="your_fauna_secret_key"
```

You must have Netlify CLI installed to test this locally. To install Netlify CLI run the following: 
```bash

```

To run the functions locally run the following command
```bash
netlify dev
```

To test your REST API use PostMan or Curl. The following is an example:
```bash
curl -X POST https://your-netlify-site.netlify.app/api/create \
  -H "Content-Type: application/json" \
  -d '{"item": "Laptop", "quantity": 10, "price": 2000}'
```