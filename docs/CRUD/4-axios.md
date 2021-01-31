tl;dr for the vue page with axios calls

### import axios and remove the import for the models/model_name.json
```javascript
import axios from 'axios';
```

### transfer your headers under data()
```javascript
data: () => ({
  // ...
componentData: [],
    headers: [
      {
        text: 'id', align: 'start', sortable: false, value: 'supplier_id',
      },
      { text: 'Supplier Name', value: 'supplier_name' },
      { text: 'Suppliers Files Link', value: 'files_link', sortable: false },
      { text: 'Contact Number', value: 'contact_num', sortable: false },
      { text: 'Email', value: 'email', sortable: false },
      { text: 'Company Name', value: 'company_name' },
      { text: 'Position in Company', value: 'position' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    // ...
)}
```

### Time to load your data
```javascript
  async mounted() {
    /*
      switched created to mounted based on reference

      this just loads the suppliers into componentData
    */
    const response = await axios.get('/api/suppliers/');
    this.componentData = response.data;
  },
```

### Dont forget to adjust headers and items in the <v-data-table>
```vue
<v-data-table
        :headers="this.headers"
        :items="this.componentData"
        :search="search"
        class="elevation-1"
        >
```

### Turn the save() method into an async function with axios calls to save/update
```javascript
async save() {
      if (this.editedIndex > -1) {
        /*
          this sends the _id to api/suppliers/:id to update
        */
        const param = this.componentData[this.editedIndex]._id;
        /*
          I found that sending the entire this.edited item is acceptable

          returns the updated supplier/row
        */
        const response = await axios.put('/api/suppliers/' + param, this.editedItem);
        /*
          Reused the the line under to 'refresh' the table with the updated row
        */
        Object.assign(this.componentData[this.editedIndex], response.data);
      } else {
        /*
          To follow:
          remove this supplier_id and other X_id
        */
        // eslint-disable-next-line prefer-template
        this.editedItem.supplier_id = '0' + (this.componentData.length + 1).toString();
        /*
          ****Throws Error 500 when all fields are not filled in
        */

        const response = await axios.post('/api/suppliers/', this.editedItem);
        /*
          returns newly created suppliers then pushing it in the table
        */
        this.componentData.push(response.data);
      }

      this.close();
    },
```

Don't forget to test if the dialog box loads the correct data

To follow: Removing supplier_id, and other name_id entirely since we would be relying on ObjectId
