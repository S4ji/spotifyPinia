<script setup lang="ts">
  import { useSpotifyStore } from '~/stores/Spotify'

  let query = ref('')
  const config = useRuntimeConfig()
  
  const store = useSpotifyStore()

  
  const {data:accessToken} = await useAsyncData('token', async () => {
    store.setCredentials(config.public)
    const accessToken =await  store.getAccessToken() 
    return accessToken
   
    
    
  })




let history: string[] = []
if (process.client) {
    history = JSON.parse(window.localStorage.getItem('searchHistory')) || []
}

function addToHistory(query) {
    if (process.client) {
        history.push(query)
        if (history.length > 10) history.splice(0, history.length - 10)

        window.localStorage.setItem('searchHistory', JSON.stringify(history))
    }
}





</script>

<template>
  <form @submit.prevent="store.searchArtists(query), addToHistory(query)">
        <header>
           {{accessToken}}
        </header>
        <input v-model="query" type="search" placeholder="" />
        <br />
        <button>Search</button>
    </form>
</template>



<style>

</style>