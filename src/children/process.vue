<template>
    <div class="container2">
        <homeaside></homeaside>
        <h1>{{ test }}</h1>
    </div>
</template>
<script>
import homeaside from '../children/home_aside.vue'
export default {
    data () {
        return {
            test: '12321424124'
        }
    },
    components: {
        'homeaside':homeaside,
    },
}
</script>
<style scoped>
    
</style>