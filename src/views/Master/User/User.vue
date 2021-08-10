<template>
    <v-container class="my-5">
        <h5>{{editedItem2}}</h5>
      <v-card class="my-5">
        <v-data-table
          :headers="headers"
          :items="userData"
          sort-by="calories"
          class="elevation-1"
          @click:row="getDataCustomerPerUser"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>User</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="resetform"
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
                            v-if="validation.role_id"
                          >
                          {{ validation.role_id[0] }}
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
                          ref="role_id"
                          v-model="editedItem.role_id"
                          :items="role_id"
                          item-text="role_name"
                          item-value="id"
                          label="Role"
                          placeholder="Select..."
                          required
                        ></v-autocomplete>
                        </v-col>
                        <v-col
                          cols="12"
                        >
                        <v-autocomplete
                          ref="role_id"
                          v-model="editedItem.customer_id"
                          :items="customerData"
                          item-text="customer_name"
                          item-value="id"
                          label="Customer"
                          placeholder="Select..."
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
        <v-data-table
          :headers="headers2"
          :items="customerData2"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Customer</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog3"
                max-width="500px"
              >
                <v-card>
                  <v-toolbar
                    color="success"
                    dark
                  >Edit Flag</v-toolbar>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                        cols="12">
                        <p>Active Flag</p>
                              <v-radio-group
                              v-model="editedItem2.active_flag"
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
                      @click="close3"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save3"
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
              @click="editItem2(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem2(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
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
          <template v-slot:[`item.email_verified_at`]="{ item }">
            {{formatDate(item.email_verified_at)}}
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
      </v-card>

      <v-card class="my-5">
      </v-card>      
    </v-container>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
