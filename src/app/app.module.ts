/// <reference path="../../typings/index.d.ts" />

import { environment } from 'environment';
import common from 'common/common.module';
import login_module from 'login_module/login.module';
import register_offerent_module from 'register_offerent_module/register_offerent.module';
import register_candidate_module from 'register_candidate_module/register_candidate.module';
import register_redirect_module from 'register_redirect_module/register_redirect.module';
import offert_module from 'offert_module/offert.module';
import home_module from 'home/home.module';
import postulation_module from 'postulation_module/postulation.module';

import { config } from './app.config'
import { unsecuredRoutes } from 'common/environment/unsecuredRoutes';
import routes from './app.routes';
import translate from './app.translate';
import forms from './app.forms';
import run from './app.run';

angular.module('app', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngMessages',
  'ngSanitize', 'ngAria', 'angular-cache', 'angularPromiseButtons',
  'toastr', 'pascalprecht.translate', 'ui.router', 'ngFabForm', 'rx', 'ngStorage', 'angular-jwt', 'ngTable',
  common.name, login_module.name, register_offerent_module.name, home_module.name, register_redirect_module.name,
  register_candidate_module.name, offert_module.name, postulation_module.name])
  .constant('environment', environment)
  .constant('moment', moment)
  .constant('unsecuredRoutes', unsecuredRoutes)
  .config(config)
  .config(translate)
  .config(routes)
  .config(forms)
  .run(run);