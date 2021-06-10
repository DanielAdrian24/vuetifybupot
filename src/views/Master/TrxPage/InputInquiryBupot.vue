<template>
    <v-container class="my-5">
    <v-card>
    <h5>Selected: {{simpan}}</h5> 
    <h5>idKwt: {{idKwt}}</h5> 
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
        >
          Simpan
        </v-btn>
                <v-btn
          color="success"
          dark
          class="mb-2 mr-1"
        >
          Batal
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
          <v-text-field
            v-model="dokumenBupot.bupot_date"
            label="Tanggal Bukti Potong"
          ></v-text-field>
          <v-text-field
            v-model="dokumenBupot.dpp_amount"
            label="Jumlah Penghasilan Bruto"
          ></v-text-field>
          <v-text-field
            v-model="dokumenBupot.percentage"
            label="tarif"
          ></v-text-field>
          <v-text-field
            v-model="dokumenBupot.pph_amount"
            label="PPh"
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
                            </v-data-table>                
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                    <v-btn
                      color="success"
                      dark
                      class="mb-2 ml-2"
                    >
                        - Kwitansi
                    </v-btn>
                    <v-dialog v-model="dialogDelete" max-width="560px">
                      <v-card>
                        <v-card-title class="text-h5">Apakah anda ingin menambahkan kwitansi ini?</v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="saveInsert">Tambah</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>                    
            </v-toolbar>
            <v-divider></v-divider>        
            <v-data-table
              :headers="headers"
              :items="dokumenKwitansi"
              class="elevation-1 my-5"
            >
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
export default {
    data () {
      return {
        dialog: false,
        dialogDelete: false,
        singleSelect: false,
        dokumenBupot:{},
        listingKwt:[],
        dokumenKwitansi:[],
        simpan:[],
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
        ...mapGetters({
          user: 'user',
        })
    },
    methods: { 
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
        }
    }
}

</script>


