<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-nav>
                <b-nav-item :active="activeFilter==0" @click="getAllProducts">All products</b-nav-item>
                <b-nav-item :active="activeFilter==1" @click="getOnlyBoards">Boards</b-nav-item>
                <b-nav-item :active="activeFilter==2" @click="getOnlyWheels">Wheels</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <div class="right-items">
                <b-nav-item v-if="loggedIn==false" @click="goToLogin()">Log in</b-nav-item>
				<b-nav-item @click="goToMessage()">Send us a message</b-nav-item>
                <b-nav-item @click="goToMyCart()">My Cart</b-nav-item>
                <b-nav-item class="cart-number" disabled>{{numberOfItems}}</b-nav-item>
                </div>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>


<script>
export default {
  name: 'MyNavbar',
  props: {
      numberOfItems: Number,
  },
  data(){
    return {
      loggedIn: false,
      activeFilter: 0,
    }
  },
  methods:{
      goToMyCart(){
          this.$router.push({ path: 'myCart' })
      },
      goToLogin(){
          this.$router.push({path:'login'})
      },
	  goToMessage(){
		this.$router.push({path:'message'})
	  },
      getAllProducts(){
          this.activeFilter=0
          this.$emit('productFilterApplied',this.activeFilter)
      },
      getOnlyBoards(){
          this.activeFilter=1
          this.$emit('productFilterApplied',this.activeFilter)
      },
      getOnlyWheels(){
          this.activeFilter=2
          this.$emit('productFilterApplied',this.activeFilter)
      }
  },
  async created(){
    let response = await fetch("http://localhost:4545/DAdemo/registration")
    let result = await response.json()
    
    if(result.isLoggedIn){
        this.loggedIn = result.isLoggedIn
        this.$emit('isLoggedIn')
    }
  }
}
</script>

<style>
    .cart-number{
        font-weight: bold;
        border: white solid 1px;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .right-items{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>