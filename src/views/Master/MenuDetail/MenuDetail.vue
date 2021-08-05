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
        <v-toolbar-title>Menu Detail</v-toolbar-title>
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
              @click="resetValidation2"
            >
              Tambah Menu Detail
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
                      v-if="validation.menu_detail_id"
                    >
                    {{ validation.menu_detail_id[0] }}
                    </v-alert>                        
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.menu_detail_name"
                    >
                    {{ validation.menu_detail_name[0] }}
                    </v-alert>    
                    <v-alert
                      dense
                      text
                      type="warning"
                      v-if="validation.menu_detail_desc"
                    >
                    {{ validation.menu_detail_desc[0] }}
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
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-autocomplete
                      ref="role_id"
                      v-model="editedItem.menu_id"
                      :items="menuId"
                      item-text="menu_name"
                      item-value="menu_id"
                      label="Menu "
                      placeholder="Select..."
                      required
                    ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.menu_detail_name"
                      label="Menu Detail Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.menu_detail_desc"
                      label="Menu Detail Desc"
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
                    <v-text-field
                      v-model="editedItem.seq"
                      label="Seq"
                      type="number"
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
        { text: 'Menu Detail Name', value: 'menu_detail_name' },
        { text: 'Menu Detail Desc', value: 'menu_detail_desc' },
        { text: 'Active_flag', value: 'active_flag' },
        { text: 'Seq', value: 'seq' },
        { text: 'Created By', value: 'created_by',width:110 },
        { text: 'Last Update By', value: 'last_update_by', width:140 },
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
      menuId:[],
      validation: []
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Tambah Menu Detail' : 'Edit Menu Detail'
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
        let uri = `http://localhost:8000/api/v1/menudetails`;
        axios.get(uri).then(response => {
            this.userData = response.data.data;
            console.log(this.userData)
        });
        let uri2 = `http://localhost:8000/api/v1/menus`;
        axios.get(uri2).then((response) => {
            this.menuId = response.data.data;
            console.log(this.menuId);
        });
    },

    methods: {
      editItem (item) {
        this.resetValidation2()
        this.editedIndex = this.userData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem);
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
            axios({
                method: 'delete',
                url: 'http://localhost:8000/api/v1/deletemenudetails',
                data: {
                  id:this.editedItem.menu_detail_id
                },
              })
               .then(() => {
                  let uri = `http://localhost:8000/api/v1/menudetails`;
                      axios.get(uri).then(response => {
                          this.userData = response.data.data;
                      });
                      this.$swal.fire(
                        'Sukses!',
                        'Data Berhasil dihapus',
                        'success'
                      )
                      this.closeDelete()
                })
                .catch(error => {
                  console.log(error.response)
                      this.$swal.fire(
                        'Gagal!',
                        'Data Gagal dihapus',
                        'warning'
                      )
                })             
          }
        })
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
            console.log(this.editedItem)
            this.$swal.fire({
              title: 'Apakah anda ingin mengupdate data ini?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Update'
            }).then((result) => {
              if (result.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'http://localhost:8000/api/v1/updatemenudetails',
                    data: {
                      dataMenudetail: this.editedItem,
                      role_id:this.user.role_id
                    }
                  })
                   .then(() => {
                      let uri = `http://localhost:8000/api/v1/menudetails`;
                          axios.get(uri).then(response => {
                              this.userData = response.data.data;
                          });
                          this.$swal.fire(
                            'Sukses!',
                            'Data berhasil di update!',
                            'success'
                          )
                          this.close();
                    })
                    .catch(error => {
                      this.validation = error.response.data.data;
                      this.$swal.fire(
                        'Gagal!',
                        'Data Gagal diupdate',
                        'warning'
                      )
                    })     
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
                axios({
                    method: 'post',
                    url: 'http://localhost:8000/api/v1/createmenudetails',
                    data: {
                      dataMenudetail: this.editedItem,
                      id: this.user.id
                    }
                  })
                   .then(() => {
                      let uri = `http://localhost:8000/api/v1/menudetails`;
                          axios.get(uri).then(response => {
                              this.userData = response.data.data;
                          });
                          this.$swal.fire(
                            'Sukses!',
                            'Data berhasil di simpan!',
                            'success'
                          )
                          this.close();
                    })
                    .catch(error => {
                      this.validation = error.response.data.data;
                      this.$swal.fire(
                        'Gagal!',
                        'Data Gagal disimpan',
                        'warning'
                      )
                    }) 
              }
            })
          }
      },
      formatDate(value){
        return moment(value).format("DD-MM-YYYY");
      },
      resetValidation2(){
        this.validation = [];
        this.validation.splice(0);
      }
    },
    
  }
</script>