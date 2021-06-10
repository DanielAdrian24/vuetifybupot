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
        >
        <v-list>
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
        </v-navigation-drawer>
    </nav>
</template>

<script>
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
            ]
        }
    },
    methods: {
              logout: function() {
              this.$store.dispatch('logout').then(() =>
              this.$router.push("/"))
          }
    }
}
</script>