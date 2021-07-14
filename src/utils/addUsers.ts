import {makePost} from "@utils/network";
import {DOMAIN} from "@config/urls";

export const addUsers = () => {
    const users = [
        // {
        //     "role": "student",
        //     "email": "g@g.ru",
        //     "name": "guest",
        //     "surname": "guest",
        //     "patronymic": "guest",
        //     "password": "guest",
        //     "group": "IU10-11"
        // },
        {
            "role": "admin",
            "email": "a@a.ru",
            "name": "admin",
            "surname": "admin",
            "patronymic": "admin",
            "password": "admin",
            "phone":"8 (800) 555-35-35"
        },
        {
            "role": "student",
            "email": "s@s.ru",
            "name": "vasya",
            "surname": "pupkin",
            "patronymic": "alexandrovich",
            "password": "student",
            "group": "IU10-83"
        }
    ]
    users.forEach((u) => {
        makePost(`${DOMAIN}users`, u);
    })
    //makePost("http://localhost:8080/api/v1/users/create", )
}