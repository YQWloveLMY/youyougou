import { v4 as uuidv4 } from "uuid";
export const getUUID = () => {
    //先看看本地存储中是否有，因为一个计算机只能有一个游客身份
    // 这里如果没有就会返回null
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    if (!uuid_token) {
        uuid_token = uuidv4();
        // 没有就生成一个随机的，存到本地存储中
        localStorage.setItem("UUIDTOKEN", uuid_token);
    }
    return uuid_token;
};
