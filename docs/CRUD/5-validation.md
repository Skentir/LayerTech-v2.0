tl;dr for validating create and update to database features in Vue

### On your template, find the form in which you're creating and/or updating the data
```javascript
<v-form ref="form">
<v-text-field v-model="editedItem.breed"
    :rules="rules.breed" label="Breed" required/>
</v-form> 
```
#### Make sure to put your 

### Use the routes
```javascript
app.use('/api/suppliers', suppliers_routes);
app.use('/api/chickens', chickenRoutes)
```

and thats it
