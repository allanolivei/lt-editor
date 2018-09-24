<template>
    <div class="lt-img">
        <img class='img-fluid' :src="src" :alt="alt" />
    </div>
</template>

<script>
export default {
    props: ['src', 'alt']
}
</script>

