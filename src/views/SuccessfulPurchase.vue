<template>
    <div>
        <h3>Your purchase was successful!</h3>
        <b-button class="main-page-button" variant="primary" @click="goToMainPage()">Go to Main Page</b-button>
    </div>
</template>

<script>
export default {
    methods:{
    goToMainPage(){
      this.$router.push('/')
    },
    }
}
</script>