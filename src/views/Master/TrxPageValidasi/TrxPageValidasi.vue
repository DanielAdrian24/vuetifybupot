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
                Tolak
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
    <template v-slot:[`item.bupot_number`]="{ item }">
        <!-- <router-link :to="{name: 'DetailBupot', params: { id: value }}"> -->
        <a @click="showPdf(item)">
          {{ item.bupot_number }}
        </a>                       
        <!-- </router-link> -->
    </template>
    <template v-slot:[`item.dpp_amount`]="{ item }">
      {{formatCurrency(item.dpp_amount)}}
    </template>
    <template v-slot:[`item.pph_amount`]="{ item }">
      {{formatCurrency(item.pph_amount)}}
    </template>
    <template v-slot:[`item.bupot_date`]="{ item }">
      {{formatDate(item.bupot_date)}}
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
import moment from 'moment'
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
        data3:[],
        cariData:[],
        search:'',
        dialog: false,
        singleSelect: false,
        selected: [],
        inquiryBupot:[],
        selectedIndex:-1,
        selectedItem:{},
        dokumenKwtarray:[],
        dokumenKwtarray2:[],
        dokumenKwtarray3:[],
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
            this.$swal.fire({
              title: 'Apakah anda yakin ingin Validasi Bukti Potong ini?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Validasi',
              cancelButtonText: 'Batal'
            }).then((result) => {
              if (result.isConfirmed) {
                let uri = `http://localhost:8000/api/validasidata`;
                axios.post(uri, this.idValidasi)
                    .then(() => {
                      let uri = `http://localhost:8000/api/trxpagevalidator`;
                          axios.get(uri).then(response => {
                              this.inquiryBupot = response.data.data;
                          });
                    });
                this.dialogDelete = false 
                this.$swal.fire(
                  'Sukses!',
                  'Bukti potong berhasil di validasi!',
                  'success'
                )
                this.dialogDelete = false     
              }
            })             
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
            this.$swal.fire({
              title: 'Apakah anda yakin ingin Menolak Bukti Potong ini?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Tolak',
            }).then((result) => {
              if (result.isConfirmed) {
                axios({
                    method: 'post',
                    url: 'http://localhost:8000/api/tolakdata',
                    data: {
                      id_tolak: this.idTolak,
                      reason:this.alasanTolak.alasan_tolak
                    },
                  })
                   .then(() => {
                      let uri = `http://localhost:8000/api/trxpagevalidator`;
                          axios.get(uri).then(response => {
                              this.inquiryBupot = response.data.data;
                          });
                      this.dialogClose()
                      this.idTolak.splice(0);
                    })
                    .catch(error => {
                      console.log(error.response)
                    }) 
                this.$swal.fire(
                  'Sukses!',
                  'Bukti Potong berhasil di tolak!',
                  'success'
                )
              }
            }) 
        },
        dialogClose(){
          this.dialog=false;
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
          let uri2 = `http://localhost:8000/api/getkwtarray/${item.bupot_id}/${item.id}`;
            axios.get(uri2).then(response => {
              this.dokumenKwtarray = response.data.data;
              try {
                this.dokumenKwtarray2=this.dokumenKwtarray.map(this.getKwtValue)
              }
              catch(err) {
                console.log(err);
              }
              this.data3=this.dokumenKwtarray
              this.data3.forEach(item => {
                this.dokumenKwtarray3.push({
                  kwt_id:item.kwt_id,
                  kwt_number:item.kwt_number,
                  kwt_date:this.formatDate(item.kwt_date),
                  kwt_type:item.kwt_type,
                  dpp_amount:this.formatCurrency(item.dpp_amount),
                  ppn_amount:this.formatCurrency(item.ppn_amount),
                  pph_amount:this.formatCurrency(item.pph_amount)
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
              sum = this.formatCurrency(sum);
              sumb = this.formatCurrency(sumb);
              sumc = this.formatCurrency(sumc);
              try {
                this.dokumenKwtarray3=this.dokumenKwtarray3.map(this.getKwtValue)
              }
              catch(err) {
                console.log(err);
              }  
              console.log(this.dokumenKwtarray3) 
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
                    0: {cellWidth:30}, 
                    3: {halign:'right',cellWidth:35},
                    4: {halign:'right',cellWidth:35},
                    5: {halign:'right',cellWidth:35}
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
                    {content: 'Grand total', colSpan: 3, styles: {halign: 'center', fillColor: [255, 255, 255], textColor:'black'}},
                    {content: sum, colSpan: 1, styles: {halign: 'center', fillColor: [255, 255, 255], textColor:'black'}},
                    {content: sumb, colSpan: 1, styles: {halign: 'center', fillColor: [255, 255, 255], textColor:'black'}},
                    {content: sumc, colSpan: 1, styles: {halign: 'center', fillColor: [255, 255, 255], textColor:'black'}}
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
        formatCurrency(value){
            var formatter = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'IDR',
            });

            return formatter.format(value); /* $2,500.00 */          
        },
        formatDate(value){
          return moment(value).format("DD-MM-YYYY");
        },
        getKwtValue(item){
            var data = [item.kwt_number,item.kwt_date,item.kwt_type,item.dpp_amount,item.ppn_amount,item.pph_amount];
            return data;
        },     
    },
    components: {
      DatePicker
    }
  }
</script>