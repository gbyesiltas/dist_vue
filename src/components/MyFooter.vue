<template>
    <div class="my-footer">
        <b-navbar toggleable="lg" type="light" variant="light">
            <b-navbar-brand>Distributed Applications (Team 16)</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                This page was visited so many times in the last minute: {{numberOfVisits}}
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'MyFooter',

    props: {
        numberOfVisits:Number,
    },

    data(){
        return {}
    },

    methods:{},
}
</script>

<style scoped>
.my-footer{
    margin-top: 30px;
}
</style>