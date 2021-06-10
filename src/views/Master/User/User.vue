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
        <v-toolbar-title>User</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="success"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Tambah User
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
                      v-if="validation.username"
                    >
                    {{ validation.username[0] }}
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
                      v-if="validation.password"
                    >
                    {{ validation.password[0] }}
                    </v-alert>    
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.customer_id"
                    >
                    {{ validation.customer_id[0] }}
                    </v-alert>
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.role_id"
                    >
                    {{ validation.role_id[0] }}
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
                      v-model="editedItem.username"
                      label="Username"
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
                      v-model="editedItem.password"
                      type="password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                                    <v-col
                    cols="12"
                  >
                    <!-- <v-text-field
                      v-model="editedItem.customer_id"
                      label="Customer ID"
                    ></v-text-field> -->
          <v-autocomplete
            ref="customer_id"
            v-model="editedItem.customer_id"
            :items="cust_id"
            item-text="customer_name"
            item-value="id"
            label="Customer ID "
            placeholder="Select..."
            required
          ></v-autocomplete>
                  </v-col>
                                    <v-col
                    cols="12"
                  >
                    <!-- <v-text-field
                      v-model="editedItem.customer_id"
                      label="Customer ID"
                    ></v-text-field> -->
          <v-autocomplete
            ref="role_id"
            v-model="editedItem.role_id"
            :items="role_id"
            item-text="role_name"
            item-value="id"
            label="Role ID "
            placeholder="Select..."
            required
          ></v-autocomplete>
                  </v-col>
                  <v-col
                  cols="12">
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
        {
          text: 'Username',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        { text: 'Customer ID', value: 'customer_id' },
        { text: 'Email', value: 'email' },
        { text: 'Email Verified At', value: 'email_verified_at' },
        { text: 'Active Flag', value: 'active_flag'},
        { text: 'Role Id', value: 'role_id'},
        { text: 'Created At', value: 'created_at'},
        { text: 'Updated At', value: 'updated_at'},
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {},
      userData:[],
      cust_id:[],
      role_id:[],
      userUpdate:{},
      validation: []
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Tambah User' : 'Edit User'
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
      let uri = `http://localhost:8000/api/v1/user`;
            axios.get(uri).then(response => {
                this.userData = response.data.data;
                // console.log(this.userData);
            });
      let uri2 = `http://localhost:8000/api/v1/customers`;
            axios.get(uri2).then((response) => {
                this.cust_id = response.data.data;
                console.log(this.cust_id);
            });
      let uri3 = `http://localhost:8000/api/v1/roles`;
            axios.get(uri3).then((response) => {
                this.role_id = response.data.data;
                console.log(this.role_id);
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
        axios.delete(`http://localhost:8000/api/v1/getid/${this.editedItem.id}`)
            .then(() => {
                window.location.reload();
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
            let uri = `http://localhost:8000/api/v1/updateuser/${this.editedItem.id}`;
            axios.post(uri, this.editedItem)
                      .then(() => {
                          // this.$router.push({name: 'User'});
                          window.location.reload();
                      }).catch(error => {
                      this.validation = error.response.data.data;
            });         
          }else{
            let uri = `http://localhost:8000/api/v1/createuser/${this.user.id}`;
            axios.post(uri, this.editedItem)
                .then(() => {
                    window.location.reload();
                }).catch(error => {
                this.validation = error.response.data.data;
            });
          }
        this.close();
      },
    },
    
  }
</script>