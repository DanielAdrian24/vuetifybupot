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
          color="error"
          dark
          class="mb-2 mr-1"
          v-if="dokumenBupot.status != 'S'"
          @click="updateCancel(dokumenBupot.bupot_id)"
        >
          Cancel
        </v-btn>  
        <v-btn
          icon
          @click="closeDialog"
        >
          <v-icon>mdi-close</v-icon>
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
          <vuetify-money
            v-model="dokumenBupot.dpp_amount"
            label="Jumlah Penghasilan Bruto"
            v-bind:placeholder="placeholder"
            readonly
            disabled
            v-bind:outlined="outlined"
            v-bind:clearable="clearable"
            v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
            v-bind:options="options"
          />  
          <vuetify-money
            v-model="dokumenBupot.percentage"
            label="Tarif"
            v-bind:placeholder="placeholder"
            readonly
            disabled
            v-bind:outlined="outlined"
            v-bind:clearable="clearable"
            v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
            v-bind:options="options"
          />  
          <vuetify-money
            v-model="dokumenBupot.pph_amount"
            label="PPh"
            v-bind:placeholder="placeholder"
            readonly
            disabled
            v-bind:outlined="outlined"
            v-bind:clearable="clearable"
            v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
            v-bind:options="options"
          /> 
          <!-- <v-text-field
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
          ></v-text-field> -->
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
              <template v-slot:[`item.dpp_amount`]="{ item }">
                {{formatCurrency(item.dpp_amount)}}
              </template>
              <template v-slot:[`item.ppn_amount`]="{ item }">
                {{formatCurrency(item.ppn_amount)}}
              </template>
              <template v-slot:[`item.pph_amount`]="{ item }">
                {{formatCurrency(item.pph_amount)}}
              </template>
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
          color="error"
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
        <a @click="showPdf(item)" v-if="item.status === 'S'" class="font-weight-bold">
          {{ item.bupot_number }}
        </a>          
        <a @click="showDialog(item)" v-else-if="item.status === 'D'" class="font-weight-bold">
          {{ item.bupot_number }}
        </a>  
        <div v-else-if="item.status === 'R'" class="font-weight-bold">
          {{ item.bupot_number }}
        </div>
        <div v-else-if="item.status === 'C'" class="font-weight-bold">
          {{ item.bupot_number }}
        </div>                     
        <!-- </router-link> -->
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <div class="font-weight-bold">
        {{formatValidasi(item.status)}}
      </div>
    </template>
    <template v-slot:[`item.dpp_amount`]="{ item }">
      {{formatCurrency(item.dpp_amount)}}
    </template>
    <template v-slot:[`item.percentage`]="{ item }">
      {{formatCurrency(item.percentage)}}
    </template>
    <template v-slot:[`item.pph_amount`]="{ item }">
      {{formatCurrency(item.pph_amount)}}
    </template>
    <template v-slot:[`item.bupot_date`]="{ item }">
      {{formatDate(item.bupot_date)}}
    </template>
  </v-data-table>
  </v-card>
</v-container>
</template>

