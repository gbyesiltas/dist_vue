<template>
<div class="my-card-grid">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">

  <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      >
      <p>Succesfully added the item to your cart!</p>
    </b-alert>
  <ul class="cardGrid">
        <li class = "card" v-for="(product, index) in products" :key="index">
          <div class="card-content">
            <div class="product-name">{{product.productName}}</div>
            <div>Price: {{product.productPrice}}$</div>
            <div>Amount in stock: {{product.productAmountInStock}}</div>
            <b-button @click="addToCart(product)" variant="primary" class="addtocart-button">
              <span class="material-icons-outlined">add_shopping_cart</span>
            </b-button>
          </div>
        </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'CardGrid',
  props: ['products'],
  data(){
    return{
      dismissSecs: 1,
      dismissCountDown:0,
      showDismissableAlert: false,
    }
  },
  methods:{
    addToCart(product){
      fetch("http://localhost:4545/DAdemo/shopping",
        {
          method: 'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body: product.idProducts
        })
      this.showAlert()
      this.succesfullyAdded()
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    succesfullyAdded(){
      this.$emit('itemAdded')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li, ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.cardGrid{
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}

.card{
  border: 1px solid black;
  margin: 3px;
  font-size: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
}

.btn{
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}

.product-name{
  font-weight: bold;
}

b-alert{
  max-height: 20px;
  margin-bottom: 0;
}

.addtocart-button{
  display: flex;
  align-items: center;
}


</style>
