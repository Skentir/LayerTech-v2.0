General component for Tables.

Features:

- Filter via search
- Sort column
- Pagination

### Preview (Ipad):

![image](https://user-images.githubusercontent.com/54620209/101488241-52184080-399a-11eb-9da0-1b6bce8c417d.png)

### Required parameters (props coming from parent component):

    tableTitle (String) - Title of the table/card
    tableData (array of objects) - data to be displayed
    tableCols (array of objects) - header titles

### format:

### required (bare minimum):

```
        {
          "text": "calories",
          "value":"calories"
        }
```

where text is the display string, value is the reference key used by objects in `tableData`

### other option:

```
        {
          "text": "Dessert (100g serving)",
          "align": "start",
          "sortable": false,
          "value": "name"
        }
```

      sortable, align is an example of props used by the v-data-table component

      For more info on v-data-table props: **https://vuetifyjs.com/en/api/v-data-table/#props**

### Usage:

```
<template>
  <div class="home">
    <Table
      :tableData="this.componentData[0].data"
      :tableCols="this.componentData[0].headers"
      :tableTitle="tableTitle"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Table from '@/components/Table.vue';
import dessertData from '@/models/desserts.json';

export default {
  name: 'Home',
  components: {
    Table,
  },
  data() {
    return {
      tableTitle: 'Nutrition',
      componentData: dessertData,
    };
  },
};
</script>
```
