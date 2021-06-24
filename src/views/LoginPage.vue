<template>
  <div>
      <section>
        <h4>Username</h4>
        <input type="text" id="username-input" name="username"/>
      </section>
      <section>
        <h4>Password</h4>
        <input type="password" id="password-input" name="password"/>
      </section>
      <div class="buttons">
        <b-button class="login-button" variant="success" @click="login()">Log In</b-button>
        <b-button class="login-button" variant="primary" @click="signup()">Make Account</b-button>
        <b-button class="login-button mainpage-button" variant="dark" @click="goToMainPage()">Go to Main Page </b-button>
      </div>
  </div>
</template>

<script>

export default {
  name: 'LoginPage',
  components: {
  },
  data(){
    return {
      loginResult:null,
    }
  },
  methods:{
    async login(){
      let username = document.getElementById("username-input").value
      let password = document.getElementById("password-input").value

      let response = await fetch("http://localhost:4545/DAdemo/registration?requestType=login&username="+username+"&password="+password, {method: 'POST'})
      let result = await response.json()
      if(result.result == 'success'){
        this.$router.push('/')
      }
      else{
        alert('Login failed')
      }
    },
    async signup(){
      let username = document.getElementById("username-input").value
      let password = document.getElementById("password-input").value

      let response = await fetch("http://localhost:4545/DAdemo/registration?username="+username+"&password="+password, {method: 'PUT'})
      let result = await response.json()
      if(result.result == 'success'){
        location.reload()
      }
      else{
        alert('Could not make new account')
      }
    },
    goToMainPage(){
      this.$router.push('/')
    },
  }
}
</script>

<style scoped>
input{
  margin-bottom: 10px;
  border: solid black 1px;
}
.login-button{
  margin-top:10px;
  width: 170px;
}

.buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0;
}

.mainpage-button{
  margin-top: 30px;
}
</style>
