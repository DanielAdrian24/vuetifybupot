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
        <v-toolbar-title>Role</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Tambah Role
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
                      dismissible
                      text
                      type="warning"
                      v-if="validation.role_name"
                    >
                    {{ validation.role_name[0] }}
                    </v-alert>                        
                    <v-alert
                      dense
                      dismissible
                      text
                      type="warning"
                      v-if="validation.role_desc"
                    >
                    {{ validation.role_desc[0] }}
                    </v-alert>    
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.role_name"
                      label="Role Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.role_desc"
                      label="Role Desc"
                    ></v-text-field>
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
        { text: 'Role Name', value: 'role_name' },
        { text: 'Role Desc', value: 'role_desc' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {},
      userData:[],
      userUpdate:{},
      validation: []
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Tambah Role' : 'Edit Role'
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
      let uri = `http://localhost:8000/api/v1/roles`;
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
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        axios.delete(`http://localhost:8000/api/v1/deleterole/${this.editedItem.id}`)
            .then(() => {
            let uri = `http://localhost:8000/api/v1/roles`;
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
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedIndex = -1
        })
      },

      save () {
          if (this.editedIndex > -1){
              console.log(this.editedItem);
                let uri = `http://localhost:8000/api/v1/updaterole/${this.editedItem.id}`;
                axios.post(uri, this.editedItem)
                    .then(() => {
                        let uri = `http://localhost:8000/api/v1/roles`;
                              axios.get(uri).then(response => {
                                  this.userData = response.data.data;
                              });
                        this.close();
                    }).catch(error => {
                    this.validation = error.response.data.data;
                    console.log(this.validation);
                });     
          }else{
            let uri = `http://localhost:8000/api/v1/createroles`;
            axios.post(uri, this.editedItem)
                .then(() => {
                    let uri = `http://localhost:8000/api/v1/roles`;
                          axios.get(uri).then(response => {
                              this.userData = response.data.data;
                          });
                    this.close();
                }).catch(error => {
                this.validation = error.response.data.data;
                console.log(this.validation)
            });
          }
      },
    },
    
  }
</script>