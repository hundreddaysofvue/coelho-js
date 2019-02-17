<template>
  <div class="container">
    <h2>Coelho.js</h2>
    <article v-if="clicked" v-bind="bookquote">
      <span class="quote">{{ bookquote.quote }}</span><br>
      <span class="book">{{ bookquote.book }}</span>
    </article>
    <article class="message" v-else>
      {{ msg }}
    </article>
    <button @click="getBookquote()">Magic!</button>
  </div>
</template>

<script>
import axios from 'axios'
import _localStore from './utils/localStore'

const credentials = {
  key: process.env.APP_KEY,
  secret: process.env.APP_SECRET
},
authUrl = `https://${process.env.APP_ID}.app.jexia.com/ak/authentication`,
dataUrl = `https://${process.env.APP_ID}.app.jexia.com/rest/quotes`

export default {
  data () {
    return {
      msg: 'Press the button and feel the magic',
      clicked: false,
      bookquote: {},
      quotes: []
    }
  },
  methods: {
    getBookquote () {
      this.clicked = true
      this.bookquote = this.quotes[Math.floor(Math.random() * this.quotes.length)]
    }
  },
  created () {
    const store = _localStore.get('coelho')
    if (!store) {
      axios.post(authUrl, credentials)
        .then(response => axios.get(dataUrl, { headers: { 'Authorization': response.data.token } }))
        .then((response) => {
          _localStore.set('coelho', response.data)
        })
        .catch(error => console.log(error))
    }
    this.quotes = store
  }
}
</script>

<style scoped>
h2 {
  font-size: 4rem;
}
button {
  background-color: dodgerblue;
  outline: 0;
  border: 1px solid #F0F0F0;
  border-radius: 1rem;
  color: white;
  font-size: 2rem;
  margin-top: 2rem;
  padding: 1rem 2rem;
  transition: all .5s ease;
}
button:hover {
  background-color: #0252A0;
}
.container {
  text-align: center;
  width: 80vh;
  margin: 1rem auto;
}
.message {
  font-size: 1.5rem;
}
.quote {
  font-size: 2rem;
}
.book {
  font-style: italic;
}
</style>
