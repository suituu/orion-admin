<template>

<div class="login-container">


<div class="background-grid"></div>



<el-card class="login-card">



<div class="brand">


<div class="logo">

ORION

</div>


<div class="subtitle">

{{ $t("login.subtitle") }}

</div>


</div>





<h2>

{{ $t("login.title") }}

</h2>





<el-form

@submit.prevent="login"

>



<el-form-item>


<el-input

v-model="username"

:placeholder="$t('login.username')"

/>


</el-form-item>





<el-form-item>


<el-input

v-model="password"

type="password"

:placeholder="$t('login.password')"

show-password

@keyup.enter="login"

/>


</el-form-item>





<el-button

class="login-button"

type="primary"

@click="login"

>


{{ $t("login.button") }}


</el-button>



</el-form>





<div class="security">

{{ $t("login.security") }}

</div>



<div class="copyright">

ORION Admin © 2026

</div>



</el-card>


</div>

</template>
<script setup>

import {
    ref
} from "vue";


import {
    useRouter
} from "vue-router";


import {
    adminLogin
} from "../api/admin";



const username = ref("");

const password = ref("");



const router = useRouter();





async function login(){


    try{


        const res = await adminLogin(

            username.value,

            password.value

        );



        localStorage.setItem(

            "token",

            res.data.token

        );



        router.push("/");



    }catch(err){


        console.error(err);



        alert(

            "登录失败，请检查账号和密码"

        );


    }


}



</script>
<style scoped>


.login-container{

    height:100vh;

    width:100%;

    display:flex;

    justify-content:center;

    align-items:center;

    position:relative;

    overflow:hidden;


    background:

    radial-gradient(
        circle at top,
        #334155,
        #020617 70%
    );


}




/* 背景网格 */

.background-grid{


    position:absolute;

    inset:0;


    background-image:


    linear-gradient(
        rgba(255,255,255,.035) 1px,
        transparent 1px
    ),


    linear-gradient(
        90deg,
        rgba(255,255,255,.035) 1px,
        transparent 1px
    );


    background-size:

    40px 40px;


}




/* 光晕 */


.login-container::before{


    content:"";


    position:absolute;


    width:650px;


    height:650px;


    top:-250px;


    left:50%;


    transform:translateX(-50%);


    background:


    radial-gradient(
        circle,
        rgba(59,130,246,.25),
        transparent 70%
    );


}




.login-card{


    width:430px;


    padding:32px;


    border-radius:18px;


    border:none;


    box-shadow:


    0 25px 60px rgba(0,0,0,.35);


    z-index:2;


}





.brand{


    text-align:center;


    margin-bottom:35px;


}





.logo{


    font-size:38px;


    font-weight:800;


    letter-spacing:6px;


    color:#0f172a;


}





.subtitle{


    margin-top:10px;


    font-size:14px;


    color:#64748b;


}





h2{


    text-align:center;


    font-size:24px;


    margin-bottom:30px;


    color:#0f172a;


}






:deep(.el-input__wrapper){


    height:46px;


    border-radius:10px;


}





:deep(.el-input__inner){


    font-size:14px;


}






.login-button{


    width:100%;


    height:46px;


    border-radius:10px;


    font-size:16px;


    transition:.25s;


}





.login-button:hover{


    transform:translateY(-2px);


    box-shadow:


    0 10px 25px rgba(37,99,235,.35);


}





.security{


    text-align:center;


    margin-top:28px;


    font-size:13px;


    color:#64748b;


}





.copyright{


    text-align:center;


    margin-top:14px;


    font-size:12px;


    color:#94a3b8;


}





</style>
