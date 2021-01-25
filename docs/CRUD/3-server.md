tl;dr for setting stuff up in server.js

### Navigate to server.js under api and set your routers

```javascript
const suppliers_routes = require('./routes/suppliers');
const chickenRoutes = require('./routes/chickens')
```

### Use the routes
```javascript
app.use('/api/suppliers', suppliers_routes);
app.use('/api/chickens', chickenRoutes)
```

and thats it
