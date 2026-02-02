import Joi from 'joi';

src/
├── app.js                     # Express app setup (middleware, routes)
├── server.js                  # Entry point (DB connect, start server)
│
├── config/
│   └── database.js            # MongoDB connection logic
│
├── routes/
│   ├── auth.route.js          # /api/v1/auth/*
│   └── users.route.js         # /api/v1/users/*
│
├── controllers/
│   ├── auth.controller.js     # login, register logic
│   └── users.controller.js    # profile, user actions
│
├── middlewares/
│   ├── auth.middleware.js     # JWT verification
│   ├── validate.middleware.js # Zod/Joi validator wrapper
│   ├── rateLimit.js           # Rate limit config
│   └── error.middleware.js    # Global error handler
│
├── validators/
│   └── auth.schema.js         # login & register schemas (shared rules)
│
├── models/
│   └── user.model.js          # User mongoose schema
│
├── utils/
│   ├── jwt.js                 # sign / verify helpers (optional)
│   └── hash.js                # password helpers (optional)
│
├── services/                  # (optional, later)
│   └── auth.service.js        # business logic extraction
│
└── index.js / server.js       # app bootstrap (depends on preference)
