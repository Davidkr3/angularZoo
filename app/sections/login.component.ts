import { Component } from '@angular/core';
import { WebStorage } from '../utils/web-storage';
import { UserService } from '../services/user.service';
import { Login } from '../models/user/login';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { Exception } from '../models/base/exception';
import { Const } from '../utils/const';
import { SectionsSharedData } from '../models/base/sections-shared-data';
import { BaseSection } from './base-section';
import { TranslateService } from 'ng2-translate';
import { SharedServices } from '../models/base/shared-services';

@Component({
    templateUrl: `view/html/sections/login.component.html`,
    styleUrls: ['view/css/sections/login.component.css'],
    providers: [UserService]
})
export class LoginComponent extends BaseSection {
    //for http request errors
    private errMsg: string = '';
    private email: string = '';
    private passwd: string = '';
    private emptyEmail: boolean = false;
    private emptyPasswd: boolean = false;

    constructor(private userService: UserService, private router: Router, protected sharedData: SectionsSharedData,
        protected translate: TranslateService, protected sharedServices: SharedServices) {
        super(translate, sharedData, sharedServices);
        //each time we access to the view, context is setted
        this.sharedData.setContext(this);
    }

    private onKey(event: KeyboardEvent) {
        this.errMsg = '';
        if (this.validateForm()) {
            if (event.keyCode === 13) { //enter
                this.login();
            }
        }
    }

    private validateForm(): boolean {
        if (this.email) {
            this.emptyEmail = false;
        }
        if (this.passwd) {
            this.emptyPasswd = false;
        }
        if (!this.emptyEmail && !this.emptyPasswd) {
            return true;
        }
        else {
            return false;
        }
    }

    private login() {
        if (!this.email) {
            this.emptyEmail = true;
            return;
        }
        if (!this.passwd) {
            this.emptyPasswd = true;
            return;
        }

        let self = this;
        let login: Login = new Login(this.email, this.passwd);
        let loginPromise: Promise<string> = this.userService.login(login);
        loginPromise
            .then(function (_alfrescoObject: Object) {
                let token: string = _alfrescoObject["data"]["ticket"];
                WebStorage.setToken(token);

                let userPromise = self.userService.getUser(self.translate.currentLang);
                ///
                userPromise //get logged user
                    .then(function (_user: User) {

                        //TODO: remove
                        //_user.role.push(Const.roleDictionary.SUPER_ADMIN_WRITER);

                        //session storage
                        WebStorage.setUser(_user);
                        self.router.navigate(['main']);
                    });
            })
            .catch(function (error: Exception) {
                //display login error meesage
                if (error.msg) {
                    //self.errMsg = error.msg;
                    self.errMsg = self.translate.get('login.error')['value'];
                }
            });
    }

}