<template>
    <v-app>
        <Login v-if="!authenticated" v-bind:login="login"/>
        <div style="display: flex; flex-direction: row; position: relative">
            <v-navigation-drawer permanent dark height="100vh" color="green">
                <v-list dense nav class="py-0">
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title>Acorn Dashboard</v-list-item-title>
                            <v-list-item-subtitle>Agent Tracker</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

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
            <router-view/>
        </div>
    </v-app>
</template>

<script>
    import Login from "./components/Login";
    export default {
        name: 'App',
        components:{Login},
        data: () => ({
            items: [
                // { title: 'Dashboard', icon: 'mdi-desktop-mac-dashboard', link:"/dashboard"},
                { title: 'Agents', icon: 'mdi-card-account-details', link:"/agents" },
                { title: 'Reviews', icon: 'mdi-comment-account', link:"/reviews", }
            ],

            authenticated: false,
        }),
        methods:{
            login: function () {
                this.authenticated=true;
                this.$router.push("/agents")
            }
        }
    };
</script>
