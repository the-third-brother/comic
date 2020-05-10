<template>
  <div id="app">
    <div id="nav">
      <b-navbar>
    <b-navbar-nav>
        <router-link to="/">主页 </router-link> | 
        <router-link to="/dispaly">图标标主页</router-link> | 
        <router-link to="/search">备用线路</router-link>


        
        <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input v-model="name" size="sm" class="mr-sm-2" placeholder="如：非友人关系"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" @click="search(name)">Search</b-button>
          </b-nav-form>

      </b-navbar-nav>
      </b-navbar>


      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    search: function(name){
      this.$axios({
            method: 'get',
            url: 'http://comic.ssange.com/nSearch/'+name
        })
         .then(res =>{
           this.$router.push({
                path: '/title/'+res.data.cid+'/'+res.data.title
            })
           
         })   
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
