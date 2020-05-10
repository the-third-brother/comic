<template>
    <div>
        <div class="desc">温馨提示：如果以下没有内容显示，请稍等一会儿</div>
        <div class="title">{{this.$route.params.t}}</div>
        <div v-for="(item,index) in urls" :key="index">
            <img :src="item" alt="">
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            urls: []   
        }
    },
    mounted(){
        this.$axios({
            method: 'get',
            url: 'http://comic.ssange.com/get/'+this.$route.params.v+'/'+this.$route.params.t
        })
         .then(res =>{
            this.urls = res.data.urls
         })   
    }
}
</script>

<style>
        img{
			/*vertical-align: bottom;*/
			vertical-align: top;
		}
        .desc{
            margin-bottom: 20px;
        }

        .title{
            font-size: 36px;
            margin-bottom: 20px;
        }
</style>