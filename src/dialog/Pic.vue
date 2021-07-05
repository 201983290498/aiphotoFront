<template>
   <div class="outer1" :id="'outer1'+picture.id">
        <div class="img-wraper1" >
            <span @click="createDialog(picture)"><img :src="picture.b64" alt=""> </span>
            <div class="dots-wrapper">
              <ul class="dots clearfix" @click="showDetails">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
        </div>
        <div class="detials1" :id="'details'+picture.id">
            <div class="info1">
                <h2 class="title1">
                    {{picture.categy}}
                </h2>
                <h3 class="category1">
                    <i class="fas fa-clock"></i>
                    {{picture.time.split("T")[0]}}
                </h3>
                <p class="briefintro1">
                    {{picture.remark}}
                </p>
            </div>
            <div class="star-warper1">
                <ul class="star1" :id="'like'+picture.id">
                  <li class="fas fa-heart" @click="like(1)"></li>
                  <li class="fas fa-heart" @click="like(2)"></li>
                  <li class="fas fa-heart" @click="like(3)"></li>
                  <li class="fas fa-heart" @click="like(4)"></li>
                </ul>
                <span class="fab fa-weibo">
                </span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "Pic",
  data(){
    return{}
  },
  props:{
    picture:{
      type: Object
    },
    createDialog:{
      type: Function
    }
  },
  methods:{
    like: function(rank){
      let rank1 =rank;
      let vm = this;
      if(this.picture.collected==rank){
        this.picture.collected=0;
        rank1 = 0;
      }else{
        this.picture.collected = rank;
      }
      let add = "/api/b64picture/setCollected?id="+this.picture.id+"&rank="+rank1;
      this.axios({
        method: 'get',
        url: add
      }).then(function(resp){});
      this.setIconRed();
    },
    setIconRed(){
      let ul = document.getElementById('like'+this.picture.id);
      let list = ul.children;
      let num = this.picture.collected;
      for(let i=0;i<list.length;i++){
        if(i<num)
          list[i].style.color = 'red';
        else
          list[i].style.color = ''; 
      }
    },
    showDetails: function(){
        let id = 'details'+this.picture.id;
        let node = document.getElementById(id);
        if(node.style.display == 'inline-block')
          node.style.display = 'none';
        else
          node.style.display = 'inline-block'
    }
  },
  mounted(){
    //前端接收到null的数据，null是个字符窜
    if(this.picture.remark=='null'||this.picture.remark=="")
      this.picture.remark = "说点什么吧。";
    this.setIconRed();
    let vm = this;
    let box = document.getElementById('outer1'+vm.picture.id);
    box.onmouseleave = function(){
      let node = document.getElementById('details'+vm.picture.id);
      node.style.display = 'none';
      console.log('dsad');
    }

  }
}
</script>

<style scoped>
@import url('../iconfont/fa/css/all.css');
.outer1 {
  text-align: left;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, .30);
  background: #fff;
}

.img-wraper1 img {
  width: 100%;
  vertical-align: bottom;
}
.img-wraper1{
  position: relative;
}

.info1,
.star-warper1 {
  padding: 0 18px;
  color: #acaaaa;
  font-size: 14px;
}

.info1 .title1 {
  color: #717171;
  font-size: 18px;
  margin: 13px 0 15px 0;
}

.info1 .category1 {
  color: #acaaaa;
  font-size: 14px;
}

.info1 .category1 i {
  margin-left: 4px;
  margin-right: 7px;
}

.info1 .briefintro1 {
  margin-top: 18px;
  margin-left: 4px;
  line-height: 20px;
  margin-bottom: 18px;
}

.star-warper1 {
  height: 46px;
  border-top: 1px solid #e9e9e9;
  line-height: 46px;
}

.star1 {
  float: left;
}

.fa-weibo {
  float: right;
  line-height: 46px;
}

.light1 {
    color: red;
}
.detials1{
    display: none;
    width: 100%;
}

.fa-heart:hover{
  cursor: pointer;
  position: relative;
  font-size: 16px;
  margin: 0 -1px;
}
.fa-weibo:hover{
  color: #D9251A;
  cursor: pointer;
  position: relative;
  font-size: 16px;
  margin: 0 -1px;
}
.img-wraper1:hover .dots-wrapper{
  display: block;
}
.dots-wrapper{
  position: absolute;
  left: 0;
  bottom: 0;
  height: 16px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
  padding: 0 18px;
  display: none;
}
.dots{
  height: 100%;
  display: inline-block;
  float: right;
}
.dots li{
  float: right;
  width: 5px;
  height: 5px;
  background: #ACAAAA;
  border-radius: 3px;
  margin-right: 2px;
  margin-top: 4.5px;
}
.dots:hover{
  cursor: pointer;
}
.dots:hover li{
  background-color: #fff;
}
</style>
