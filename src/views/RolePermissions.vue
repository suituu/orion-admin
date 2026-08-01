<template>
    <div class="page">

        <div class="page-header">

            <div>

                <h2>
                    角色权限配置
                </h2>

                <span>
                    查看并配置运营人员和客服角色权限
                </span>

            </div>

        </div>


        <el-row
            :gutter="20"
        >

            <el-col
                :span="7"
            >

                <el-card
                    class="section-card"
                >

                    <template #header>
                        角色列表
                    </template>


                    <div
                        v-if="pageLoading"
                        class="state-text"
                    >
                        角色信息加载中...
                    </div>


                    <el-empty
                        v-else-if="roles.length===0"
                        description="暂无角色信息"
                    />


                    <el-menu
                        v-else
                        :default-active="String(selectedRoleId)"
                        class="role-menu"
                        @select="handleRoleSelect"
                    >

                        <el-menu-item
                            v-for="role in roles"
                            :key="role.id"
                            :index="String(role.id)"
                        >

                            <span class="role-name">
                                {{roleLabel(role.name)}}
                            </span>


                            <el-tag
                                :type="roleTagType(role.name)"
                                size="small"
                            >
                                {{role.name}}
                            </el-tag>

                        </el-menu-item>

                    </el-menu>

                </el-card>

            </el-col>


            <el-col
                :span="17"
            >

                <el-card
                    class="section-card"
                >

                    <template #header>

                        <div class="permission-header">

                            <div>

                                <span>
                                    权限配置
                                </span>


                                <el-tag
                                    v-if="selectedRole"
                                    :type="roleTagType(selectedRole.name)"
                                    class="selected-role-tag"
                                >
                                    {{roleLabel(selectedRole.name)}}
                                </el-tag>

                            </div>


                            <el-button
                                v-if="isEditableRole"
                                type="primary"
                                :loading="saving"
                                :disabled="permissionsLoading || !hasChanges"
                                @click="savePermissions"
                            >
                                保存权限
                            </el-button>

                        </div>

                    </template>


                    <el-empty
                        v-if="!selectedRole"
                        description="请选择角色"
                    />


                    <template v-else>

                        <el-alert
                            v-if="selectedRole.name==='super'"
                            title="超级管理员拥有全部系统权限，属于内置角色，不能修改。"
                            type="warning"
                            :closable="false"
                            show-icon
                            class="role-alert"
                        />


                        <el-alert
                            v-else-if="selectedRole.name==='admin'"
                            title="管理员属于内置角色，权限只能查看，不能修改。"
                            type="info"
                            :closable="false"
                            show-icon
                            class="role-alert"
                        />


                        <div
                            v-if="permissionsLoading"
                            class="state-text"
                        >
                            权限信息加载中...
                        </div>


                        <el-empty
                            v-else-if="visiblePermissions.length===0"
                            description="暂无权限信息"
                        />


                        <el-checkbox-group
                            v-else
                            v-model="selectedPermissionIds"
                            :disabled="!isEditableRole"
                            class="permission-list"
                        >

                            <div
                                v-for="permission in visiblePermissions"
                                :key="permission.id"
                                class="permission-item"
                            >

                                <el-checkbox
                                    :label="permission.id"
                                >

                                    <span class="permission-name">
                                        {{permissionLabel(permission.code)}}
                                    </span>

                                </el-checkbox>


                                <div class="permission-meta">

                                    <el-tag
                                        type="info"
                                        size="small"
                                    >
                                        {{permission.code}}
                                    </el-tag>


                                    <span class="permission-description">
                                        {{permission.description || "暂无说明"}}
                                    </span>

                                </div>

                            </div>

                        </el-checkbox-group>

                    </template>

                </el-card>

            </el-col>

        </el-row>

    </div>
</template>


<script setup>

import {
    computed,
    onMounted,
    ref
} from "vue";


import {
    getPermissions,
    getRolePermissions,
    getRoles,
    updateRolePermissions
} from "../api/admin";


import {
    error,
    success
} from "../utils/message";


const roles = ref([]);

const allPermissions = ref([]);

const selectedRoleId = ref("");

const selectedPermissionIds = ref([]);

const originalPermissionIds = ref([]);

const pageLoading = ref(false);

const permissionsLoading = ref(false);

const saving = ref(false);


const selectedRole = computed(()=>{

    return roles.value.find(
        role =>
            String(role.id) ===
            String(selectedRoleId.value)
    ) || null;

});


const isBuiltInRole = computed(()=>{

    return [
        "super",
        "admin"
    ].includes(
        selectedRole.value?.name
    );

});


const isEditableRole = computed(()=>{

    return [
        "operator",
        "support"
    ].includes(
        selectedRole.value?.name
    );

});


const visiblePermissions = computed(()=>{

    if(!selectedRole.value){

        return [];

    }


    if(selectedRole.value.name === "super"){

        return allPermissions.value;

    }


    if(isBuiltInRole.value){

        const selectedIds =
            new Set(
                selectedPermissionIds.value.map(
                    id => Number(id)
                )
            );


        return allPermissions.value.filter(
            permission =>
                selectedIds.has(
                    Number(permission.id)
                )
        );

    }


    return allPermissions.value.filter(
        permission =>
            permission.code !== "USER_EDIT"
    );

});


const hasChanges = computed(()=>{

    if(!isEditableRole.value){

        return false;

    }


    return normalizeIds(
        selectedPermissionIds.value
    ).join(",") !==
    normalizeIds(
        originalPermissionIds.value
    ).join(",");

});


function normalizeIds(ids){

    return ids
        .map(
            id => Number(id)
        )
        .filter(
            id =>
                Number.isSafeInteger(id) &&
                id > 0
        )
        .sort(
            (a,b) => a - b
        );

}


