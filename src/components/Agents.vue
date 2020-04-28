<template>
    <div class="agents">
        <v-card-title>
            <h2 class="mr-5 mb-3">Agent Status</h2>
            <v-progress-circular
                class="mb-3"
                v-if="loading"
                indeterminate
                color="green"
            ></v-progress-circular>
            <v-btn dark
                class="mb-3"
                v-if="!loading"
                color="green"
                rounded depressed
                @click="getData"
            >Sync</v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search For Agents"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="items" :search="search" >
                <template v-slot:item.available="{item}">
                    <v-chip :color="getStatusColor(item.available)" @click="confirmDialogAvailable(item.rainbowId)" dark>{{getAvailability(item.available)}}</v-chip>
                </template>
                <template v-slot:item.working="{item}">
                    <v-chip :color="getStatusColor(item.working)" @click="confirmDialogWorking(item.rainbowId)" dark>{{getWorkingStatus(item.working)}}</v-chip>
                </template>
                <template v-slot:item.category="{item}">
                        <v-chip :color="getCategoryColor(item.category)" dark>{{getCategoryName(item.category)}}</v-chip>
                </template>
                <template v-slot:item.reviews="{item}">
                    <a style="cursor: pointer" @click="seeAgent(item.rainbowId)">Reviews</a>
                </template>
        </v-data-table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Agents",
        methods: {
            getWorkingStatus(working){
                if (working) return "Working";
                else return "On Break"
            },
            getAvailability(working){
                if (working) return "Available";
                else return "Occupied"
            },
            getStatusColor(available) {
                if (available) return 'green';
                else return "red"
            },
            getCategoryName(category) {
                return this.categoriesName[category]
            },
            getCategoryColor(category) {
                return this.categoriesColor[category]
            },
            seeAgent(id){
                this.$router.push(`/reviews/${id}`)
            },
            confirmDialogWorking: function (rainbowId) {
                let self=this;
                return new Promise(function () {
                    let confirmed = window.confirm("Are you sure you want to change this agent's working status?");
                    return confirmed ? self.toggleWorking(rainbowId) : null ;
                });
            },
            confirmDialogAvailable: function (rainbowId) {
                let self=this;
                return new Promise(function () {
                    let confirmed = window.confirm("Are you sure you want to change this agent's availability status?");
                    return confirmed ? self.toggleAvailable(rainbowId) : null ;
                });
            },
            toggleAvailable: async function (rainbowId) {
                let self=this;
                if (self.loading) {
                    alert("The last request is still being processed");
                    return;
                } else self.loading=true;
                console.log(rainbowId);
                let auth = (localStorage.getItem('auth'));
                console.log(`Toggling data with auth key ${auth}`);
                try {
                    let response = await axios.patch(`https://esc-acorn-backend.herokuapp.com/admin/available?rainbowId=${rainbowId}`,null,{headers: {"authorization":`Bearer ${auth}`}});
                    console.log(response);
                } catch (e) {
                    console.log(e)
                }
                await self.getData();
                self.loading=false;
            },

            toggleWorking: async function (rainbowId) {
                let self=this;
                if (self.loading) {
                    alert("The last request is still being processed");
                    return;
                } else self.loading=true;
                console.log(rainbowId);
                let auth = (localStorage.getItem('auth'));
                console.log(`Toggling data with auth key ${auth}`);
                try {
                    let response = await axios.patch(`https://esc-acorn-backend.herokuapp.com/admin/working?rainbowId=${rainbowId}`,null,{headers: {"authorization":`Bearer ${auth}`}});
                    console.log(response);
                } catch (e) {
                    console.log(e)
                }
                await self.getData();
                self.loading=false;
            },
            /*
            * This method sends a GET request to the protected /admin endpoint on the queueing system side.
            * Authorization is provided through the retrieved json web token from local storage.
            */
            getData: async function (){
                let self=this;
                self.loading=true;
                let auth = (localStorage.getItem('auth'));
                console.log(`Getting Data with auth key ${auth}`);
                try {
                    let response = await axios.get('https://esc-acorn-backend.herokuapp.com/admin', {headers: {"authorization":`Bearer ${auth}`}});
                    let result = [];
                    for(let i in response.data)
                        result.push(response.data[i]);
                    console.log(result);
                    self.items=result;
                    self.loading=false;
                } catch (e) {
                    console.log(e)
                }
            }
        },
        created() {
            this.getData();
        },
        data () {
            return {
                search: '',
                loading: true,
                categoriesName: ["Acorn Products", "Acorn Services", "Acorn Applications", "Acorn Pay", "Acorn ID"],
                categoriesColor: ["blue", "orange", "purple", "silver", "black"],
                headers: [
                    {
                        text: 'Agent Name',
                        align: 'start',
                        value: 'name',
                    },
                    { text: 'Availability', value: 'available'},
                    { text: 'Set Working Status', value: 'working'},
                    { text: 'Service Category', value: 'category', },
                    { text: 'Rainbow ID', value: 'rainbowId' },
                    { text: 'Email Account', value: 'email', sortable: false },
                    { text: '', value: 'reviews', sortable: false }
                ],
                items: [],
            }
        },
    }
</script>

<style scoped>
    .agents{
        width: 95%;
        padding: 12px;
    }
    a {
        color: #4CAF50;
    }
</style>
