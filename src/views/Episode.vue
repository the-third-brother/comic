<template>
    <div>
        
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
            url: 'http://blog.ssange.com/v/'+this.$route.params.cid
        })
         .then(res =>{
            this.titles = res.data.titles
         })   
    }
}
</script>