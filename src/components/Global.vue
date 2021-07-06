<script>
var username='';
var password='';
var ispublic = true;
var categy = '人物';
var pripassword=false;
var pricategy =[];
var deleteStatus = false;
var selectStatus = false;
//无法直接编译GLOBAL中的new Map，所以我们先定义为[],然后检测如果是[]，则重新定义
var pictureList = [];
var deleteList = [];
var deleteMap = [];
export default
{
    username,
    password,
    pripassword,
    pictureList,
    pricategy,
    deleteStatus,
    selectStatus,
    deleteList,
    deleteMap,
    ispublic,
    categy
}
</script>