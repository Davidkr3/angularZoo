/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    System.config({
        paths: {
            // paths serve as alias
            //LOCAL
            'npm:': 'node_modules/'
                //'npm:': 'https://unpkg.com/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'build/app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'ng2-translate': 'npm:ng2-translate/bundles/ng2-translate.umd.js',
            //calendar
            'jquery': 'lib/fullcalendar-3.1.0/lib/jquery.min.js',
            'fullcalendar': 'lib/fullcalendar-3.1.0/fullcalendar.min.js',
            'locale-all': 'lib/fullcalendar-3.1.0/locale-all.js',
            'moment': 'lib/fullcalendar-3.1.0/lib/moment.min.js',
            /////////////////
            'jqueryui': 'lib/datepicker/jquery-ui.min.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            //APP BINDING with html
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'ng2-translate': {
                defaultExtension: 'js'
            }
        }
    });
})(this);