<script>
import DatePicker from "../../../components/DatePicker.vue";
import axios from 'axios'
import {mapGetters} from 'vuex'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import moment from 'moment'
  export default {
    data () {
      return {
        data:[],
        value2: "1234567.89",
        label: "Value",
        placeholder: " ",
        readonly: false,
        disabled: false,
        outlined: true,
        clearable: true,
        valueWhenIsEmpty: "0",
        options: {
          locale: "pt-BR",
          prefix: "IDR",
          suffix: "",
          length: 11,
          precision: 0
        },
        properties: {
          hint: "my hint"
          // You can add other v-text-field properties, here.
        },
        customer:[],
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
        dokumenKwtarray:[],
        dokumenKwtarray2:[],
        dokumenKwtarray3:[],
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
    mounted(){
      if (localStorage.getItem('reloaded')) {
          // The page was just reloaded. Clear the value from local storage
          // so that it will reload the next time this page is visited.
          localStorage.removeItem('reloaded');
      } else {
          // Set a flag so that we know not to reload the page twice.
          localStorage.setItem('reloaded', '1');
          location.reload();
      }
    },
    created () {
        if (this.user.role_id == 2){
          this.$router.push({ name: "TrxPageValidator" }).catch(() => {});
        }
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
                  tanggal_akhir: this.cariData.tanggal_akhir,
                  cust_id: this.user.customer_id
                },
              })
               .then(response => {
                 this.inquiryBupot = response.data.data;
                 console.log(this.inquiryBupot)
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
        formatCurrency2(value){
            var formatter = new Intl.NumberFormat('en-US', {
            });

            return formatter.format(value); /* $2,500.00 */          
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
            this.$swal.fire({
              title: 'Apakah anda yakin ingin submit data ini?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Submit'
            }).then((result) => {
              if (result.isConfirmed) {
                let uri = `http://localhost:8000/api/updatestatusbupotsubmit/${id}`;
                    axios.post(uri).then(() => {
                      let uri = `http://localhost:8000/api/trxpage/${this.user.customer_id}`;
                          axios.get(uri).then(response => {
                              this.inquiryBupot = response.data.data;
                      });
                      this.$swal.fire(
                        'Sukses!',
                        'Data berhasil di submit!',
                        'success'
                      )
                      this.dialogDelete = false    
                    }); 
              }
            }) 
        },     
        updateCancel (id){
            this.$swal.fire({
              title: 'Apakah anda yakin ingin cancel data ini?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Cancel',
              cancelButtonText: 'Batal'
            }).then((result) => {
              if (result.isConfirmed) {
                let uri = `http://localhost:8000/api/updatestatusbupotcancel/${id}`;
                    axios.post(uri).then(() => {
                      let uri = `http://localhost:8000/api/trxpage/${this.user.customer_id}`;
                          axios.get(uri).then(response => {
                              this.inquiryBupot = response.data.data;
                      });
                      this.$swal.fire(
                        'Sukses!',
                        'Data berhasil di cancel!',
                        'success'
                      )
                      this.dialogDelete = false   
                    });   
              }
            }) 
        },
        showPdf(item){
          this.dokumenKwtarray3.splice(0);
          var sum = 0;
          var sumb = 0;
          var sumc = 0;
          let uri = `http://localhost:8000/api/getcustnumberandname/${this.user.customer_id}`;
            axios.get(uri).then(response => {
              this.customer = response.data.data;
            }); 
          let uri2 = `http://localhost:8000/api/getkwtarray/${item.bupot_id}/${this.user.customer_id}`;
            axios.get(uri2).then(response => {
              this.dokumenKwtarray = response.data.data;
              try {
                this.dokumenKwtarray2=this.dokumenKwtarray.map(this.getKwtValue)
              }
              catch(err) {
                console.log(err);
              }
              this.data=this.dokumenKwtarray
              this.data.forEach(item => {
                this.dokumenKwtarray3.push({
                  kwt_id:item.kwt_id,
                  kwt_number:item.kwt_number,
                  kwt_date:this.formatDate(item.kwt_date),
                  kwt_type:item.kwt_type,
                  dpp_amount:this.formatCurrency2(item.dpp_amount),
                  ppn_amount:this.formatCurrency2(item.ppn_amount),
                  pph_amount:this.formatCurrency2(item.pph_amount)
                })
              })
              this.dokumenKwtarray.forEach(item => {
                sum = sum + parseInt(item.dpp_amount);
              })
              this.dokumenKwtarray.forEach(item => {
                sumb = sumb + parseInt(item.ppn_amount);
              })  
              this.dokumenKwtarray.forEach(item => {
                sumc = sumc + parseInt(item.pph_amount);
              })             
              sum = this.formatCurrency2(sum);
              sumb = this.formatCurrency2(sumb);
              sumc = this.formatCurrency2(sumc);
              try {
                this.dokumenKwtarray3=this.dokumenKwtarray3.map(this.getKwtValue)
              }
              catch(err) {
                console.log(err);
              }        
              var cust_name = this.customer.map(({ customer_name }) => customer_name)
              var cust_number = this.customer.map(({ customer_number }) => customer_number)
              var header = cust_number + ' - ' + cust_name;
              // doc.text(header, 13, 5, { baseline: 'middle' });
              var doc = new jsPDF();
              doc.text("Tanda Terima Bukti Potong Sementara",105,15,{baseline: 'middle',align: 'center'});
              doc.setFontSize(10);
              doc.text(item.bupot_number + ' / ' + item.bupot_date,85,23,{baseline: 'middle',align: 'left',lineHeightFactor: '0.5'});
              doc.setFontSize(10);
              doc.text("Customer",166,10,{baseline: 'middle',align: 'left',lineHeightFactor: '0.5'});
              doc.setFontSize(10);
              doc.text(header,166,15,{baseline: 'middle',align: 'left',lineHeightFactor: '0.5'});              
              doc.autoTable({ 
                  columnStyles: {
                    0: {cellWidth:50, fontStyle: 'bold'}, 
                    3: {halign:'right',cellWidth:30},
                    4: {halign:'right',cellWidth:30},
                    5: {halign:'right',cellWidth:30}
                  },  
                  bodyStyles : {lineColor: [0, 0 ,0 ]},
                  headerStyles: {
                      lineWidth: 0.5,
                      lineColor: [0, 0, 0],
                      fillColor: [255, 255, 255],
                      textColor:'black'
                  },
                  footStyles: {
                      lineWidth: 0.5,
                      lineColor: [0, 0, 0],
                      fillColor: [255, 255, 255],
                      textColor:'black'
                  },                  
                  theme: 'grid',
                  head: [['Nomor Kwitansi', 'Tanggal Kwitansi', 'Jenis Kwitansi', 'DPP Kwitansi', 'PPN Kwitansi', 'PPh Kwitansi']],
                  body: this.dokumenKwtarray3,
                  margin: {top: 30},
                  foot: [[
                    {content: 'Grand total', colSpan: 3, styles: {halign: 'right', fillColor: [255, 255, 255], textColor:'black'}},
                    {content: sum, colSpan: 1, styles: {halign: 'right', fillColor: [255, 255, 255], textColor:'black'}},
                    {content: sumb, colSpan: 1, styles: {halign: 'right', fillColor: [255, 255, 255], textColor:'black'}},
                    {content: sumc, colSpan: 1, styles: {halign: 'right', fillColor: [255, 255, 255], textColor:'black'}}
                  ]]
                })
                  doc.autoTable({
                  bodyStyles : {lineColor: [0, 0 ,0 ]},
                  headerStyles: {
                      lineWidth: 0.5,
                      lineColor: [0, 0, 0]
                  },             
                  theme : 'grid',
                  head: [[{content: 'Validation Notes', colSpan: 2, styles: {halign: 'center', fillColor: [255, 255, 255], textColor:'black'}}]],
                  body: [
                    ['Tgl. Validasi Bupot:  ', '                          '],
                    ['Tgl. Cetak  Bupot:  ', '                          '],
                    ['Tgl. Kembali:  ', '                          '],
                    ['Paraf Petugas Validasi:  ', '                          '],
                    ['Nama Petugas:  ', '                          '],
                  ],
                  margin: {left: 135},
                  startY: 215,
                  lineColor: [0,0,0]
                })
              // doc.output('dataurlnewwindow')
              doc.setProperties({
                  title: "Laporan Bukti Potong"
              });
              window.open(doc.output('bloburl'))
            }); 
          this.dokumenKwtarray2.splice(0);
        },
        getKwtValue(item){
            var data = [item.kwt_number,item.kwt_date,item.kwt_type,item.dpp_amount,item.ppn_amount,item.pph_amount];
            return data;
        },
        formatDate(value){
          return moment(value).format("DD-MM-YYYY");
        },                   
    },
    components: {
      DatePicker
    }
  }
</script>