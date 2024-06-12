<h1 align="center">
Smart Shopping List RESTful Web API
</h1>
<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="license badge"/>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs badge"/>
  <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt="expressjs badge"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb badge"/>
</p>

### Project Description
Smart shopping list restful web api service, providing user creation, editing, verification operations using jwt technology, allowing shopping lists to be created, edited and deleted, adding and deleting products to shopping lists, offering features such as adding, deleting, updating and viewing products to the system, and also It is a project that includes bestbuy api, swagger ui and many unit tests.

### Project Features
- User sign up, sign in, auth check flows (JWT)
- User Collection
- Shopping List Collection
- Product Collection
- BestBuy API Integration (search with query or id)
- Create, update, delete shopping lists
- Add/remove items from shopping lists
- Create, update, delete products
- Create, update user accounts


- **Comes with a lot of unit tests (mocha & chai)**
- **Swagger UI with bearer authentication**

### Project Routes
- **Authentication Routes** (with JWT)
  - Check auth (GET /auth/check)
  - Login (POST /auth/login)
  - Register (POST /auth/register)
  - Profile Update (PUT /auth/edit)


- **BestBuy Routes**
    - Search product with query (POST /bby/product/search)
    - Search product with ID (GET /bby/product/:id)


- **Product Routes** (this routes requires a bearer token)
    - Get all products (GET /product/)
    - Get product with ID (GET /product/:id)
    - Add new product (POST /product/add)
    - Update a product (PUT /product/update)
    - Delete a product (DELETE /product/delete)


- **Shopping List Routes** (this routes requires a bearer token)
    - Get list by ID (GET /list/get/:id)
    - Create a new list (POST /list/create)
    - Update a list (PUT /list/update)
    - Delete a list (DELETE /list/delete)
    - Add a product into list (POST /list/add-item)
    - Remove a product from list (POST /list/remove-item)


- **Swagger**
    - Access to Swagger UI (GET /swagger)

### Example Unit Tests (run with npm run test)

```
  Authentication
    √ Register a new user (3292ms)
    √ Register with bad request
    √ Login to user account (189ms)
    √ Login with invalid credentials (500ms)
    √ Login with bad request
    √ Get authentication info (593ms)
    √ Get authentication info without token

  BestBuy
    √ Search for 'iPhone 15' in BestBuy Products (1926ms)
    √ Search with bad request in BestBuy Products
    √ Get product with ID in BestBuy (324ms)
    √ Get product with invalid ID in BestBuy (503ms)

  Main
    √ Is Server Working?

  Products
    √ Get list of products (272ms)
    √ Get product with ID (497ms)
    √ Get product with ID (Bad Request)
    √ Add new product (142ms)
    √ Add new product (Bad Request)
    √ Update a product info (140ms)
    √ Update a product info (Bad Request)
    √ Delete a product (655ms)

  Shopping Lists
    √ Get shopping list by ID (138ms)
    √ Get shopping list by ID (Bad Request)
    √ Get unauthorized shopping list (137ms)
    √ Add new shopping list (143ms)
    √ Add new shopping list (Bad Request)
    √ Update a shopping list (272ms)
    √ Update a shopping list (Bad Request)
    √ Create, add items and delete a shopping list (693ms)


  28 passing (11s)
```

### Used Technologies & Packages

- [NodeJS](https://nodejs.org/en "NodeJS") - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Javascript](https://www.javascript.com/ "Javascript") - JavaScript (often abbreviated as JS) is a programming language that, along with HTML and CSS, is one of the core technologies of the World Wide Web.
------------
- [Express](https://www.npmjs.com/package/express "Express")
- [Mongoose](https://www.npmjs.com/package/mongoose "Mongoose")
- [bcrypt](https://www.npmjs.com/package/bcrypt "bcrypt")
- [bestbuy](https://www.npmjs.com/package/bestbuy "bestbuy")
- [dotenv](https://www.npmjs.com/package/dotenv "dotenv")
- [express-validator](https://www.npmjs.com/package/express-validator "express-validator")
- [cors](https://www.npmjs.com/package/cors "cors")
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express "swagger-ui-express")
- [chai](https://www.npmjs.com/package/chai "chai")
- [chai-http](https://www.npmjs.com/package/chai-http "chai-http")
- [mocha](https://www.npmjs.com/package/mocha "mocha")

### License

This project is available for use under the MIT License.