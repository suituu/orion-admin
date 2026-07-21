<template>

<div>


<div class="page-header">

<h2>
Admin Detail
</h2>


</div>



<el-card
v-if="admin"
style="margin-top:20px;"
>


<el-descriptions
title="Admin Information"
border
:column="2"
>


<el-descriptions-item label="ID">

{{ admin.id }}

</el-descriptions-item>



<el-descriptions-item label="Username">

{{ admin.username }}

</el-descriptions-item>



<el-descriptions-item label="Role">


<el-tag
v-if="admin.role === 'super'"
type="success"
>
Super Admin
</el-tag>


<el-tag
v-else
type="info"
>
{{ admin.role }}
</el-tag>


</el-descriptions-item>



<el-descriptions-item label="Created At">

{{ admin.created_at }}

</el-descriptions-item>



</el-descriptions>



<div
style="margin-top:20px;"
>

<el-button
type="warning"
@click="resetPassword"
>
Reset Password
</el-button>


</div>


</el-card>


</div>

</template>



<script setup>


import {
    ref,
    onMounted
} from "vue";


import {
    useRoute
} from "vue-router";


import axios from "axios";


import {
    getAdmin
} from "../api/admin";



const route = useRoute();


const admin = ref(null);



const API_BASE =
import.meta.env.VITE_API_BASE;




function headers(){

    return {

        Authorization:
        `Bearer ${localStorage.getItem("token")}`

    };

}





async function loadAdmin(){


    try{


        const res =
        await getAdmin(
            route.params.id
        );


        admin.value =
        res.data.data;


    }catch(err){

        console.error(err);

    }


}





async function resetPassword(){


    const password =
    prompt(
        "New password"
    );



    if(!password){

        return;

    }



    try{


        await axios.put(

            `${API_BASE}/api/admin/admins/${route.params.id}/password`,

            {
                password
            },

            {
                headers:headers()
            }

        );


        alert(
            "Password updated"
        );


    }catch(err){

        console.error(err);

        alert(
            "Update failed"
        );

    }


}





onMounted(()=>{

    loadAdmin();

});


</script>



<style scoped>


.page-header{

display:flex;

justify-content:space-between;

align-items:center;

}


</style>
