<template>
  <div>
    <MyNavbar @productFilterApplied="applyProductFilter" @isLoggedIn="isLoggedIn" :numberOfItems="numberOfItems" />
    <CardGrid :products="filteredProducts" @itemAdded="itemAdded"/>
    
    <div class="buttons">
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
      filteredProducts: [{"brand":"none","colour":"none","length":0}],
      title: "Products",
      numberOfItems : 0,
      loggedIn: false,
      numberOfVisits:0,
      activeProductFilter:0,
    }
  },
  methods:{
    async getNumberOfVisits(){
      let xmls= `<?xml version="1.0" encoding="UTF-8"?>
                <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
                    <SOAP-ENV:Header/>
                    <S:Body>
                         <ns2:getNumberOfVisits xmlns:ns2="http://webservices/"/>
                    </S:Body>
                </S:Envelope>`

      let xmlResponse = await fetch('http://localhost:4545/DAdemo/WebStatsSOAP?WSDL',{
        method:'POST',
        headers:{'Content-Type':'text/xml'},
        body:xmls})
      
      let xmlBody = await xmlResponse.text()
      let xmlReturnValue = this.fetchXMLResponseValue(xmlBody)
      return xmlReturnValue
    },
    itemAdded(){
      this.numberOfItems= this.numberOfItems+1
    },
    isLoggedIn(){
      this.loggedIn=true
    },
    applyProductFilter(filterNo){

      if(this.activeProductFilter==filterNo){
        return
      }

      this.activeProductFilter = filterNo
      if(this.activeProductFilter==0){
        this.filteredProducts = this.products
        return
      }

      this.filteredProducts = []
      for(let i=0;i<this.products.length;i++){
        if(this.products[i].idProductsTypes == this.activeProductFilter){
          this.filteredProducts.push(this.products[i])
        }
      }
    },
    fetchXMLResponseValue(xmlBody){
      let returnValueStart = xmlBody.indexOf('<return>')+8
      let returnValueEnd = xmlBody.indexOf('</return>')-1
      let xmlReturnValue = ''
      for(let i=0;i<=returnValueEnd-returnValueStart;i++){
        xmlReturnValue += xmlBody[returnValueStart+i]
      }
      return xmlReturnValue
    },
    async logOut(){
      await fetch("http://localhost:4545/DAdemo/registration?requestType=logout",{method:'POST'})
      location.reload();
    }
  },
  async created() {
    // Simple GET request using fetch
    fetch("http://localhost:8080/DAdemo/api/products")
      .then(response => response.json())
      .then(data => this.products=data)
      .then(data => this.filteredProducts=data)
    
    fetch("http://localhost:4545/DAdemo/shopping")
      .then(response => response.json())
      .then(data => this.numberOfItems=data.length)

    this.numberOfVisits = parseInt(await this.getNumberOfVisits())
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