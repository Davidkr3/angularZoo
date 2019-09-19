export class User {
    constructor(_user: User = undefined) {
        if (_user) {
            this.user = _user.user;
            this.email = _user.email;
            this.name = _user.name;
            this.surname = _user.surname;
        }
    }
    user: number;
    email: string;
    name: string;
    surname: string;
    role: string[];

    public get fullName(): string {
        return this.name + ' ' + this.surname;
    }

    public fromJSON(u: User) {
        Object.assign(this, u);
        return this;
    }

}
