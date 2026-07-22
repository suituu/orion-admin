<template>

<div class="page">


<div class="page-header">

<div>

<h2>
固件管理
</h2>

<span>
管理系统版本、OTA发布和升级策略
</span>

</div>


<el-button
type="primary"
@click="uploadDialogVisible=true"
>
上传固件
</el-button>


</div>





<el-table
:data="firmwares"
border
style="width:100%;margin-top:20px;"
>



<el-table-column
prop="id"
label="编号"
width="70"
/>



<el-table-column
prop="version"
label="版本号"
width="110"
/>



<el-table-column
label="发布渠道"
width="120"
>

<template #default="scope">


<el-tag
v-if="scope.row.channel==='stable'"
type="success"
>
正式版
</el-tag>


<el-tag
v-else-if="scope.row.channel==='beta'"
type="warning"
>
测试版
</el-tag>


<el-tag
v-else
type="danger"
>
内部版
</el-tag>


</template>

</el-table-column>





<el-table-column
prop="product_name"
label="产品名称"
width="160"
>

<template #default="scope">

{{scope.row.product_name || `产品 ${scope.row.product_id}`}}

</template>

</el-table-column>





<el-table-column
prop="hardware_version"
label="硬件版本"
width="120"
/>




<el-table-column
prop="min_version"
label="最低支持版本"
width="150"
/>





<el-table-column
prop="file_name"
label="文件名称"
width="280"
/>





<el-table-column
prop="file_size"
label="文件大小"
width="120"
>

<template #default="scope">

{{formatFileSize(scope.row.file_size)}}

</template>

</el-table-column>





<el-table-column
label="强制升级"
width="120"
>

<template #default="scope">


<el-tag
v-if="Number(scope.row.force_update)===1"
type="danger"
>
是
</el-tag>


<el-tag
v-else
type="info"
>
否
</el-tag>


</template>

</el-table-column>





<el-table-column
prop="published_at"
label="发布时间"
width="180"
/>





<el-table-column
label="操作"
width="160"
fixed="right"
>

<template #default="scope">


<el-button
type="primary"
size="small"
@click="viewFirmware(scope.row.id)"
>
查看详情
</el-button>



<el-button
type="danger"
size="small"
@click="handleDelete(scope.row.id)"
>
删除
</el-button>


</template>

</el-table-column>





</el-table>





<el-dialog
v-model="uploadDialogVisible"
title="上传固件"
width="560px"
>


<el-form label-width="150px">



<el-form-item label="版本号">

<el-input
v-model="uploadForm.version"
placeholder="1.1.0"
/>

</el-form-item>




<el-form-item label="发布渠道">


<el-select
v-model="uploadForm.channel"
style="width:100%;"
>


<el-option
label="正式版"
value="stable"
/>


<el-option
label="测试版"
value="beta"
/>


<el-option
label="内部版"
value="alpha"
/>


</el-select>


</el-form-item>





<el-form-item label="产品">


<el-select
v-model="uploadForm.product_id"
style="width:100%;"
>


<el-option
label="ORION Standard"
:value="1"
/>


<el-option
label="ORION Pro"
:value="2"
/>


</el-select>


</el-form-item>





<el-form-item label="硬件版本">


<el-input
v-model="uploadForm.hardware_version"
placeholder="A1"
/>


</el-form-item>





<el-form-item label="最低支持版本">


<el-input
v-model="uploadForm.min_version"
placeholder="1.0.0"
/>


</el-form-item>





<el-form-item label="强制升级">


<el-switch
v-model="uploadForm.force_update"
/>


</el-form-item>





<el-form-item label="更新说明">


<el-input
v-model="uploadForm.release_notes"
type="textarea"
:rows="4"
/>


</el-form-item>





<el-form-item label="固件文件">


<input
ref="fileInput"
type="file"
accept=".bin"
@change="handleFileChange"
/>


</el-form-item>



