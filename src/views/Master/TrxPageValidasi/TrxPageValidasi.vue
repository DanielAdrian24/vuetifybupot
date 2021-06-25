<template>
<v-container class="my-5">
  <v-card>
    <v-card-title>
      Inquiry Bukti Potong Validator
      <br>
      <v-row class="ml-1">
        <v-col
        :cols="4">
        <v-text-field
          v-model="cariData.nomor_bupot"
          label="Nomor Bukti Potong"
        ></v-text-field>
        </v-col>
                <v-col
        :cols="4">
        <v-text-field
          v-model="cariData.customer_name"
          label="Nama Customer"
        ></v-text-field>
        </v-col>
        <v-col
        :cols="2">
        <v-text-field v-model="cariData.tanggal_awal" single-line label="Dari Tanggal">
          <template v-slot:append-outer>
            <date-picker v-model="cariData.tanggal_awal"/>
          </template>
        </v-text-field>                   
        </v-col>
        <v-col
        :cols="2">
        <v-text-field v-model="cariData.tanggal_akhir" single-line label=" Sampai Tanggal">
          <template v-slot:append-outer>
            <date-picker v-model="cariData.tanggal_akhir"/>
          </template>
        </v-text-field>     
        </v-col>
      </v-row>
        <v-btn
          color="success"
          dark
          class="mb-2 ml-2"
          @click="searchData"
        >
          Cari Data
        </v-btn>        
        <v-btn
          color="success"
          dark
          class="mb-2 ml-2"
          @click="resetData"
        >
          Reset Data
        </v-btn>  
        <v-btn
          color="success"
          dark
          class="mb-2 ml-2"
          @click="validasi"
        >
          Validasi
        </v-btn>    
        <v-btn
          color="success"
          dark
          class="mb-2 ml-2"
          @click="tolak"
        >
          Tolak
        </v-btn>         
    </v-card-title>
    <v-divider></v-divider>
        <v-dialog
          v-model="dialog"
          max-width="600px"
          scrollable
        >
          <v-card>
            <v-toolbar
              color="success"
              dark
            >Tolakan Bupot</v-toolbar>

                  <!-- <p>Alasan Penolakan Bukti Potong</p>
                  <p>No.Bupot {{this.tolakBupot[0].bupot_number}}}</p> -->
                  <v-card-text class="mt-2 py-0">Alasan Penolakan Bukti Potong dengan</v-card-text>
                  <v-card-text class="my-0 py-0">No. Bupot: {{this.tolakBupot[0].bupot_number}}</v-card-text>
                  <v-card-text class="my-0 py-0">Customer: [{{this.tolakBupot[0].id}}] [{{this.tolakBupot[0].customer_name}}]</v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">  
                        <v-textarea
                          solo
                          name="input-7-4"
                          label="Alasan Penolakan"
                          hint="Hint text"
                          v-model="alasanTolak.alasan_tolak"
                        ></v-textarea>               
                      </v-col>
                    </v-row>               
                  </v-container>
                  <!-- <v-col
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
                  </v-col> -->

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialogClose"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="submitTolak"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    <v-divider></v-divider>   
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="inquiryBupot"
    item-key="bupot_number"
    class="elevation-1"
    show-select
  >
    <template v-slot:item.bupot_id="{ value }">
        <router-link :to="{name: 'DetailBupotValidator', params: { id: value }}">
        <a >
          {{ value }}
        </a>                 
        </router-link>
    </template>
  </v-data-table>
  </v-card>
  <!-- <h5>Selected: {{selected}}</h5>
  <h5>Selected: {{selected2}}</h5> -->

</v-container>
</template>

<script>
import DatePicker from "../../../components/DatePicker.vue";
import axios from 'axios'
import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        idTolak:[],
        alasanTolak:{},
        tolakBupot:[0],
        editedItem:[],
        idValidasi:[],
        data:[],
        data2:[],
        cariData:[],
        search:'',
        dialog: false,
        singleSelect: false,
        selected: [],
        inquiryBupot:[],
        selectedIndex:-1,
        selectedItem:{},
        headers: [
          { text: 'Bupot Id', value: 'bupot_id' },
          { text: 'Kode Customer', value: 'id' },
          { text: 'Nama  Customer', value: 'customer_name' },
          { text: 'Nomor Bukti Potong', value: 'bupot_number' },
          { text: 'Tanggal Bukti Potong', value: 'bupot_date' },
          { text: 'DPP Bukti Potong', value: 'dpp_amount' },
          { text: 'Tarif Bukti Potong', value: 'percentage' },
          { text: 'PPh', value: 'pph_amount' },
          { text: 'Jumlah Kwitansi', value: 'JumlahKwitansi' },
        ]
      }
    },
    computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'Tambah Role' : 'Edit Role'
        },
        ...mapGetters({
          user: 'user',
        })
    },
    created () {
        let uri = `http://localhost:8000/api/trxpagevalidator`;
            axios.get(uri).then(response => {
                this.inquiryBupot = response.data.data;
            });
        // console.log(this.user.customer_id);
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:8000/api/trxpage',
        //     data: {
        //       user_id: this.user.id,
        //       role_id: this.user.role_id,
        //       customer_id :this.user.customer_id
        //     },
        //   })
        //    .then(response => {
        //     this.inquiryBupot = response.data.data;
        //     console.log(this.respoonse.data.data);
        //     })
        //     .catch(error => {
        //       console.log(error.response)
        //     })  
    },
    methods:{
        showBupotid(a){
            this.selectedIndex = this.inquiryBupot.indexOf(a);
            this.selectedItem = Object.assign({}, a);
            // alert(a);
        },
        searchData(){
            alert(this.cariData.customer_name)
            axios({
                method: 'post',
                url: 'http://localhost:8000/api/searchdatavalidator',
                data: {
                  nomor_bupot: this.cariData.nomor_bupot,
                  tanggal_awal: this.cariData.tanggal_awal,
                  tanggal_akhir: this.cariData.tanggal_akhir,
                  customer_name: this.cariData.customer_name
                },
              })
               .then(response => {
                 this.inquiryBupot = response.data.data;
                  // window.location.reload();
                })
                .catch(error => {
                  console.log(error.response)

                })          
        },
        resetData(){
            let uri = `http://localhost:8000/api/trxpagekasir`;
                axios.get(uri).then(response => {
                    this.inquiryBupot = response.data.data;
                });       
        },
        validasi(){
            this.idValidasi.splice(0)
            this.data=this.selected
            this.data.forEach(item => {
                this.idValidasi.push(item.bupot_id)
            })
            this.validasiSubmit();            
        },
        validasiSubmit(){
            let uri = `http://localhost:8000/api/validasidata`;
            axios.post(uri, this.idValidasi)
                .then(() => {
                    window.location.reload();
                });            
        },
        tolak(){
          this.tolakBupot=this.selected;
          this.dialog=true;
        },
        submitTolak(){
          this.idTolak.splice(0)
          this.data2=this.selected
          this.data2.forEach(item => {
              this.idTolak.push(item.bupot_id)
          }) 
          this.validasiTolak();         
        },
        validasiTolak(){
          axios({
              method: 'post',
              url: 'http://localhost:8000/api/tolakdata',
              data: {
                id_tolak: this.idTolak,
                reason:this.alasanTolak.alasan_tolak
              },
            })
             .then(() => {
                window.location.reload();
              })
              .catch(error => {
                console.log(error.response)
              }) 
          this.idTolak.splice(0)         
        },
        dialogClose(){
          this.dialog=false;
        }       
    },
    components: {
      DatePicker
    }
  }
</script>