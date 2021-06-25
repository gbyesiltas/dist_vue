<template>
  <div>
      <section>
        <h4>Send us your message</h4>
        <input type="text" id="message-input" name="message"/>
      </section>
      <div class="buttons">
      <b-button class="send-button" variant="primary" @click="sendMessage()">Send</b-button>
      <b-button class="mainpage-button" variant="dark" @click="goToMainPage()">Go to Main Page</b-button>
      </div>
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
    sendMessage(){
      let message = document.getElementById("message-input").value
      fetch("http://localhost:4545/DAdemo/message?text=" + message)
      alert("Thank you for your feedback!")
    },
    goToMainPage(){
      this.$router.push('/')
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

.buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mainpage-button{
  margin-top: 10px;
  width: 150px;
}
</style>
