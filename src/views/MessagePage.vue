<template>
  <div>
      <section>
        <h4>Send us your message</h4>
        <input type="text" id="message-input" name="message"/>
      </section>
      <b-button class="send-button" variant="primary" @click="sendMessage()">Send</b-button>
  </div>
</template>

<script>

export default {
  name: 'MessagePage',
  components: {
  },
  data(){
    return {
      loginResult:null,
    }
  },
  methods:{
    async sendMessage(){
      let message = document.getElementById("message-input").value

      let response = await fetch("http://localhost:4545/DAdemo/registration?requestType=login&username="+username+"&password="+password, {method: 'POST'})
      let result = await response.json()
      if(result.result == 'success'){
        this.$router.push('/')
      }
      else{
        alert('Login failed')
      }
    }
  }
}
</script>

<style scoped>
input{
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}
.send-button{
  margin-top:10px;
}
</style>
