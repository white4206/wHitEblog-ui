export const validUsername = (rule, value, callback) => {
    if (value && value !== "") {
        let totalLength = Math.round(value.length)
        if (!/^[_a-zA-Z0-9]+$/.test(value))
            callback(new Error("用户名只能由英文、数字以及下划线组成"));
        else if (!(4 <= totalLength && totalLength <= 12))
            callback(new Error("用户名长度为4-12位"));
        else callback();
    } else {
        callback(new Error("请输入用户名"));
    }
}
export const validNickname = (rule, value, callback) => {
    if (value && value !== "") {
        // 计算字符所占长度
        let temp = value.match(/\w+/g);
        let [tempLength, totalLength] = [0, 0];
        if (temp !== null) {
            temp.map((item) => {
                tempLength += Math.round(item.length / 2);
            });
            totalLength = value.length - tempLength;
        } else totalLength = value.length;
        if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(value))
            callback(new Error("昵称只能由中文、英文、数字以及下划线组成"));
        else if (!(1 <= totalLength && totalLength <= 5))
            callback(new Error("昵称长度为2-10个字符"));
        else callback();
    } else {
        callback(new Error("请输入昵称"));
    }
}
export const validFolderName = (rule, value, callback) => {
    if (value && value !== "") {
        // 计算字符所占长度
        let temp = value.match(/\w+/g);
        let [tempLength, totalLength] = [0, 0];
        if (temp !== null) {
            temp.map((item) => {
                tempLength += Math.round(item.length / 2);
            });
            totalLength = value.length - tempLength;
        } else totalLength = value.length;
        if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(value))
            callback(new Error("文件夹名称只能由中文、英文、数字以及下划线组成"));
        else if (!(1 <= totalLength && totalLength <= 10))
            callback(new Error("长度在2-20个字符"));
        else callback();
    } else {
        callback(new Error("请输入文件夹名称"));
    }
}
export const validPassword = (rule, value, callback) => {
    if (value && value !== "") {
        let temp = value.match(/^[~()`!@#$%^&*\-+=|{}\[\]:;'<>,.?/\\_a-zA-Z0-9]+$/g);
        let [tempLength, totalLength] = [0, 0];
        if (temp !== null) {
            temp.map((item) => {
                tempLength += Math.round(item.length / 2);
            });
            totalLength = value.length - tempLength;
        } else totalLength = value.length;
        if (!/^[~()`!@#$%^&*\-+=|{}\[\]:;'<>,.?/\\_a-zA-Z0-9]+$/.test(value))
            callback(new Error("密码只能由英文字母、数字以及特殊字符组成"));
        else if (!(3 <= totalLength && totalLength <= 9))
            callback(new Error("密码长度为8-18位"));
        else callback();
    } else {
        callback(new Error("请输入密码"));
    }
}
export const validEmail = (rule, value, callback) => {
    if (value !== null && value !== "") {
        if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))
            callback(new Error("请检查邮箱地址是否正确"));
        else
            callback()
    } else
        callback(new Error("请输入邮箱账号"));
}