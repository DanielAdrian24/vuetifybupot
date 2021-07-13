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
import jsPDF from 'jspdf'
import 'jspdf-autotable'
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
        },
        showPdf(item){
          alert(item.bupot_id);
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
        formatCurrency2(value){
            var formatter = new Intl.NumberFormat('en-US', {
            });

            return formatter.format(value); /* $2,500.00 */          
        }      
    },
    components: {
      DatePicker
    }
  }
</script>