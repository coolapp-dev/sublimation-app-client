import Keycloak from 'keycloak-js'
import type { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js'


function getRandomInt(min:number=1000, max:number=9999) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

class ApiClientAuthentification {
    readonly #inst_id:number
    #keycloak = {} as Keycloak
    #_authentificated = false
    loading:boolean = false

    constructor(
        // initOptions?: KeycloakInitOptions,
        // config?: string | KeycloakConfig | undefined
    ){
       
        //this.initKeycloak(initOptions,config)
        this.#inst_id = getRandomInt()
        this.loading = true
        console.log(`[1.0.10] new ApiClientAuthentification initialized: ${this.#inst_id}`)
    }

    get authenticated(){
        return !!this.#keycloak.authenticated
    }

    set authenticated(value:boolean){
        throw new Error("Property not accessible")
    }


    get kc(){
        return this.#keycloak
    }

    get token(){
        return this.#keycloak.token
    }


    initKeycloak( 
            initOptions: KeycloakInitOptions = {},
            config?: string | KeycloakConfig | undefined
        ){
        const _keycloak = new Keycloak(config)
    
        _keycloak
          .init(initOptions)
          .then( (authenticated)=> {
            console.log('[initKeycloak] success', authenticated)
            this.#_authentificated = authenticated
          })
          .catch( ()=> {
           
            this.#_authentificated = false
            console.log(`[initKeycloak:${this.#inst_id}] failed to initialize`)
            // setAuthenticated(false)
          }).finally(()=>{
            console.log(`initKeycloak: ${this.#inst_id }] loading false`,{authenticated: this.#_authentificated } )
            this.loading = false
          })
    
        

    
        _keycloak.onReady = (authenticated) => {
          console.log('[keycloak.onReady]', authenticated)
          // setLoginInProgress(false)
        }
    
        _keycloak.onAuthSuccess = () => {
          console.log('[keycloak.onAuthSuccess]')
        }
    
        _keycloak.onAuthError = () => {
          console.log('[keycloak.onAuthError]')
        }
    
        _keycloak.onAuthRefreshSuccess = () => {
          console.log('[keycloak.onAuthRefreshSuccess]')
        }
    
        _keycloak.onAuthRefreshError = () => {
          console.log('[keycloak.onAuthRefreshError]')
        }
        _keycloak.onAuthLogout = () => {
          console.log('[keycloak.onAuthLogout]')
        }
        _keycloak.onTokenExpired = () => {
          console.log('[keycloak.onTokenExpired]')
        }
          
        this.#keycloak = _keycloak;
        
      }
}



class ApiClient {
    private account: ApiClientAuthentification;


    constructor() {
        this.account = new ApiClientAuthentification()
        
    }

    get kc(){
        return this.account.kc
    }

    async login(
        initOptions: KeycloakInitOptions = {},
        config?: string | KeycloakConfig | undefined
    ): Promise<any> {
        this.account.initKeycloak(initOptions, config) 

        

        return new Promise<any>((resolve)=>{
            this.account.kc.onReady = (authenticated) => {
                console.log('[ApiClient][keycloak.onReady]', authenticated)

                resolve({authenticated})
            }
    
        })
    }

}


export { ApiClient, ApiClientAuthentification };