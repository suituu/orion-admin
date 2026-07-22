import { ElMessage } from "element-plus";


export function success(message){

    ElMessage.success({
        message,
        duration:3000,
    });

}



export function error(message){

    ElMessage.error({
        message,
        duration:3000,
    });

}



export function warning(message){

    ElMessage.warning({
        message,
        duration:3000,
    });

}
