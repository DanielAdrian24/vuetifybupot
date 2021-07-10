<template>
    <v-container class="my-5">
        <v-data-table
    :headers="headers"
    :items="userData"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Customers</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="600px"
          scrollable
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="deleteValidator"
            >
              Tambah Customers
            </v-btn>
          </template>
          <v-card>
            <v-toolbar
              color="success"
              dark
            >{{ formTitle }}</v-toolbar>
            <v-card-text>
              <v-container>
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.customer_number"
                    >
                    {{ validation.customer_number[0] }}
                    </v-alert>                        
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.customer_name"
                    >
                    {{ validation.customer_name[0] }}
                    </v-alert>    
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.description"
                    >
                    {{ validation.description[0] }}
                    </v-alert>    
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.email"
                    >
                    {{ validation.email[0] }}
                    </v-alert>    
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.attribute1"
                    >
                    {{ validation.attribute1[0] }}
                    </v-alert>    
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.attribute2"
                    >
                    {{ validation.attribute2[0] }}
                    </v-alert>    
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.attribute3"
                    >
                    {{ validation.attribute3[0] }}
                    </v-alert>    
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.attribute4"
                    >
                    {{ validation.attribute4[0] }}
                    </v-alert> 
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.attribute5"
                    >
                    {{ validation.attribute5[0] }}
                    </v-alert>    
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.active_flag"
                    >
                    {{ validation.active_flag[0] }}
                    </v-alert>                  
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.customer_number"
                      label="Customer Number"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.customer_name"
                      label="Customer Name"
                    ></v-text-field>
                  </v-col>
                                    <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                                    <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.attribute1"
                      label="Attribute 1"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.attribute2"
                      label="Attribute 2"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.attribute3"
                      label="Attribute 3"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.attribute4"
                      label="Attribute 4"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.attribute5"
                      label="Attribute 5"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                  <p>Active Flag</p>
                        <v-radio-group
                        v-model="editedItem.active_flag"
                        row
                        >
                        <v-radio
                          label="Y"
                          value="Y"
                        ></v-radio>
                        <v-radio
                          label="N"
                          value="N"
                        ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Apakah anda ingin menghapus data ini?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Hapus</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-divider></v-divider>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template> -->
  </v-data-table>
    </v-container>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Customer Number', value: 'customer_number' },
        { text: 'Customer Name', value: 'customer_name' },
        { text: 'Description', value: 'description' },
        { text: 'Email', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {},
      userData:[],
      userUpdate:{},
      defaultItem:{},
      resetValidation:[],
      validation: []
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Tambah Customer' : 'Edit Customer'
      },
          ...mapGetters({
          user: 'user',
        })
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
        let uri = `http://localhost:8000/api/v1/customers`;
            axios.get(uri).then(response => {
                this.userData = response.data.data;
            });
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.userData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.userData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        // this.dialogDelete = true

        this.$swal.fire({
          title: 'Apakah anda ingin menghapus data ini?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Hapus'
        }).then((result) => {
          if (result.isConfirmed) {
          axios.delete(`http://localhost:8000/api/v1/deletecustomers/${this.editedItem.id}`)
              .then(() => {
                let uri = `http://localhost:8000/api/v1/customers`;
                    axios.get(uri).then(response => {
                        this.userData = response.data.data;
                    });
              this.$swal.fire(
              'Sukses!',
              'Data Berhasil dihapus',
              'success'
            )
            this.closeDelete()
              }).catch((error) => {
              alert(error);
          });        
          }
        })
      },

      deleteItemConfirm () {
        axios.delete(`http://localhost:8000/api/v1/deletecustomers/${this.editedItem.id}`)
            .then(() => {
              let uri = `http://localhost:8000/api/v1/customers`;
                  axios.get(uri).then(response => {
                      this.userData = response.data.data;
                  });
            }).catch((error) => {
            alert(error);
        });        
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1){
          this.$swal.fire({
            title: 'Apakah anda ingin mengupdate data ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update'
          }).then((result) => {
            if (result.isConfirmed) {
              let uri = `http://localhost:8000/api/v1/updatecustomers/${this.editedItem.id}`;
              axios.post(uri, this.editedItem)
                  .then(() => {
                      let uri = `http://localhost:8000/api/v1/customers`;
                          axios.get(uri).then(response => {
                              this.userData = response.data.data;
                      });
                      this.$swal.fire(
                        'Sukses!',
                        'Data berhasil di update!',
                        'success'
                      )
                      this.close();
                  }).catch(error => {
                  this.validation = error.response.data.data;
              });
            }
          })
        }else{
          this.$swal.fire({
            title: 'Apakah anda ingin menambahkan data ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Tambah'
          }).then((result) => {
            if (result.isConfirmed) {
              let uri = `http://localhost:8000/api/v1/createcustomers/${this.user.id}`;
              axios.post(uri, this.editedItem)
                  .then(() => {
                      let uri = `http://localhost:8000/api/v1/customers`;
                          axios.get(uri).then(response => {
                              this.userData = response.data.data;
                      });
                      this.$swal.fire(
                        'Sukses!',
                        'Data berhasil ditambah',
                        'success'
                      )
                      this.close();
                  }).catch(error => {
                  this.validation = error.response.data.data;
                  console.log(this.validation)
              });
            }
          })
        }
      },
      deleteValidator(){
        this.validation = [];
        this.validation.splice(0);
      }
    },
    
  }
</script>