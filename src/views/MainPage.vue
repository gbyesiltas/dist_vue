<template>
  <div>
    <MyNavbar @productFilterApplied="applyProductFilter" @isLoggedIn="isLoggedIn" :numberOfItems="numberOfItems" />
    <CardGrid :products="products" @itemAdded="itemAdded"/>
    
    <div class="buttons">
    <b-button class="main-page-button" @click="soapMethod()">Try SOAP</b-button>
    <b-button class="main-page-button" v-if="loggedIn" variant="danger" @click="logOut()">Log Out</b-button>
    </div>

    <MyFooter :numberOfVisits="numberOfVisits"/>

  </div>
</template>

<script>
import CardGrid from "../components/CardGrid";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter.vue";

export default {
  name: 'MainPage',
  components: {
    CardGrid,
    MyNavbar,
    MyFooter,
  },
  data(){
    return {
      products : [{"brand":"none","colour":"none","length":0}],
      title: "Products",
      numberOfItems : 0,
      loggedIn: false,
      numberOfVisits:0,
      activeProductFilter:0,
    }
  },
  methods:{
    soapMethod(){
      let xmls= `<?xml version="1.0" encoding="UTF-8"?>
                <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
                    <SOAP-ENV:Header/>
                    <S:Body>
                        <ns2:mirrorNumber xmlns:ns2="http://webservices/">
                            <arg0>10</arg0>
                        </ns2:mirrorNumber>
                    </S:Body>
                </S:Envelope>`

      fetch('http://localhost:4545/DAdemo/SOAPSer?WSDL',{
        method:'POST',
        headers:{'Content-Type':'text/xml'},
        body:xmls})
            .then(res=>{
             console.log(res.body);
           }).catch(err=>{console.log(err)});
      
      console.log("SOAP Method")
    },
    itemAdded(){
      this.numberOfItems= this.numberOfItems+1
    },
    isLoggedIn(){
      this.loggedIn=true
    },
    applyProductFilter(filterNo){
      if(this.activeProductFilter==filterNo) return
      fetch('http://localhost:8080/DAdemo/api/products')
    },
    async logOut(){
      await fetch("http://localhost:4545/DAdemo/registration?requestType=logout",{method:'POST'})
      location.reload();
    }
  },
  created() {
    // Simple GET request using fetch
    fetch("http://localhost:8080/DAdemo/api/products")
      .then(response => response.json())
      .then(data => this.products=data);
    
    fetch("http://localhost:4545/DAdemo/shopping")
      .then(response => response.json())
      .then(data => this.numberOfItems=data.length)

    fetch("http://localhost:4545/DAdemo/stats")
      .then(response => response.json())
      .then(data => this.numberOfVisits=data.numberOfVisits)
    
  },
}
</script>

<style>
  .buttons{
    display: flex;
    flex-direction: column;
    max-width: 120px;
    margin-left: auto;
    margin-right: auto;
    margin-top:30px;
  }

  .main-page-button{
    margin-bottom: 10px;
  }

</style>
