<template>
    <v-container class="my-5">
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
          @click="updateSubmit"
          v-if="dokumenBupot.status != 'S'"
        >
          Submit
        </v-btn>
                <v-btn
          color="success"
          dark
          class="mb-2 mr-1"
          @click="updateCancel"
          v-if="dokumenBupot.status != 'S'"
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
              :headers="headers"
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
  </v-container>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
export default {
    data () {
      return {
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
        dialog: false,
        singleSelect: false,
        dokumenBupot:{},
        dokumenKwt:[],
        headers: [
          { text: 'Nomor Kwitansi', value: 'kwt_number' },
          { text: 'Tanggal Kwitansi', value: 'kwt_date' },
          { text: 'Jenis Kwitansi', value: 'kwt_type' },
          { text: 'DPP Kwitansi', value: 'dpp_amount' },
          { text: 'PPN Kwitansi', value: 'ppn_amount' },
          { text: 'PPh Kwitansi', value: 'pph_amount' },
        ],
      }
    },
    created(){
        let uri = `http://localhost:8000/api/dtltrxpage/${this.$route.params.id}`;
            axios.get(uri).then(response => {
                this.dokumenBupot = response.data.data;
            });        
        let uri2 = `http://localhost:8000/api/dtlKwtpage/${this.$route.params.id}/${this.user.customer_id}`;
            axios.get(uri2).then(response => {
                this.dokumenKwt = response.data.data;
            });         
    },
    computed: {
        ...mapGetters({
          user: 'user',
        })
    },
    methods: {
      updateSubmit () {
        let uri = `http://localhost:8000/api/updatestatusbupotsubmit/${this.$route.params.id}`;
            axios.post(uri).then(() => {
                this.$router.push({name: 'TrxPage'});
            });      
      },     
      updateCancel (){
        let uri = `http://localhost:8000/api/updatestatusbupotcancel/${this.$route.params.id}`;
            axios.post(uri).then(() => {
                this.$router.push({name: 'TrxPage'});
            }); 
      }   
    }
}
</script>