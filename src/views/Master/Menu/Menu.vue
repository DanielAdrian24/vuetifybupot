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
        <v-toolbar-title>Menu</v-toolbar-title>
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
            >
              Tambah Menu
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
                      v-if="validation.menu_name"
                    >
                    {{ validation.menu_name[0] }}
                    </v-alert>                        
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.menu_desc"
                    >
                    {{ validation.menu_desc[0] }}
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
                      v-if="validation.seq"
                    >
                    {{ validation.seq[0] }}
                    </v-alert>    
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.active_flag"
                    >
                    {{ validation.active_flag[0] }}
                    </v-alert>    
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.is_detail"
                    >
                    {{ validation.is_detail[0] }}
                    </v-alert>    
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.attribute3"
                    >
                    {{ validation.attribute3[0] }}
                    </v-alert>        
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.menu_name"
                      label="Menu Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.menu_desc"
                      label="Menu Desc"
                    ></v-text-field>
                  </v-col>
                                    <v-col
                    cols="12"
                  >
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
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.seq"
                      label="Seq"
                      type="number"
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
                                    <v-col
                    cols="12"
                  >
                  <p>Is Detail</p>
                        <v-radio-group
                        v-model="editedItem.is_detail"
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
    <template v-slot:[`item.created_at`]="{ item }">
      {{formatDate(item.created_at)}}
    </template>
    <template v-slot:[`item.updated_at`]="{ item }">
      {{formatDate(item.updated_at)}}
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
import {mapGetters} from 'vuex';
import moment from 'moment';
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Menu Name', value: 'menu_name' },
        { text: 'Menu Desc', value: 'menu_desc' },
        { text: 'Role Id', value: 'role_id' },
        { text: 'Seq', value: 'seq' },
        { text: 'Active_flag', value: 'active_flag' },
        { text: 'Is Detail', value: 'is_detail' },
        { text: 'Created By', value: 'created_by' },
        { text: 'Last Update By', value: 'last_update_by' },
        { text: 'Created At', value: 'created_at' },
        { text: 'Updated At', value: 'updated_at' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {},
      userData:[],
      userUpdate:{},
      defaultItem:{},
      resetValidation:[],
      role_id:[],
      validation: []
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Tambah Menu' : 'Edit Menu'
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
        let uri = `http://localhost:8000/api/v1/menus`;
            axios.get(uri).then(response => {
                this.userData = response.data.data;
        });
        let uri3 = `http://localhost:8000/api/v1/roles`;
            axios.get(uri3).then((response) => {
                this.role_id = response.data.data;
                console.log(this.role_id)
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
        axios.delete(`http://localhost:8000/api/v1/deletemenus/${this.editedItem.menu_id}`)
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
                let uri = `http://localhost:8000/api/v1/updatemenus/${this.editedItem.menu_id}`;
                axios.post(uri, this.editedItem)
                    .then(() => {
                        // window.location.reload();
                        let uri = `http://localhost:8000/api/v1/menus`;
                            axios.get(uri).then(response => {
                                this.userData = response.data.data;
                        });                        
                        this.close();
                    }).catch(error => {
                    this.validation = error.response.data.data;
                });
          }else{
                let uri = `http://localhost:8000/api/v1/createmenus/${this.user.id}`;
                axios.post(uri, this.editedItem)
                    .then(() => {
                        let uri = `http://localhost:8000/api/v1/menus`;
                            axios.get(uri).then(response => {
                                this.userData = response.data.data;
                        });
                        this.close();
                    }).catch(error => {
                    this.validation = error.response.data.data;
                });
          }
      },
      formatDate(value){
        return moment(value).format("DD-MM-YYYY");
      }
    },
    
  }
</script>