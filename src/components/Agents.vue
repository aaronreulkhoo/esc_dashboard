<template>
    <div class="agents">
        <v-card-title>
            <h2 class="mr-5">Agent Status</h2>
            <v-progress-circular
                    v-if="loading"
                    indeterminate
                    color="green"
            ></v-progress-circular>
            <v-btn dark
                v-if="!loading"
                color="green"
                rounded depressed
                @click="getData"
            >Sync</v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="items" :search="search" >
                <template v-slot:item.available="{item}">
                    <v-chip :color="getStatusColor(item.available)" dark>{{item.available}}</v-chip>
                </template>
                <template v-slot:item.category="{item}">
                        <v-chip :color="getCategoryColor(item.category)" dark>{{getCategoryName(item.category)}}</v-chip>
                </template>
                <template v-slot:item.reviews="{item}">
                    <a style="cursor: pointer" @click="seeAgent(item.rainbowId)">See Reviews</a>
                </template>
        </v-data-table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Agents",
        methods: {
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
            getData: async function (){
                let self=this;
                self.loading=true;
                console.log("Getting Data");
                axios.get('https://esc-acorn-backend.herokuapp.com/admin')
                    .then(response => {
                        let result = [];
                        for(let i in response.data)
                            result.push(response.data[i]);
                        console.log(result);
                        self.items=result;
                        self.loading=false;
                    })
                    .catch(error => console.log(error))
            }
        },
        mounted() {
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
        width: 85%;
        padding: 12px;
    }
    a {
        color: #4CAF50;
    }
</style>
