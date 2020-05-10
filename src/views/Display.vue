<template>
    <div>
        <b-container fluid>
        <b-row>
        <div v-for="(item,index) in comics" :key="index">
            <b-col class="ml-2">
            <b-card
                :sub-title="item.name"
                :img-src="'https://www.ohmanhua.com/comic/'+item.cid+'/cover.jpg'"
                img-alt="Cover"
                img-top
                tag="article"
                style="max-width: 200px;"
                class="mb-2"
            >
                
                <b-button href="#" variant="primary" @click="episodes(item.cid,item.name)">观 看</b-button>
            </b-card>
            </b-col>
        </div>
        </b-row>
        </b-container>

        <!-- <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="comics"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table
        id="comics"
        :items="comics"
        :per-page="perPage"
        :current-page="currentPage"
        small
    >
    
    </b-table>
        </div> -->
  </div>

</template>

<script>
export default {
    data () {
        return {
            comics: [],
            perPage: 50,
            currentPage: 1
        
        }
    },
    mounted(){
        this.$axios({
            method: 'get',
            url: 'http://comic.ssange.com/all'
        })
         .then(res =>{
             console.log(res.data.comics)
            this.comics = res.data.comics
         })  
    },
    methods: {
        episodes: function(cid, name){
            this.$router.push({
                path: '/title/'+cid+'/'+name
        })        
    }
},
computed: {
      rows() {
        return this.comics.length
      }
    }
}
</script>

<style scoped>
    img{
        width: 200px;
        height: 250px;
    }
</style>