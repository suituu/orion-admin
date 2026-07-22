<template>

<div class="forbidden">


<div class="code">

403

</div>


<h2>

没有访问权限

</h2>


<p>

您没有权限访问当前页面

</p>



<el-button
type="primary"
@click="goHome"
>

返回首页

</el-button>


</div>


</template>



<script setup>

import {
useRouter
} from "vue-router";


const router = useRouter();



function goHome(){

router.push("/");

}


</script>




<style scoped>


.forbidden{


height:100%;


display:flex;


flex-direction:column;


justify-content:center;


align-items:center;


color:#475569;


}



.code{


font-size:90px;


font-weight:800;


color:#2563eb;


}



h2{


margin:10px 0;


font-size:26px;


}



p{


color:#94a3b8;


margin-bottom:30px;


}



</style>
