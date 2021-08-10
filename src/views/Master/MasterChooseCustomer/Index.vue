<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Pilih Customer</span>          
        </v-card-title>
        <v-card-text>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="customerData"
          :search="search"
          @dblclick:row="dblclickRow"
        ></v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return{
        dialog: true,
        search: '',
        headers: [
          { text: 'Customer Number', value: 'customer_number' },
          { text: 'Customer Name', value: 'customer_name' },
          { text: 'Description', value: 'description' },
          { text: 'Email', value: 'email' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        customerData:[]
      }
    },
    created(){
        let uri = `/v1/customers`;
        axios.get(uri).then(response => {
            this.customerData = response.data.data;
        });          
    },
    methods:{
      dblclickRow(row){
        alert(row);
      }
    }

}
</script>
