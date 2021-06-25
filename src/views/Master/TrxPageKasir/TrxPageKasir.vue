<template>
<v-container class="my-5">
  <v-card>
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
        <v-text-field
          v-model="cariData.customer_id"
          label="Customer Id"
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
    </v-card-title>
    <v-divider></v-divider>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="inquiryBupot"
    item-key="bupot_number"
    class="elevation-1"
    
  >
    <template v-slot:item.bupot_id="{ value }">
        <router-link :to="{name: 'DetailBupot', params: { id: value }}">
        <a >
          {{ value }}
        </a>                 
        </router-link>
    </template>
    <template v-slot:[`item.dpp_amount`]="{ item }">
      {{formatCurrency(item.dpp_amount)}}
    </template>
    <template v-slot:[`item.pph_amount`]="{ item }">
      {{formatCurrency(item.dpp_amount)}}
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
        cariData:[],
        search:'',
        dialog: false,
        singleSelect: false,
        selected: [],
        selected2: [],
        inquiryBupot:[],
        selectedIndex:-1,
        selectedItem:{},
        headers: [
          { text: 'Bupot Id', value: 'bupot_id' },
          { text: 'Status', value: 'status' },
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
        let uri = `http://localhost:8000/api/trxpagekasir`;
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
            axios({
                method: 'post',
                url: 'http://localhost:8000/api/searchdatakasir',
                data: {
                  nomor_bupot: this.cariData.nomor_bupot,
                  tanggal_awal: this.cariData.tanggal_awal,
                  tanggal_akhir: this.cariData.tanggal_akhir,
                  customer_id: this.cariData.customer_id
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
        formatCurrency(value){
            var formatter = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'IDR',
            });

            return formatter.format(value); /* $2,500.00 */          
        }      
    },
    components: {
      DatePicker
    }
  }
</script>