</el-form>





<template #footer>


<el-button
@click="closeUploadDialog"
>
取消
</el-button>



<el-button
type="primary"
:loading="uploading"
@click="handleUpload"
>
上传
</el-button>



</template>


</el-dialog>




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
  getFirmwares,
  deleteFirmware,
  uploadFirmware
} from "../api/firmware";

import {
    success,
    error,
    warning
} from "../utils/message";
const firmwares = ref([]);


const router = useRouter();


const uploadDialogVisible = ref(false);


const uploading = ref(false);


const fileInput = ref(null);




function createDefaultUploadForm(){

  return {

    version:"",

    channel:"stable",

    product_id:2,

    hardware_version:"A1",

    min_version:"1.0.0",

    force_update:false,

    release_notes:"",

    file:null

  };

}



const uploadForm = ref(
  createDefaultUploadForm()
);





function viewFirmware(id){

  router.push(
    `/firmwares/${id}`
  );

}





async function loadFirmwares(){

  try{

    const res = await getFirmwares();


    firmwares.value =
      res.data.data;


  }catch(err){

    console.error(err);

error("加载固件失败");
  }

}







function handleFileChange(event){

  uploadForm.value.file =
    event.target.files?.[0] || null;

}







function resetUploadForm(){

  uploadForm.value =
    createDefaultUploadForm();


  if(fileInput.value){

    fileInput.value.value="";

  }

}







function closeUploadDialog(){

  uploadDialogVisible.value=false;

  resetUploadForm();

}








async function handleUpload(){


  if(!uploadForm.value.version.trim()){

warning("请输入版本号");
    return;

  }



  if(!uploadForm.value.hardware_version.trim()){

warning("请输入硬件版本");
    return;

  }




  if(!uploadForm.value.min_version.trim()){

warning("请输入最低版本");
    return;

  }





  if(!uploadForm.value.file){

warning("请选择固件文件");
    return;

  }






  const formData = new FormData();





  formData.append(

    "version",

    uploadForm.value.version.trim()

  );





  formData.append(

    "channel",

    uploadForm.value.channel

  );





  formData.append(

    "product_id",

    String(uploadForm.value.product_id)

  );





  formData.append(

    "hardware_version",

    uploadForm.value.hardware_version.trim()

  );





  formData.append(

    "min_version",

    uploadForm.value.min_version.trim()

  );





  formData.append(

    "force_update",

    uploadForm.value.force_update ? "1" : "0"

  );





  formData.append(

    "release_notes",

    uploadForm.value.release_notes

  );





  formData.append(

    "firmware",

    uploadForm.value.file

  );





  uploading.value=true;





  try{


    await uploadFirmware(formData);



    uploadDialogVisible.value=false;



    resetUploadForm();



    await loadFirmwares();



success("固件上传成功");


  }catch(err){


    console.error(err);



error(
  err.response?.data?.message ||
  "上传失败"
);


  }finally{


    uploading.value=false;


  }


}









async function handleDelete(id){


  if(!confirm("确定删除该固件？")){


    return;


  }






  try{


    await deleteFirmware(id);



    await loadFirmwares();



  }catch(err){


    console.error(err);



error("删除失败");

  }


}







function formatFileSize(size){


  const bytes = Number(size);




  if(!Number.isFinite(bytes)){


    return "-";


  }






  if(bytes < 1024){


    return `${bytes} B`;


  }






  if(bytes < 1024 * 1024){


    return `${(bytes / 1024).toFixed(1)} KB`;


  }






  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;



}







onMounted(()=>{


  loadFirmwares();


});



</script>
<style scoped>


.page{

padding:20px;

}



.page-header{


display:flex;


justify-content:space-between;


align-items:center;


margin-bottom:20px;


}




.page-header h2{


margin:0;


font-size:22px;


}




.page-header span{


display:block;


margin-top:6px;


color:#909399;


font-size:14px;


}



</style>
