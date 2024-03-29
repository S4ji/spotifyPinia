import { defineStore } from 'pinia';



interface Config {
    clientId:string
    clientSecret:string
}

interface State {
    accessToken:string
    clientId:string
    clientSecret:string
    query:string
    searchResult:any
}

export const useSpotifyStore = defineStore('accessToken', {
    state: ():State => ({
      accessToken: '',
      clientId:'',
      clientSecret:'',
      query:'',
      searchResult:''
    }),
    actions:{
        async  getAccessToken(): Promise<string> {
  
            const url = 'https://accounts.spotify.com/api/token'
            const encodedCredentials = btoa(
                `${this.clientId}:${this.clientSecret}`
            )
      

            
            const headers = {
                Authorization: `Basic ${encodedCredentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
            const body = 'grant_type=client_credentials'
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body,
            })
            if (!response.ok) {
                throw new Error(`Erreur : ${response.statusText}`)
            }
            
            const  accessToken = await response.json()
            this.accessToken = accessToken.access_token
            return this.accessToken
        
        
          },
           setCredentials({ clientId  ,clientSecret  }:Config){
            this.clientId =clientId
            this.clientSecret=clientSecret
           
          },
          async searchArtists(query: string): Promise<void> {
            const url = `https://api.spotify.com/v1/search?q=${query}&type=artist`
            console.log(query)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            })

            if (!response.ok) {
                throw new Error(`Erreur : ${response.statusText}`)
            }

            this.searchResult = await response.json()
            console.log(this.searchResult)
            
           
    
        }

        
    }
  
  });