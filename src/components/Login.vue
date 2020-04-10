<template>
    <v-layout align-center justify-center class="login">
        <v-flex xs12 sm8 md6 lg4>
            <v-card class="elevation-12 pa-2">
                <v-toolbar color="green" dark flat>
                    <v-toolbar-title>Admin Dashboard Login</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field
                                label="Username"
                                name="username"
                                prepend-icon="person"
                                type="text"
                        ></v-text-field>

                        <v-text-field
                                id="password"
                                label="Password"
                                name="password"
                                prepend-icon="lock"
                                type="password"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green" outlined large block dark @click="callLogin">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: 'Login',
        props: [ 'login' ],
        methods: {
            callLogin: function () {
                this.login()
            }
        }
    }
</script>

<style scoped>
    .login{
        position: fixed;
        height: 100vh;
        width: 100vw;
        background-color: white;
        z-index: 1;
    }
</style>