function roleLabel(roleName){

    const labels = {

        super:"超级管理员",

        admin:"管理员",

        operator:"运营人员",

        support:"客服"

    };


    return labels[roleName] || roleName;

}


function roleTagType(roleName){

    const types = {

        super:"danger",

        admin:"info",

        operator:"warning",

        support:"success"

    };


    return types[roleName] || "info";

}


function permissionLabel(code){

    const labels = {

        USER_VIEW:"用户查看",

        USER_EDIT:"用户与管理员编辑",

        ORDER_VIEW:"订单查看",

        ORDER_PAY:"订单支付处理",

        DEVICE_VIEW:"设备查看",

        DEVICE_BIND:"设备绑定",

        OTA_VIEW:"OTA 查看",

        OTA_RELEASE:"固件发布",

        AUDIT_VIEW:"审计日志查看"

    };


    return labels[code] || code;

}


async function loadPage(){

    pageLoading.value = true;


    try{

        const [
            rolesResponse,
            permissionsResponse
        ] = await Promise.all([

            getRoles(),

            getPermissions()

        ]);


        roles.value =
            Array.isArray(
                rolesResponse.data.data
            )
                ? rolesResponse.data.data
                : [];


        allPermissions.value =
            Array.isArray(
                permissionsResponse.data.data
            )
                ? permissionsResponse.data.data
                : [];


        selectedRoleId.value =
            roles.value[0]?.id || "";


        if(selectedRoleId.value){

            await loadSelectedRolePermissions();

        }

    }catch(err){

        console.error(err);


        roles.value = [];

        allPermissions.value = [];

        selectedRoleId.value = "";


        error(
            "角色权限信息加载失败"
        );

    }finally{

        pageLoading.value = false;

    }

}


async function handleRoleSelect(roleId){

    if(
        saving.value ||
        String(selectedRoleId.value) ===
        String(roleId)
    ){

        return;

    }


    selectedRoleId.value = roleId;


    await loadSelectedRolePermissions();

}


async function loadSelectedRolePermissions(){

    if(!selectedRole.value){

        selectedPermissionIds.value = [];

        originalPermissionIds.value = [];

        return;

    }


    permissionsLoading.value = true;


    try{

        let permissionIds = [];


        if(selectedRole.value.name === "super"){

            permissionIds =
                allPermissions.value.map(
                    permission =>
                        Number(permission.id)
                );

        }else{

            const response =
                await getRolePermissions(
                    selectedRole.value.id
                );


            const rolePermissions =
                Array.isArray(
                    response.data.data
                )
                    ? response.data.data
                    : [];


            permissionIds =
                rolePermissions
                    .filter(
                        permission =>
                            !isEditableRole.value ||
                            permission.code !== "USER_EDIT"
                    )
                    .map(
                        permission =>
                            Number(permission.id)
                    );

        }


        const normalizedIds =
            normalizeIds(permissionIds);


        selectedPermissionIds.value = [
            ...normalizedIds
        ];


        originalPermissionIds.value = [
            ...normalizedIds
        ];

    }catch(err){

        console.error(err);


        selectedPermissionIds.value = [];

        originalPermissionIds.value = [];


        error(
            "角色权限加载失败"
        );

    }finally{

        permissionsLoading.value = false;

    }

}


async function savePermissions(){

    if(
        !selectedRole.value ||
        !isEditableRole.value ||
        !hasChanges.value ||
        saving.value
    ){

        return;

    }


    const permissionIds =
        normalizeIds(
            selectedPermissionIds.value
        );


    saving.value = true;


    try{

        await updateRolePermissions(
            selectedRole.value.id,
            permissionIds
        );


        success(
            "角色权限保存成功"
        );


        await loadSelectedRolePermissions();

    }catch(err){

        console.error(err);


        const backendError =
            err.response?.data?.error;


        const errorMessages = {

            "Permissions must be array":
                "权限数据格式错误",

            "Invalid role id":
                "角色编号无效",

            "Invalid permission id":
                "权限编号无效",

            "Duplicate permission id":
                "不能重复选择同一权限",

            "Role not found":
                "角色不存在",

            "Permission not found":
                "权限不存在",

            "Built-in role permissions cannot be modified":
                "内置角色权限不能修改",

            "Protected permission cannot be assigned":
                "该受保护权限不能分配给此角色"

        };


        error(
            errorMessages[backendError] ||
            backendError ||
            "角色权限保存失败"
        );

    }finally{

        saving.value = false;

    }

}


onMounted(()=>{

    loadPage();

});

</script>


<style scoped>

.page{
    padding:20px;
}


.page-header{
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom:20px;
}


.page-header h2{
    margin:0 0 6px;
}


.page-header span{
    color:#909399;
    font-size:14px;
}


.section-card{
    min-height:520px;
}


.role-menu{
    border-right:none;
}


.role-menu .el-menu-item{
    display:flex;
    align-items:center;
    justify-content:space-between;
}


.role-name{
    font-weight:500;
}


.permission-header{
    display:flex;
    align-items:center;
    justify-content:space-between;
}


.selected-role-tag{
    margin-left:12px;
}


.role-alert{
    margin-bottom:20px;
}


.permission-list{
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:14px;
}


.permission-item{
    padding:16px;
    border:1px solid #ebeef5;
    border-radius:6px;
    background:#ffffff;
}


.permission-name{
    font-weight:500;
}


.permission-meta{
    display:flex;
    align-items:center;
    gap:10px;
    margin-top:10px;
    padding-left:24px;
}


.permission-description{
    color:#909399;
    font-size:13px;
}


.state-text{
    padding:40px 0;
    text-align:center;
    color:#909399;
}


@media (max-width:900px){

    .permission-list{
        grid-template-columns:1fr;
    }

}

</style>
