<template>
<v-container class="my-5">
  <!-- <h5>Selected: {{selected}}</h5>
  <h5>Selected: {{selected2}}</h5> -->
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
    <template v-slot:top>
        <v-toolbar flat>
        <v-toolbar-title>Inquiry Bukti Potong</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-dialog
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
            >
              Tambah Role
            </v-btn>
          </template>
          <v-card>
            <v-toolbar
              color="success"
              dark
            >{{ formTitle }}</v-toolbar>
            <v-card-text>
                <v-data-table
                  v-model="selected2"
                  :headers="headers2"
                  :items="listKwt"
                  :single-select="false"
                  item-key="kwt_number"
                  show-select
                  class="elevation-1"
                >
                </v-data-table>                
            </v-card-text>
          </v-card>
        </v-dialog> -->
        </v-toolbar>
    </template>
  </v-data-table>

</v-container>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
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
        ],
        headers2: [
          { text: 'Nomor Kwitansi', value: 'kwt_number' },
          { text: 'Tanggal Kwitansi', value: 'kwt_date' },
          { text: 'Jenis Kwitansi', value: 'kwt_type' },
          { text: 'Dpp Kwitansi', value: 'dpp_amount' },
          { text: 'PPN Kwitansi', value: 'ppn_amount' },
          { text: 'PPH Kwitansi', value: 'pph_amount' },
        ],
        desserts2: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          },
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
        let uri = `http://localhost:8000/api/trxpage`;
            axios.get(uri).then(response => {
                this.inquiryBupot = response.data.data;
                console.log(this.inquiryBupot)
            });
    },
    methods:{
        showBupotid(a){
            this.selectedIndex = this.inquiryBupot.indexOf(a);
            this.selectedItem = Object.assign({}, a);
            // alert(a);
            console.log(this.selectedIndex);
        }
    }
  }
</script>