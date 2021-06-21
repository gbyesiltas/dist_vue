<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand>{{navbarBrand}}</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-nav-item href="#">My Cart</b-nav-item>
                <b-nav-item disabled>{{numberOfItems}}</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>


<script>
export default {
  name: 'MyNavbar',
  props: {
      navbarBrand: String,
      numberOfItems: Number,
  },
  created(){
      console.log(this['navbar-brand'])
  }
}
</script>