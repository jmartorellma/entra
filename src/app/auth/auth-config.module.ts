import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, OidcConfigService } from 'angular-auth-oidc-client';
import { AppConfiguration } from 'read-appsettings-json';
import { CustomStorage } from './customStorage';

export function configureAuth(oidcConfigService: OidcConfigService): () => Promise<any> {
    return () =>
    oidcConfigService.withConfig({            
        stsServer: AppConfiguration.Setting().identityEndpoint,
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin + '/accounts/logout',
        clientId: 'angular-client-entra-app',
        scope: 'openid profile offline_access api_entra',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 30,
        storage: localStorage,
        secureRoutes: [
            `${AppConfiguration.Setting().apiEndpoint}/Users`,
            `${AppConfiguration.Setting().apiEndpoint}/Shop`,
        ]
    });
}

@NgModule({
    imports: [AuthModule.forRoot()], //{ storage: CustomStorage }
    exports: [AuthModule],
    providers: [
        OidcConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: configureAuth,
            deps: [OidcConfigService],
            multi: true,
        },
    ],
})
export class AuthConfigModule {}
