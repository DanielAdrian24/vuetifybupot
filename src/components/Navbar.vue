<template>
    <nav v-if="!$route.meta.hideNavigation">
        <v-toolbar> 
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Bukti</span>
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
        <v-list>
          <v-list-item
            v-for="link in menuItem2"
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
            menuItem:[],
            data:[],
            adminmenuItem:[],
            menuItem2:[],
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
        }),     
        reversedMessage: function () {
          // `this` points to the vm instance

            return this.menuItem2;
        }
    },
    created() {
            this.menuItem = [];
            this.$nextTick(() => {
              let uri = `http://localhost:8000/api/v1/getmenu/${this.user.role_id}`;
                  axios.get(uri).then(response => {
                  this.menuItem = response.data.data;
                  this.data = this.menuItem;
                  this.data.forEach(item => {              
                  this.menuItem2.push({
                    icon: 'person',
                    text: item.menu_detail_name,
                    route: item.menu_detail_desc
                  })
                })
              });
            });
    },
    mounted() {
    }
}
</script>