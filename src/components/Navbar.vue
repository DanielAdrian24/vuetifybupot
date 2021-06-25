<template>
    <nav v-if="!$route.meta.hideNavigation">
        <v-toolbar> 
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Bukti {{adminmenuItem}}</span>
                <span>Potong</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text color="grey" @click="logout">          
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
          style="background:#3c4b64;"
          width="auto"
        >
        <!-- <v-list>
          <v-subheader>Menu</v-subheader>
          <v-list-item
            v-for="link in adminmenuItem"
            :key="link.text"
            link
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list> -->
        <v-list v-if="this.user.role_id == 7">
          <v-subheader>Menu</v-subheader>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            link
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-if="this.user.role_id == 10">
          <v-subheader>Menu</v-subheader>
          <v-list-item
            v-for="link in validatorItem"
            :key="link.text"
            link
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-if="this.user.role_id == 12">
          <v-subheader>Menu</v-subheader>
          <v-list-item
            v-for="link in userItem"
            :key="link.text"
            link
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
    data(){
        return{
            drawer:false,
            links: [
              { icon: 'person', text: 'Customers', route: '/customers' },
              { icon: 'person', text: 'Role', route: '/role' },
              { icon: 'person', text: 'User', route: '/user' },
              { icon: 'person', text: 'Menu', route: '/menu' },
              { icon: 'person', text: 'Menu Detail', route: '/menudetail' },
              { icon: 'person', text: 'Inquiry Bukti Potong', route: '/trxPage' },
              { icon: 'person', text: 'Input Inquiry Bukti Potong (User)', route: '/inputinquirybupot' },
              { icon: 'person', text: 'Inquiry Bukti Potong (Kasir)', route: '/trxpagekasir' },
              { icon: 'person', text: 'Inquiry Bukti Potong (Validator)', route: '/trxpagevalidator' },
            ],
            userItem:[
              { icon: 'person', text: 'Inquiry Bukti Potong', route: '/trxPage' },
              { icon: 'person', text: 'Input Inquiry Bukti Potong (User)', route: '/inputinquirybupot' },
            ],
            validatorItem:[
              { icon: 'person', text: 'Inquiry Bukti Potong (Validator)', route: '/trxpagevalidator' },              
            ],
            menuItem:[],
            data:[],
            adminmenuItem:[],
            routeAdmin:[
              {route:'/customers' },
              {route:'/role' },
              {route:'/user' },
              {route:'/menu' },
              {route:'/menudetail' },
              {route:'/trxPage' },
              {route:'/inputinquirybupot' },
              {route:'/trxpagekasir'},
              {route:'/trxpagevalidator' }
            ]
        }
    },
    methods: {
              logout: function() {
              this.$store.dispatch('logout').then(() =>
              this.$router.push("/"))
          }
    },
    computed: {
          ...mapGetters({
          user: 'user',
        })     
    },
    created() {
            let uri = `http://localhost:8000/api/v1/getmenu/${this.user.role_id}`;
                axios.get(uri).then(response => {
                this.menuItem = response.data.data;
                this.data = this.menuItem;
                this.data.forEach(item => {              
                this.adminmenuItem.push({
                  icon: 'person',
                  text: item.menu_detail_name
                })
              })
            });
            

            // this.menuItem.forEach(item => {
            //   console.log(item);
            //   console.log("MASOK")
            // })
            // console.log(this.data)
            // console.log(this.adminmenuItem);
    }
}
</script>