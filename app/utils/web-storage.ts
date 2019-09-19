import { User } from '../models/user/user';

export class WebStorage {
    public static getUser(): User {
        let obj = JSON.parse(sessionStorage.getItem("user"));
        if (obj) {
            return new User().fromJSON(obj);
        }
        else {
            return obj;
        }
    }
    public static setUser(_user: User) {
        sessionStorage.setItem("user", JSON.stringify(_user));
    }
    public static deleteUser() {
        sessionStorage.removeItem("user");
    }
    public static setToken(_token: string) {
        sessionStorage.setItem("token", _token);
    }
    public static getToken(): string {
        return sessionStorage.getItem("token");
    }
    public static deleteToken() {
        sessionStorage.removeItem("token");
    }
}