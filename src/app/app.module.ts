/// <reference path="../../typings/index.d.ts" />

import { environment } from 'environment';
import common from 'common/common.module';
import login_module from 'login_module/login.module';
import register_module from 'register_module/register.module';
import home_module from 'home/home.module';

import {config} from './app.config'
import {unsecuredRoutes} from 'common/environment/unsecuredRoutes';
import routes from './app.routes';
import translate from './app.translate';
import forms from './app.forms';
import run from './app.run';

angular.module('app', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngMessages',
    'ngSanitize', 'ngAria', 'angular-cache', 'angularPromiseButtons',
    'toastr', 'pascalprecht.translate', 'ui.router', 'ngFabForm', 'rx','ngTable','ngStorage', 'mwl.confirm','ngMaterial',
    common.name, login_module.name, register_module.name,home_module.name])
  .constant('environment', environment)
  .constant('moment', moment)
  .constant('unsecuredRoutes', unsecuredRoutes)
  .config(config)
  .config(translate)
  .config(routes)
  .config(forms)
  .run(run);