<template>
    <div>
        <div id="titles">
            <div style="font-size: 36px" class="mb-2">{{ this.$route.params.name }}</div>
            温馨提示：如果以下没有内容显示，请稍等一会儿。如果长时间不响应，则可能源站无法访问，可通过“备用线路”访问
            <b-list-group v-for="item in titles" :key="item">
                <b-list-group-item href="#" @click="toPage(item)">{{ item }}</b-list-group-item>
            </b-list-group>
            <!-- <div >
                <a href="#" @click="toPage(item)">{{item}}</a>
            </div> -->
        </div>
    </div>
</template>


<script>
export default {
    data () {
        return {
            titles: []
        }
    },
    mounted(){
        this.$axios({
            method: 'get',
            url: 'http://comic.ssange.com/v/'+this.$route.params.cid
        })
         .then(res =>{
            this.titles = res.data.titles
         })   
    },
    methods: {
        toPage: function(item){
            this.$router.push({
                path: '/page/'+this.$route.params.cid+'/'+item
        })
        }
    }
}
</script>