<template>
    <v-container class="my-5">
    <v-card>
    <v-toolbar
        flat
      >
        <v-toolbar-title>Detail Bukti Potong PPh</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <button>coba</button> -->
        <router-link :to="{name: 'TrxPageValidator'}">
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
            v-bind:readonly="readonly"
            disabled
            v-bind:outlined="outlined"
            v-bind:clearable="clearable"
            v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
            v-bind:options="options"
          /> 
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
        let uri2 = `http://localhost:8000/api/dtlKwtpageValidator/${this.$route.params.id}`;
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
    }
}
</script>