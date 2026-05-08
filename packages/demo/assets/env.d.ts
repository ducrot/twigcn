/// <reference types="vite/client" />
/// <reference types="vite-plugin-symfony/stimulus/env" />

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DDEV_PRIMARY_URL?: string;
        }
    }
}

export {}
