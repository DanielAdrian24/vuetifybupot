<template>
<v-container class="my-5">
  <v-card>
    <v-dialog v-model="dialogDelete">
    <v-card>

    <v-toolbar
        flat
      >
        <v-toolbar-title>Detail Bukti Potong PPh</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <button>coba</button> -->
        <v-btn
          color="success"
          dark
          class="mb-2 mr-1"
          v-if="dokumenBupot.status != 'S'"
          @click="updateSubmit(dokumenBupot.bupot_id)"
        >
          Submit
        </v-btn>
        <v-btn
          color="success"
          dark
          class="mb-2 mr-1"
          v-if="dokumenBupot.status != 'S'"
          @click="updateCancel(dokumenBupot.bupot_id)"
        >
          Batal
        </v-btn>  
          <v-btn
          color="success"
          dark
          class="mb-2"
          @click="closeDialog"
        >
          Kembali
        </v-btn>          
    </v-toolbar>
    <v-divider></v-divider>
    <v-row no-gutters class="px-5">
      <v-col
        :cols="4"
      >
        <v-card ref="form" class="my-5">
        <v-card-text>
          <v-toolbar flat>
              <v-toolbar-title>Dokumen Bukti Potong</v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-text-field
            v-model="dokumenBupot.bupot_number"
            label="Nomor Dok. BuktiPotong"
            filled
            readonly
            class="mt-5"
          ></v-text-field>
          <v-text-field
            v-model="dokumenBupot.bupot_date"
            label="Tanggal Bukti Potong"
            filled
            readonly
          ></v-text-field>
          <v-text-field
            v-model="dokumenBupot.dpp_amount"
            label="Jumlah Penghasilan Bruto"
            filled
            readonly
          ></v-text-field>
          <v-text-field
            v-model="dokumenBupot.percentage"
            label="tarif"
            filled
            readonly
          ></v-text-field>
          <v-text-field
            v-model="dokumenBupot.pph_amount"
            label="PPh"
            filled
            readonly
          ></v-text-field>
        </v-card-text>
      </v-card>
      </v-col>
      <v-col
        :cols="8"
      >
        <v-card class="my-5 mx-2">
            <v-card-text>
            <v-toolbar flat>
                <v-toolbar-title>Dokumen Kwitansi</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>        
            <v-data-table
              :headers="headersKwitansi"
              :items="dokumenKwt"
              sort-by="calories"
              class="elevation-1 my-5"
            >
            </v-data-table>         
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    </v-card>
    </v-dialog>
    <v-card-title>
      Inquiry Bukti Potong 
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
        <v-text-field v-model="cariData.tanggal_awal" single-line label="Dari Tanggal">
          <template v-slot:append-outer>
            <date-picker v-model="cariData.tanggal_awal"/>
          </template>
        </v-text-field>                   
        </v-col>
        <v-col
        :cols="4">
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
          class="mb-2"
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
    </v-card-title>
  <v-divider></v-divider>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="inquiryBupot"
    item-key="bupot_number"
    class="elevation-1"
    
  >
    <template v-slot:[`item.bupot_number`]="{ item }">
        <!-- <router-link :to="{name: 'DetailBupot', params: { id: value }}"> -->
        <a @click="showDialog(item)">
          {{ item.bupot_number }}
        </a>                 
        <!-- </router-link> -->
    </template>
    <template v-slot:[`item.status`]="{ item }">
      {{formatValidasi(item.status)}}
    </template>
    <template v-slot:[`item.dpp_amount`]="{ item }">
      {{formatCurrency(item.dpp_amount)}}
    </template>
    <template v-slot:[`item.pph_amount`]="{ item }">
      {{formatCurrency(item.dpp_amount)}}
    </template>
  </v-data-table>
  </v-card>
</v-container>
</template>

<script>
import DatePicker from "../../../components/DatePicker.vue";
import axios from 'axios'
import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        dokumenBupot:{},
        dialogDelete:false,
        cariData:[],
        search:'',
        dialog: false,
        singleSelect: false,
        selected: [],
        selected2: [],
        inquiryBupot:[],
        selectedIndex:0,
        selectedItem:{},
        dokumenKwt:[],
        headers: [
          { text: 'Status', value: 'status' },
          { text: 'Nomor Bukti Potong', value: 'bupot_number' },
          { text: 'Tanggal Bukti Potong', value: 'bupot_date' },
          { text: 'DPP Bukti Potong', value: 'dpp_amount' },
          { text: 'Tarif Bukti Potong', value: 'percentage' },
          { text: 'PPh', value: 'pph_amount' },
          { text: 'Jumlah Kwitansi', value: 'JumlahKwitansi' },
        ],
        headersKwitansi: [
          { text: 'Nomor Kwitansi', value: 'kwt_number' },
          { text: 'Tanggal Kwitansi', value: 'kwt_date' },
          { text: 'Jenis Kwitansi', value: 'kwt_type' },
          { text: 'DPP Kwitansi', value: 'dpp_amount' },
          { text: 'PPN Kwitansi', value: 'ppn_amount' },
          { text: 'PPh Kwitansi', value: 'pph_amount' },
        ],
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
        let uri = `http://localhost:8000/api/trxpage/${this.user.customer_id}`;
            axios.get(uri).then(response => {
                this.inquiryBupot = response.data.data;
            });
    },
    methods:{
        searchData(){
            axios({
                method: 'post',
                url: 'http://localhost:8000/api/searchdata',
                data: {
                  nomor_bupot: this.cariData.nomor_bupot,
                  tanggal_awal: this.cariData.tanggal_awal,
                  tanggal_akhir: this.cariData.tanggal_akhir
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
            let uri = `http://localhost:8000/api/trxpage/${this.user.customer_id}`;
                axios.get(uri).then(response => {
                    this.inquiryBupot = response.data.data;
                });          
        },
        formatCurrency(value){
            var formatter = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'IDR',
            });

            return formatter.format(value); /* $2,500.00 */          
        },
        formatValidasi(value){
            if (value == "D"){
              return "Draft"
            } else if (value == "S"){
              return "Submit"
            } else if (value == "V"){
              return "Valid"
            } else if (value == "R"){
              return "Reject"
            } else if (value == "C"){
              return "Cancel"
            }
        },
        showDialog(item){
        let uri = `http://localhost:8000/api/dtltrxpage/${item.bupot_id}`;
            axios.get(uri).then(response => {
                this.dokumenBupot = response.data.data;
            });        
        let uri2 = `http://localhost:8000/api/dtlKwtpage/${item.bupot_id}/${this.user.customer_id}`;
            axios.get(uri2).then(response => {
                this.dokumenKwt = response.data.data;
            });         
          this.dialogDelete = true
        },
        closeDialog(){
          this.dialogDelete = false
          this.dokumenBupot = {}
          this.dokumenKwt = []
        },
        updateSubmit (id) {
          let uri = `http://localhost:8000/api/updatestatusbupotsubmit/${id}`;
              axios.post(uri).then(() => {
                let uri = `http://localhost:8000/api/trxpage/${this.user.customer_id}`;
                    axios.get(uri).then(response => {
                        this.inquiryBupot = response.data.data;
                });
              });
          this.dialogDelete = false      
        },     
        updateCancel (id){
          let uri = `http://localhost:8000/api/updatestatusbupotcancel/${id}`;
              axios.post(uri).then(() => {
                let uri = `http://localhost:8000/api/trxpage/${this.user.customer_id}`;
                    axios.get(uri).then(response => {
                        this.inquiryBupot = response.data.data;
                });
              }); 
          this.dialogDelete = false 
        }                   
    },
    components: {
      DatePicker
    }
  }
</script>