import {Environment} from '../environment/environment';
import {StringUtils} from './stringUtils';
//import {LangService} from "./lang.service";

export class Api {

  /**
   * Cache instance name for api
   */
  private cacheName: string = 'api-cache';

  /**
   * Cache instance for liferay
   */
  private cache: any;

  /** @ngInject */
  constructor(private $http: angular.IHttpService,
              private $q: angular.IQService,
              private CacheFactory: any,
              //private LangService: LangService,
              private environment: Environment,
              private StringUtils: StringUtils) {
    // creates cache instance
    if (!CacheFactory.get(this.cacheName)) {
      CacheFactory.createCache(this.cacheName, {
        maxAge: 60 * 60 * 1000, // items added to this cache expire after 60 minutes
        cacheFlushInterval: 180 * 60 * 1000, // this cache will clear itself every 3 hours
        deleteOnExpire: 'aggressive' // i tems will be deleted from this cache when they expire
      });
    }
    // initializes cache attribute for future use
    this.cache = CacheFactory.get(this.cacheName);
  }

  public get<T>(url: string, params: any,
                showGlobalSpinner?: boolean, cacheEnabled?: boolean,
                unescapeResponse?: boolean, unescapeFields?: string[]) {

    var deferred = this.$q.defer();
    var sgs: boolean = showGlobalSpinner || false;
    var cache: boolean = cacheEnabled || false;

    // http request config
    var config: ApiRequestConfig = {
      method: 'GET',
      url: this.environment.api + ':' + this.environment.port + this.environment.path + url,
      headers: {
        'Content-Type': 'application/json',
        'currentLang': 'es' //this.LangService.getLanguage()
      },
      params: params,
      timeout: this.environment.timeout,
      showGlobalSpinner: sgs,
      cache: false
    };

    if (cache === true) {
      config.cache = this.cache;
    }

    this.$http(config).then((response: T) => {
      var resp: T = unescapeResponse === true ?
        this.StringUtils.unescapeJsonResponse(response, unescapeFields) : response;
      deferred.resolve(resp);
    }, (reason: any) => {
      deferred.reject(reason);
    });

    return deferred.promise;
  }

  public post(url: string, data: any, showGlobalSpinner?: boolean,
              unescapeResponse?: boolean, unescapeFields?: string[]) {
    var deferred = this.$q.defer();
    var sgs: boolean = showGlobalSpinner || false;
    var config: ApiRequestConfig = {
      method: 'POST',
      url: /*this.environment.api + ':' + this.environment.port + this.environment.path + */url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
      timeout: this.environment.timeout,
      showGlobalSpinner: sgs
    };

    this.$http(config).then((response: any) => {
      var resp = unescapeResponse === true ?
        this.StringUtils.unescapeJsonResponse(response, unescapeFields) : response;
      deferred.resolve(resp);
    }, (reason: any) => {
      deferred.reject(reason);
    });
    return deferred.promise;
  }

  public put<T>(url: string, data: any, showGlobalSpinner?: boolean,
                unescapeResponse?: boolean, unescapeFields?: string[]) {
    var deferred = this.$q.defer();
    var sgs: boolean = showGlobalSpinner || false;
    var config: ApiRequestConfig = {
      method: 'PUT',
      url: this.environment.api + ':' + this.environment.port + this.environment.path + url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
      timeout: this.environment.timeout,
      showGlobalSpinner: sgs
    };

    this.$http(config).then((response: T) => {
      var resp = unescapeResponse === true ?
        this.StringUtils.unescapeJsonResponse(response, unescapeFields) : response;
      deferred.resolve(resp);
    }, (reason: any) => {
      deferred.reject(reason);
    });
    return deferred.promise;
  }

  public delete<T>(url: string, data: any, showGlobalSpinner?: boolean,
                   unescapeResponse?: boolean, unescapeFields?: string[]) {
    var deferred = this.$q.defer();
    var sgs: boolean = showGlobalSpinner || false;
    var config: ApiRequestConfig = {
      method: 'DELETE',
      url: this.environment.api + ':' + this.environment.port + this.environment.path + url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
      timeout: this.environment.timeout,
      showGlobalSpinner: sgs
    };

    this.$http(config).then((response: T) => {
      var resp = unescapeResponse === true ?
        this.StringUtils.unescapeJsonResponse(response, unescapeFields) : response;
      deferred.resolve(resp);
    }, (reason: any) => {
      deferred.reject(reason);
    });
    return deferred.promise;
  }
}

interface ApiRequestConfig extends ng.IRequestConfig {
  showGlobalSpinner: boolean;
}
