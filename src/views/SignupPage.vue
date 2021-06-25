<template>
  <div>
      <section>
        <h4>Name</h4>
        <input type="text" id="name-input" name="name"/>
      </section>
      <section>
        <h4>Surname</h4>
        <input type="text" id="surname-input" name="surname"/>
      </section>
      <section>
        <h4>Username</h4>
        <input type="text" id="username-input" name="username"/>
      </section>
      <section>
        <h4>Password</h4>
        <input type="password" id="password-input" name="password"/>
      </section>
      <div class="buttons">
        <b-button class="login-button" variant="success" @click="signup()">Make Account</b-button>
        <b-button class="login-button mainpage-button" variant="dark" @click="goToMainPage()">Go to Main Page </b-button>
      </div>
  </div>
</template>

<script>

export default {
  name: 'SignupPage',
  components: {
  },
  data(){
    return {
    }
  },
  methods:{
    async signup(){
      let username = document.getElementById("username-input").value
      let password = document.getElementById("password-input").value
      let name = document.getElementById("name-input").value
      let surname = document.getElementById("surname-input").value

      let response = await fetch("http://localhost:4545/DAdemo/registration?username="+username+"&password="+password+"&name="+name+"&surname="+surname, {method: 'PUT'})
      let result = await response.json()
      if(result.result == 'success'){
        this.$router.push('/')
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
