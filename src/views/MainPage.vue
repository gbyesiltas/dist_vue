<template>
    <div>
        <h1>Skateboards</h1>
        <CardGrid :skateboards="skateboards"/>
        <b-button @click="soapMethod()">Try SOAP</b-button>
    </div>
</template>

<script>
import CardGrid from "../components/CardGrid";

export default {
  name: 'MainPage',
  components: {
    CardGrid,
  },
  data(){
    return {
      skateboards : [{"brand":"none","colour":"none","length":0}],
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
  },
  created() {
    // Simple GET request using fetch
    fetch("http://localhost:8080/DAdemo/api/skateboards")
      .then(response => response.json())
      .then(data => this.skateboards=data);
  },
}
</script>

<style>
</style>