import moment from 'moment';
  export default {
    data: () => ({
      getUserid:0,
      simpan:[],
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Username',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        { text: 'Email', value: 'email' },
        { text: 'Email Verified At', value: 'email_verified_at' },
        { text: 'Active Flag', value: 'active_flag'},
        { text: 'Role', value: 'role_name'},
        { text: 'Created At', value: 'created_at'},
        { text: 'Updated At', value: 'updated_at'},
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      headers2: [
        {
          text: 'Customer Number',
          value: 'customer_number',
        },
        { text: 'Customer Name', value: 'customer_name' },
        { text: 'Active Flag', value: 'active_flag'},
        { text: 'Actions', value: 'actions', sortable: false }
      ],      
      editedIndex: -1,
      editedItem: {},
      editedItem2: {},
      userData:[],
      customerData:[],
      customerData2:[],
      cariCustomer:[],
      cust_id:[],
      cust_idInsert:[],
      cust_idUpdate:[],
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
      // let uri2 = `http://localhost:8000/api/v1/getcustomersuser1`;
      //       axios.get(uri2).then(response => {
      //           this.cust_idInsert = response.data.data;
      //           // console.log(this.userData);
      //       });        
      let uri3 = `http://localhost:8000/api/v1/roles`;
            axios.get(uri3).then((response) => {
                this.role_id = response.data.data;
                // console.log(this.role_id);
            });
    },

    methods: {
      editItem (item) {
      // axios({
      //     method: 'post',
      //     url: 'http://localhost:8000/api/v1/getcustomersuser',
      //     data: {
      //       cust_id: item.customer_id
      //     },
      //   })
      //    .then(response => {
      //       this.cust_idUpdate = response.data.data;
      //       this.cust_id = this.cust_idUpdate;
      //     })
      //     .catch(error => {
      //       console.log(error.response)
      //     })  
        this.resetValidation2()
        this.getAvailableCustomer()
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
              axios.delete(`http://localhost:8000/api/v1/getid/${this.editedItem.id}`)
                  .then(() => {
                    let uri = `http://localhost:8000/api/v1/user`;
                          axios.get(uri).then(response => {
                              this.userData = response.data.data;
                              // console.log(this.userData);
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
        axios.delete(`http://localhost:8000/api/v1/getid/${this.editedItem.id}`)
            .then(() => {
              let uri = `http://localhost:8000/api/v1/user`;
                    axios.get(uri).then(response => {
                        this.userData = response.data.data;
                        // console.log(this.userData);
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
            this.$swal.fire({
              title: 'Apakah anda ingin mengupdate data ini?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Update'
            }).then((result) => {
              if (result.isConfirmed) {
                let uri = `http://localhost:8000/api/v1/updateuser/${this.editedItem.id}`;
                axios.post(uri, this.editedItem)
                          .then(() => {
                              let uri = `http://localhost:8000/api/v1/user`;
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
                              this.$swal.fire(
                                'Gagal!',
                                'Data gagal di update!',
                                'warning'
                              )             
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
                let uri = `http://localhost:8000/api/v1/createuser/${this.user.id}`;
                axios.post(uri, this.editedItem)
                    .then(() => {
                            let uri = `http://localhost:8000/api/v1/user`;
                                  axios.get(uri).then(response => {
                                      this.userData = response.data.data;
                                      // console.log(this.userData);
                                  });
                            this.$swal.fire(
                              'Sukses!',
                              'Data berhasil di simpan!',
                              'success'
                            )
                            this.close();                                
                    }).catch(error => {
                            this.validation = error.response.data.data;
                            this.$swal.fire(
                              'Gagal!',
                              'Data gagal di simpan!',
                              'warning'
                            )      
                });
              }
            })
          }
      },
      formatDate(value){
        return moment(value).format("DD-MM-YYYY");
      },
      // getItemText(value){
      //   return `${value.customer_number} - ${value.customer_name}`;
      // },
      resetform(){
        this.resetValidation2();
        this.getAvailableCustomer();
        this.customerData2=[];
        this.editedItem={};
        this.cust_id = this.cust_idInsert;
      },
      resetValidation2(){
        this.validation = [];
        this.validation.splice(0);
      },
      getAvailableCustomer(){
        axios({
            method: 'get',
            url: '/v1/getAvailableCustomer',
          })
           .then(response => {
              this.customerData = response.data.data;
            })
            .catch(error => {
              console.log(error.response)
            }) 
      },
      close2(){
        this.dialog2=false
      },
      close3(){
        this.dialog3=false
      },      
      getDataCustomerPerUser(row){
        this.getUserid=row.id
            axios({
                method: 'post',
                url: '/v1/getCustomerperuser',
                data: {
                  user_id: this.getUserid,
                },
              })
               .then(response => {
                 this.customerData2 = response.data.data;
                  // window.location.reload();
                })
                .catch(error => {
                  console.log(error.response)
                })    
      },
      saveCustomer(){
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
                      url: 'insertsysmapcustomer',
                      data: {
                        user_id: this.getUserid,
                        dataCustomer:this.simpan
                      },
                    })
                     .then(() => {
                      this.$swal.fire(
                        'Sukses!',
                        'Data berhasil di simpan!',
                        'success'
                      )
                        // this.$router.push({name: 'TrxPage'});
                        this.dialog2=false;
                        axios({
                            method: 'post',
                            url: '/v1/getCustomerperuser',
                            data: {
                              user_id: this.getUserid,
                            },
                          })
                           .then(response => {
                             this.customerData2 = response.data.data;
                              // window.location.reload();
                            })
                            .catch(error => {
                              console.log(error.response)
                            })
                            this.simpan=[];   
                      })
                      .catch(error => {
                        console.log(error.response)
                      }) 
                  }
                })
      },
      editItem2 (item) {  
        this.editedIndex = this.customerData.indexOf(item)
        this.editedItem2 = Object.assign({}, item)
        this.dialog3 = true
      },
      deleteItem2 (item) {
        this.editedIndex = this.customerData.indexOf(item)
        this.editedItem2 = Object.assign({}, item)
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
                  url: '/deletesysmapcustomer',
                  data: {
                    id: this.editedItem2.id,
                  },
                })
                 .then(response => {
                    this.$swal.fire(
                        'Sukses!',
                        'Data berhasil di simpan!',
                        'success'
                      )
                    this.dialog2=false;
                    axios({
                        method: 'post',
                        url: '/v1/getCustomerperuser',
                        data: {
                          user_id: this.getUserid,
                        },
                      })
                      .then(response => {
                        this.customerData2 = response.data.data;
                        this.getAvailableCustomer();                                       
                         // window.location.reload();
                       })
                       .catch(error => {
                         console.log(error.response)
                       })
                       this.simpan=[];   
                        this.customerData2 = response.data.data;
                         // window.location.reload();
                       })
                       .catch(error => {
                         console.log(error.response)
                       })
          }
        })
      },
      save3(){
                this.$swal.fire({
                  title: 'Apakah anda ingin mengupdate flag ini?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Tambah'
                }).then((result) => {
                  if (result.isConfirmed) {
                      axios({
                          method: 'post',
                          url: 'updateflagsysmapcustomer',
                          data: {
                            id: this.editedItem2.id,
                            flag: this.editedItem2.active_flag
                          },
                        })
                         .then(() => {
                          this.$swal.fire(
                            'Sukses!',
                            'Data berhasil di update!',
                            'success'
                          )
                            // this.$router.push({name: 'TrxPage'});
                          this.dialog3=false;
                          axios({
                              method: 'post',
                              url: '/v1/getCustomerperuser',
                              data: {
                                user_id: this.getUserid,
                              },
                            })
                             .then(response => {
                               this.customerData2 = response.data.data;
                                // window.location.reload();
                              })
                              .catch(error => {
                                console.log(error.response)
                              }) 
                            // window.location.reload();
                          })
                          .catch(error => {
                            console.log(error.response)
                          })     
                      .catch(error => {
                        console.log(error.response)
                      }) 
                  }
                })
   
      }
    },

    
  }
</script>