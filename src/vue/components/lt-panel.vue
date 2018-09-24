<template>
    <div class="panel">
        <lt-slot class="panel-header" :children='header'></lt-slot>
        <lt-slot class="panel-body" :children='children'></lt-slot>
    </div>
</template>


<script>
export default 
{
    props: ['children', 'header']    
}
</script>


<style lang="scss" scoped>
.panel
{
    color: white;
    background: purple;
    border-radius: 6px;
    max-width: 940px;
    margin: 0 auto;
    overflow: hidden;
    
    .panel-header
    {
        padding: 10px 20px;
        background: rgb(102, 1, 102);

        &:empty { display: none; }
    }

    .panel-body
    {
        padding: 8px 20px;
    }
}
</style>

