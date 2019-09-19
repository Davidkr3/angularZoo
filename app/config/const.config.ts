export class ConstConfig {
    public static get API_ENDPOINT(): string { return 'http://127.0.0.1:8000'; }
    public static get API_ENDPOINT_LOGIN(): string { return 'http://127.0.0.1:8000'; }
    // public static get API_ENDPOINT(): string { return 'http://192.168.2.39:8080/alfresco/s/pac/api'; }    
    // public static get API_ENDPOINT_LOGIN(): string { return 'http://192.168.2.39:8080/alfresco/s/api'; }


    public static get DEFAULT_LANG(): string { return 'en'; }
    public static get AVAILABLE_LANGS(): string[] { return ["ca", /*"es",*/ "en"]; } //TODO: uncomment
    public static get GUEST_USER(): string { return 'pacguest'; }
    public static get GUEST_PASSWD(): string { return 'pacguest'; }
    public static get SESSION_EXPIRATION_STATUS(): string { return 'Unauthorized'; }
    public static get ZOO_CLUB(): string { return 'http://www.zoobarcelona.cat/ca/collabora/zoo-club'; } //zooclub    
    public static get BARCELONA_CAT(): string { return 'http://www.barcelona.cat'; } //barcelona.cat    
    public static get WEATHER_WIDGET(): string { return 'http://www.aemet.es/'; } //weather from aemet    
    //for languange management
    public static get WEATHER_WIDGET2(): string { return '/eltiempo/prediccion/municipios/launchwidget/barcelona-id08019.js?w=g4p01110001ohmffffffw662z182x000000t999999r1s6n2'; }
}