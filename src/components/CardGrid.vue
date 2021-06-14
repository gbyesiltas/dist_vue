<template>
<ul class="cardGrid">
      <li class = "card" v-for="(skateboard, index) in skateboards" :key="index">
        <div class="card-content">
          <div>Brand: {{skateboard.brand}}</div>
          <div>Colour: {{skateboard.colour}}</div>
          <div>Length: {{skateboard.length}}</div>
          <b-button @click="addToCart(skateboard)" variant="primary">Add To Cart</b-button>
        </div>
      </li>
</ul>
</template>

<script>
export default {
  name: 'CardGrid',
  props: ['skateboards'],
  methods:{
    addToCart(skateboard){

      fetch("http://localhost:4545/DAdemo/shopping",
        {
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: skateboard.id
        })

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
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
