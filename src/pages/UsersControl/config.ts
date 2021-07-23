import generatePassword from "password-generator";

export const MIN_SNP = 2;
export const MAX_SNP = 20;
export const MAX_ABOUT = 256;
export const ERROR_NAME_FIELD = `Длина имени от ${MIN_SNP} до ${MAX_SNP} символов, допускаются только русские буквы.`;
export const ERROR_SURNAME_FIELD = `Длина фамилии от ${MIN_SNP}  до ${MAX_SNP} символов, допускаются только русские буквы.`;
export const ERROR_PATRONYMIC_FIELD = `Длина отчества от ${MIN_SNP}  до ${MAX_SNP} символов, допускаются только русские буквы.`;
export const ERROR_PHONE_FIELD = "Неверный номер телефона.";
export const ERROR_EMAIL_FIELD = "Неверный email.";
export const ERROR_ABOUT_FIELD = `Максимальная длина описания ${MAX_ABOUT} символов.`;


export const btnPasswd =
    {
        id: "btn-passwd-generator",
        title: "+",
        color: "#4db6ac",
        genPasswd: (len: number) => (generatePassword(len, false, /[\w\d?-]/))
    }

export const saveUser = (userInfo: object, showLabel: any) => {
    showLabel({content: "a", success: false});
}

export const checkRussian = (str: string): boolean => {
    return /^[а-яА-ЯЁё]+$/.test(str);
}

export const isValid = (userValid: {}): boolean => {
    let isFormValid = true;
    Object.keys(userValid).forEach((key) => {
        if (userValid[key].msg !== "") {
            isFormValid = false;
            return false;
        }
    })
    return isFormValid;
}

export const notEmpty = (user: {}, canBeEmpty?: Array<string>): boolean => {
    let noEmptyFields = true;
    Object.keys(user).forEach((key) => {
        const field = user[key].toString();
        if (field === "" || field === "NaN") {
            if (canBeEmpty?.includes(key)) {
            } else {
                console.log(key)
                noEmptyFields = false;
                return false;
            }

        }
    })
    return noEmptyFields;
}