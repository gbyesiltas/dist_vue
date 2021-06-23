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
      <b-button class="login-button" variant="primary" @click="login()">Log In</b-button>
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
    }
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
}
</style>
