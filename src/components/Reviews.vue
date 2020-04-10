<template>
    <div class="reviews">
        <v-card-title>
            <h2 class="mr-5">{{this.name}}</h2>
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
                    label="Search Comments"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-row class="mt-3" no-gutters>
            <v-col cols="12" sm="4">
                <v-card class="stats" cols="12" sm="4" outlined tile>
                    <h3>Average Helpfulness Rating</h3>
                    <v-progress-circular :rotate="90" :size="100" :width="15" :value="rating1percent" :color="getColor(this.rating1)">
                        {{ rating1 }}
                    </v-progress-circular>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4">
                <v-card class="stats" cols="12" sm="4" outlined tile>
                    <h3>Average Friendliness Rating</h3>
                    <v-progress-circular :rotate="90" :size="100" :width="15" :value="rating2percent" :color="getColor(this.rating2)">
                        {{ rating2 }}
                    </v-progress-circular>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4">
                <v-card class="stats" cols="12" sm="4" outlined tile>
                    <h3>Number of Ratings</h3>
                    <h1 style="font-size: 60px">{{ratings}}</h1>
                </v-card>
            </v-col>
        </v-row>
        <v-data-table class="mt-3" :headers="headers" :items="items" :search="search" >
        </v-data-table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Agents",
        methods: {
            getColor(val){
                if (val<1) return "red darken-4";
                else if (val<2) return "red";
                else if (val<3) return "orange";
                else if (val<4) return "lime";
                else return "#4CAF50";
            },
            getData: async function (){
                let self=this;
                self.loading=true;
                console.log("Getting Data");
                axios.get('https://still-sea-41149.herokuapp.com/api/status')
                    .then(response => {
                        // let result = [];
                        //TODO Need to add ID to parser
                        // for(let i in response.data)
                        //     result.push(response.data [i]);
                        console.log(response.data[0]);
                        self.items=response.data[0].feedbacks;
                        self.name=response.data[0].name;
                        self.rating1percent=response.data[0].averageRating1/5*100;
                        self.rating1=response.data[0].averageRating1.toFixed(2);
                        self.rating2percent=response.data[0].averageRating2/5*100;
                        self.rating2=response.data[0].averageRating2.toFixed(2);
                        self.ratings=response.data[0].numberOfRating;
                        console.log(self.items);
                        self.loading=false;
                    })
                    .catch(error => console.log(error))
            }
        },
        mounted() {
            this.id=this.$route.params.id;
            this.getData();
        },
        data () {
            return {
                search: '',
                id: "",
                name:"",
                loading: true,
                rating1:0,
                rating2:0,
                rating1percent:0,
                rating2percent:0,
                ratings:0,
                categoriesName: ["Acorn Products", "Acorn Services", "Acorn Applications", "Acorn Pay", "Acorn ID"],
                categoriesColor: ["blue", "orange", "purple", "silver", "black"],
                headers: [
                    { text: 'Email Account', value: 'email' },
                    { text: 'Comment', value: 'comment', sortable: false }
                ],
                items: [],
            }
        },
    }
</script>

<style scoped>
    .reviews{
        width: 85%;
        padding: 12px;
    }
    .stats{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        height: 180px;
    }

    .stats h3{
        margin-bottom: 10px;

    }
</style>
