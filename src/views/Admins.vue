<template>

<div>


<div class="page-header">

<h2>
Admin Management
</h2>


<el-button
type="primary"
@click="createAdmin"
>
Create Admin
</el-button>


</div>



<el-table
:data="admins"
border
style="width:100%;margin-top:20px;"
>


<el-table-column
prop="id"
label="ID"
width="80"
/>


<el-table-column
prop="username"
label="Username"
width="200"
/>


<el-table-column
prop="role"
label="Role"
width="150"
/>


<el-table-column
prop="created_at"
label="Created At"
width="200"
/>



<el-table-column
label="Action"
width="220"
>


<template #default="scope">


<el-button
type="primary"
size="small"
@click="viewAdmin(scope.row.id)"
>
View
</el-button>


<el-button
type="danger"
size="small"
@click="deleteAdmin(scope.row.id)"
>
Delete
</el-button>


</template>


</el-table-column>



</el-table>


</div>

</template>


<script setup>


import {
    ref,
    onMounted
} from "vue";


import {
    useRouter
} from "vue-router";


import {
    getAdmins
} from "../api/admin";


import axios from "axios";



const API_BASE = import.meta.env.VITE_API_BASE;



const admins = ref([]);


const router = useRouter();




function getHeaders(){

    return {

        Authorization:
        `Bearer ${localStorage.getItem("token")}`

    };

}




async function loadAdmins(){


    try{


        const res = await getAdmins();


        admins.value =
        res.data.data;


    }catch(err){

        console.error(err);

    }


}





function viewAdmin(id){

    router.push(
        `/admins/${id}`
    );

}




async function createAdmin(){


    const username =
    prompt("Username");


    const password =
    prompt("Password");


    if(!username || !password){

        return;

    }



    try{


        await axios.post(

            `${API_BASE}/api/admin/admins`,

            {

                username,

                password,

                role:"admin"

            },

            {

                headers:getHeaders()

            }

        );


        alert("Admin created");


        loadAdmins();


    }catch(err){

        console.error(err);

        alert("Create failed");

    }


}





async function deleteAdmin(id){


    if(!confirm("Delete this admin?")){

        return;

    }



    try{


        await axios.delete(

            `${API_BASE}/api/admin/admins/${id}`,

            {

                headers:getHeaders()

            }

        );


        alert("Deleted");


        loadAdmins();


    }catch(err){

        console.error(err);

        alert("Delete failed");

    }


}




onMounted(()=>{


    loadAdmins();


});



</script>



<style scoped>


.page-header{


display:flex;

justify-content:space-between;

align-items:center;


}


</style>
