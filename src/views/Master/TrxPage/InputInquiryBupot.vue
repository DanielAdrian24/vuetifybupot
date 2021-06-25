<template>
    <v-container class="my-5">
    <v-card>
    <v-toolbar
        flat
      >
        <v-toolbar-title>Input Bukti Potong PPh</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <button>coba</button> -->
        <v-btn
          color="success"
          dark
          class="mb-2 mr-1"
          @click="insertKwitansi"
        >
          Simpan
        </v-btn> 
        <router-link :to="{name: 'TrxPage'}">
                <v-btn
          color="success"
          dark
          class="mb-2"
        >
          Kembali
        </v-btn>          
        </router-link>
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
            class="mt-5"
          ></v-text-field>
          <v-text-field v-model="dokumenBupot.bupot_date" single-line label="Masukan Tanggal">
            <template v-slot:append-outer>
              <date-picker v-model="dokumenBupot.bupot_date"/>
            </template>
          </v-text-field>                   
          <v-text-field
            v-model="dokumenBupot.dpp_amount"
            label="Jumlah Penghasilan Bruto"
          ></v-text-field>
          <v-text-field
            v-model="dokumenBupot.percentage"
            label="tarif"
          ></v-text-field>
          <v-text-field
            v-model="result"
            label="PPh"
            disabled
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
                    <v-spacer></v-spacer>
                    <v-dialog
                      v-model="dialog"
                      max-width="1000px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="success"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                          @click="loadDatakwt"
                        >
                          + Kwitansi
                        </v-btn>
                        
                      </template>
                      <v-card>
                        <v-toolbar
                        class="mb-2"
                        flat
                        color="success"
                        >
                        <v-toolbar-title class="white--text">Listing Kwitansi</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2 mr-2"
                          @click="save"
                        >
                          Tambah Ke Bupot
                        </v-btn>
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          @click="close"
                        >
                          Kembali
                        </v-btn>
                        </v-toolbar>
                        <v-card-text>
                            <v-data-table
                              v-model="simpan"
                              :headers="headers2"
                              :items="listingKwt"
                              :single-select="false"
                              item-key="kwt_number"
                              show-select
                              class="elevation-1"
                            >
                              <template v-slot:[`item.dpp_amount`]="{ item }">
                                {{formatCurrency(item.dpp_amount)}}
                              </template>    
                              <template v-slot:[`item.pph_amount`]="{ item }">
                                {{formatCurrency(item.pph_amount)}}
                              </template>                             
                            </v-data-table>                
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                    <v-btn
                      color="success"
                      dark
                      class="mb-2 ml-2"
                      @click="deleteItem()"
                    >
                        - Kwitansi
                    </v-btn>
                    <v-dialog v-model="dialogDelete" max-width="560px">
                      <v-card>
                        <v-card-title class="text-h5">Apakah anda ingin menambahkan kwitansi ini?</v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text >Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="saveInsert">Tambah</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>                    
            </v-toolbar>
            <v-divider></v-divider>        
            <v-data-table
              v-model="simpan2"
              :headers="headers"
              :items="dokumenKwitansi"
              item-key="kwt_number"
              class="elevation-1 my-5"
              show-select
            >
              <template v-slot:[`item.dpp_amount`]="{ item }">
                {{formatCurrency(item.dpp_amount)}}
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
  </v-container>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
import DatePicker from "../../../components/DatePicker.vue";
export default {
    data () {
      return {
        sumpphKwitansi:0,
        value:null,
        dialog: false,
        dialogDelete: false,
        singleSelect: false,
        dokumenBupot:{},
        listingKwt:[],
        dokumenKwitansi:[],
        editedIndex:[],
        simpan:[],
        simpan2:[],
        idKwt:[],
        data:[],
        data2:[],
        headers: [
          { text: 'Nomor Kwitansi', value: 'kwt_number' },
          { text: 'Tanggal Kwitansi', value: 'kwt_date' },
          { text: 'Jenis Kwitansi', value: 'kwt_type' },
          { text: 'DPP Kwitansi', value: 'dpp_amount' },
          { text: 'PPN Kwitansi', value: 'ppn_amount' },
          { text: 'PPh Kwitansi', value: 'pph_amount' },
        ],
        headers2: [
          { text: 'Nomor Kwitansi', value: 'kwt_number' },
          { text: 'Tanggal Kwitansi', value: 'kwt_date' },
          { text: 'Jenis Kwitansi', value: 'kwt_type' },
          { text: 'Dpp Kwitansi', value: 'dpp_amount' },
          { text: 'PPN Kwitansi', value: 'ppn_amount' },
          { text: 'PPH Kwitansi', value: 'pph_amount' },
        ],
      }
    },
    created(){          
        let uri = `http://localhost:8000/api/getkwtterdaftar`;
            axios.get(uri).then(response => {
                this.idKwt = response.data.data;
            });          
    },
    computed: {
          result: function(){
              return this.dokumenBupot.dpp_amount * this.dokumenBupot.percentage;
          },
        ...mapGetters({
          user: 'user',
        })
        
    },
    methods: { 
        insertKwitansi(){
          var sum = 0;
          this.dokumenBupot.pph_amount=this.result;
          this.simpan2.forEach(item => {
            sum = sum + parseInt(item.pph_amount);
          })
          this.sumpphKwitansi = sum;          
          if (this.dokumenBupot.pph_amount != this.sumpphKwitansi){
            alert("Jumlah PPH tidak Sama dengan PPH Kwitansi yang diinput")
          } else if (this.dokumenBupot.pph_amount == this.sumpphKwitansi){
          axios({
            method: 'post',
            url: 'http://localhost:8000/api/inputinquiry',
            data: {
              user_id: this.user.id,
              data_process:this.simpan2,
              data_bupot:this.dokumenBupot,
              role_id: this.user.role_id,
              customer_id :this.user.customer_id
            },
          })
           .then(() => {
              this.$router.push({name: 'TrxPage'});
            })
            .catch(error => {
              console.log(error.response)

            }) 
          }           
        },
        close(){
          this.dialog = false
        },
        save(){
            this.dialogDelete=true;
        },
        loadDatakwt(){
            this.simpan.splice(0);
            let uri = `http://localhost:8000/api/listingkwt`;
            axios.post(uri, this.idKwt)
                .then(response => {
                    this.listingKwt = response.data.data;
                });
        },
        saveInsert(){
            this.data=this.simpan
            this.data.forEach(item => {
              this.dokumenKwitansi.push({
                kwt_id:item.kwt_id,
                kwt_number:item.kwt_number,
                kwt_date:item.kwt_date,
                kwt_type:item.kwt_type,
                dpp_amount:item.dpp_amount,
                ppn_amount:item.ppn_amount,
                pph_amount:item.pph_amount
              })
                this.idKwt.push(item.kwt_id)
            })
            this.dialogDelete=false;
            this.dialog=false;
        },
        deleteItem () {
          for(var i = 0; i <this.simpan2.length; i++){
              const index = this.dokumenKwitansi.indexOf(this.simpan2[i]);
              const index2 = this.idKwt.indexOf(this.simpan2[i].kwt_id);
              this.dokumenKwitansi.splice(index, 1);
              this.idKwt.splice(index2, 1);
          }
          this.simpan2.splice(0);          
        },

        deleteItemConfirm () {
          this.desserts.splice(this.editedIndex, 1)
          this.closeDelete()
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


