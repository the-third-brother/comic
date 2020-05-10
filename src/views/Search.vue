<template>
    <div>
        <b-container fluid class="col-sm-8">
            温馨提示：当源站域名失效后，可通过该方法直接访问资源
            <b-row class="my-1">
                <b-col sm="3">
                <label for="input-valid">漫画名称:</label>
                </b-col>
                <b-col sm="9">
                <b-form-input v-model="v" id="input-valid" :state="null" placeholder="如：非友人关系"></b-form-input>
                </b-col>
            </b-row>
            <!-- This will only be shown if the preceding input has an invalid state -->
                <b-form-invalid-feedback id="input-live-feedback">
                Enter at least 1 letters
                </b-form-invalid-feedback>

            <b-row class="my-1">
                <b-col sm="3">
                <label for="input-valid">剧情名称:</label>
                </b-col>
                <b-col sm="9">
                <b-form-input v-model="t" id="input-valid" :state="null" placeholder="如：第60话 终于相见！"></b-form-input>
                </b-col>
            </b-row>

            <div>
            <b-button block variant="primary" class="mt-3" @click="search(v,t)">搜索</b-button>
            </div>

        
            </b-container>

    </div>
</template>

<script>
export default {
    data () {
        return {
            v: '',
            t: '',
            title: '',
            urls: [],
            state: true
        }
    },
    methods: {
        search: function(v, t){
            this.$router.push({
                path: '/pageBackup/'+v+'/'+t
            })
            this.$axios({
                method: 'get',
                url: 'http://comic.ssange.com/get/'+v+'/'+t
            })
            .then(res =>{
                this.title = res.data.title
                this.urls = res.data.urls
                
            })   
            }
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