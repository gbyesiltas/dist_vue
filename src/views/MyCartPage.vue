<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      >
      <p>Succesfully removed the item from the cart</p>
    </b-alert>
    <h1>My Cart</h1>
    <h3 v-if="itemsInCart.length==0">There are no items in your cart </h3>
    <ul>
      <li v-for="(item, index) in itemsInCart" :key="index">
        <div class="cart-item">
          {{item.productName}}: {{item.productPrice}}$
          <b-button @click="removeItem(index,item.idProducts)" variant="danger"> X </b-button>
        </div>
      </li>
    </ul>
    <h3 v-if="itemsInCart.length!=0">Total price: {{totalPrice}}$</h3>
    <h3 v-if="isLoggedIn">Money in your wallet: {{moneyInWallet}}$ </h3>
    <div class="buttons">
    <b-button class="main-page-button" :disabled="itemsInCart.length==0" variant="success" @click="makeOrder()">Make Order!</b-button>
    <b-button class="main-page-button" v-if="isLoggedIn" variant="primary" @click="topUp()">Add 50$</b-button>
    <b-button class="main-page-button" variant="dark" @click="goToMainPage()">Go to Main Page</b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MyCartPage',
  components: {
  },
  data(){
    return {
      itemsInCart : [],
      itemIDsInCart : [],
      dismissSecs: 1,
      dismissCountDown:0,
      moneyInWallet:0,
      isLoggedIn: false,
      showDismissableAlert: false,
    }
  },
  computed: {
    totalPrice() {
      let totalPrice=0
      for(let i=0;i<this.itemsInCart.length;i++){
        totalPrice+=this.itemsInCart[i].productPrice
      }
      return totalPrice
    },
  },
  methods:{
    goToMainPage(){
      this.$router.push('/')
    },
    removeItem(listIndex,itemID){
      fetch("http://localhost:4545/DAdemo/shopping?itemID="+itemID, {method: 'DELETE'})
        .then(response => response.json())
        .then(data => console.log(data)) //TODO: actually check if the response is 'success'
        this.itemsInCart.splice(listIndex,1)
        this.showAlert()
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    async makeOrder(){
      
      if(this.isLoggedIn == false){
        this.$router.push('/login')
      }
      else{
        let response = await fetch("http://localhost:4545/DAdemo/shopping?userID="+this.userID, {method: 'POST'})
        let responseJson = await response.json()

        if(responseJson.result == 'success'){
          this.$router.push('/successfulPurchase')
        }
        else{
          alert("There was a problem with your purchase")
        }
    }
    },
    async topUp(){
      
      if(this.isLoggedIn == false){
        this.$router.push('/login')
      }
      else{
        let response = await fetch("http://localhost:4545/DAdemo/registration?requestType=topUp&amount=50", {method: 'POST'})
        let responseJson = await response.json()

        if(responseJson.result == 'success'){
          location.reload()
        }
        else{
          alert("There was a problem with your top up request")
        }
    }
    }
  },
  async created() {
    // Simple GET request using fetch
    let idsResponse = await fetch("http://localhost:4545/DAdemo/shopping")
    let idsData = await idsResponse.json()

    for(let i=0;i<idsData.length;i++){
      const id = idsData[i].itemID
      fetch("http://localhost:8080/DAdemo/api/products/"+id)
      .then(response => response.json())
      .then(data => this.itemsInCart.push(data))
    }

    let loginResponse = await fetch("http://localhost:4545/DAdemo/registration")
    let loginResponseJson = await loginResponse.json()

    this.userID = loginResponseJson.userID
    this.isLoggedIn = loginResponseJson.isLoggedIn
    this.moneyInWallet = loginResponseJson.moneyInWallet

  },
}
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 30px;
  }

  li{
    margin: 20px;
    border: 1px solid black;
    border-radius: 6px;
  }
  
  .main-page-button{
    margin-bottom: 20px;
  }

  .cart-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 20px;
  }

  .buttons{
    display: flex;
    flex-direction: column;
    max-width: 150px;
    margin-left: auto;
    margin-right: auto;
    margin-top:30px;
  }
</style>
