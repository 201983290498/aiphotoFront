<template>
    <div class="wait-content">
        <div class="content_choose zero">
            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'LoadWait',
    data () {return {}}
}
</script>

<style>

.wait-content{
    display: inline-block;
}
.wait-content img {
    max-width: 100%;
}

.loading {
    width: 95px;
    height: 40px;
    margin: 50px auto;

}
.loading span {
    display: inline-block;
    width: 7px;
    height: 80%;
    border-radius: 4px;
    background: lightgreen;
    margin-left: 5px;
    -webkit-animation: load 2s ease infinite;
}
@-webkit-keyframes load {

    0%,
    100% {
        height: 32px;
        background: lightgreen;
    }

    50% {
        height: 56px;
        margin: -15px 0;
        margin-left: 4px;
        background: lightblue;
    }
}

.loading span:nth-child(2) {
    -webkit-animation-delay: 0.2s;
}

.loading span:nth-child(3) {
    -webkit-animation-delay: 0.4s;
}

.loading span:nth-child(4) {
    -webkit-animation-delay: 0.6s;
}

.loading span:nth-child(5) {
    -webkit-animation-delay: 0.8s;
}

.loading span:nth-child(6) {
    -webkit-animation-delay: 1s;
}
</style>


