<template>
  <div>
    <MyNavbar :navbarBrand="title" :numberOfItems="numberOfItems" />
    <CardGrid :products="products" @itemAdded="itemAdded"/>
    <b-button @click="soapMethod()">Try SOAP</b-button>
  </div>
</template>

<script>
import CardGrid from "../components/CardGrid";
import MyNavbar from "../components/MyNavbar";

export default {
  name: 'MainPage',
  components: {
    CardGrid,
    MyNavbar
  },
  data(){
    return {
      products : [{"brand":"none","colour":"none","length":0}],
      title: "Products",
      numberOfItems : 0,
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
  },
}
</script>

<style>
</style>
