<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      >
      <p>Succesfully removed the item from the cart!</p>
    </b-alert>
    <b-button class="main-page-button" variant="primary" @click="goToMainPage()">Go to Main Page</b-button>
    <h1>My Cart</h1>
    <ul>
      <li v-for="(item, index) in itemsInCart" :key="index">
        <div class="cart-item">
          Item with ID: {{item.itemID}}
          <b-button @click="removeItem(index,item.itemID)" variant="danger"> X </b-button>
        </div>
      </li>
    </ul>
    <b-button class="main-page-button" variant="success">Make Order!</b-button>
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
      dismissSecs: 1,
      dismissCountDown:0,
      showDismissableAlert: false,
    }
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
  },
  created() {
    // Simple GET request using fetch
    fetch("http://localhost:4545/DAdemo/shopping")
      .then(response => response.json())
      .then(data => this.itemsInCart=data)
  },
}
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
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
</style>
