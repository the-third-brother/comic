<template>
    <div>
        <div id="titles">
            温馨提示：如果以下没有内容显示，请稍等一会儿。如果长时间不响应，则可能源站无法访问，可通过“备用线路”访问
            <b-list-group v-for="item in comics" :key="item.cid">
                <b-list-group-item href="#" @click="toPage(item.cid,item.name)">{{ item.name }}</b-list-group-item>
            </b-list-group>
        </div>

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
    },
    toPage: function(cid, name){
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