<template>
    <v-app>
        <Login v-if="!authenticated" v-bind:login="login"/>
        <div style="display: flex; flex-direction: row; position: relative; height: 100vh">
            <v-navigation-drawer mini-variant expand-on-hover touchless permanent dark height="100%" color="green">
                <v-list dense nav class="py-0">
                    <v-list-item two-line class="px-0">
                        <v-list-item-avatar>
                            <img src="../src/assets/logo.png">
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>Acorn Dashboard</v-list-item-title>
                            <v-list-item-subtitle>Agent Tracker</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider style="background-color: white"></v-divider>

                    <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <router-view class="router"></router-view>
        </div>
    </v-app>
</template>

<script>
    import Login from "./components/Login";
    import axios from "axios";
    export default {
        name: 'App',
        components:{Login},
        data: () => ({
            items: [
                { title: 'Agents', icon: 'mdi-account-multiple', link:"/agents" },
                { title: 'Reviews', icon: 'mdi-comment-text', link:"/reviews", }
            ],
            authenticated: false,
        }),
        /*
        * This method sends a GET request which simulates an administrator logging in. For simplicity, no actual credentials are verified.
        * The response contains generated json web token which is stored in localStorage and used to access protected endpoints.
        */
        methods:{
            login: function () {
                this.authenticated=true;
                this.$router.push("/agents");
                axios.get('https://esc-acorn-backend.herokuapp.com/login')
                    .then(response => {
                        localStorage.setItem('auth', response.data.auth);
                    })
                    .catch(error => console.log(error))

            }
        }
    };
</script>

<style scoped>

    .router {
        height: 100vh;
        overflow-y: scroll;
        width: 100%;
    }
    /* Hide scrollbar for Chrome, Safari and Opera */
    .router::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE and Edge */
    .router {
        -ms-overflow-style: none;
    }
</style>
