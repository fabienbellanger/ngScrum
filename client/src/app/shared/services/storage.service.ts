import { Injectable } from '@angular/core';
import { Rc4Service } from './rc4.service';
import { environment } from '../../../environments/environment';

/**
 * Sessions locales
 *
 * @author Fabien Bellanger
 */
@Injectable()
export class StorageService
{
    /*
     |----------------------------------------------------------------------------
     | Variables
     |----------------------------------------------------------------------------
     */
    // TODO: Faire une fonction de recherche
    private encrypt: boolean;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param (Rc4Service)  rc4Service
     */
    constructor(private rc4Service: Rc4Service)
    {
        this.encrypt = environment.production;
    }

    /**
     * Retourne la valeur associée à la clé
     *
     * @author Fabien Bellanger
     * @param (string)  type            local => localStorage | session => sessionStorage
     * @param (string)  key             Clé
     * @param (any)     defaultValue    Valeur par défaut si l'entrée n'existe pas
     * @return (any) Valeur
     */
    public get(type: string, key: string, defaultValue?: any): any
    {
        let val: any;

        if (this.encrypt)
        {
            key = this.rc4Service.rc4Encrypt(key);
        }

        if (type === 'session')
        {
            val = sessionStorage.getItem(key);
        }
        else
        {
            val = localStorage.getItem(key);
        }

        if (val !== null && val !== '' && val !== 'undefined')
        {
            if (this.encrypt)
            {
                return JSON.parse(this.rc4Service.rc4Decrypt(val));
            }
            else
            {
                return JSON.parse(val);
            }
        }
        else if (typeof defaultValue !== 'undefined')
        {
            return defaultValue;
        }
        else
        {
            return null;
        }
    }

    /**
     * Met à jour / crée la valeur pour la clé donnée
     *
     * @author Fabien Bellanger
     * @param (string)  type    local => localStorage | session => sessionStorage
     * @param (string)  key     Clé
     * @param (any)     data    Valeur
     */
    public set(type: string, key: string, data: any): void
    {
        if (this.encrypt)
        {
            key  = this.rc4Service.rc4Encrypt(key);
            data = this.rc4Service.rc4Encrypt(JSON.stringify(data));
        }
        else
        {
            data = JSON.stringify(data);
        }

        if (type === 'session')
        {
            sessionStorage.setItem(key, data);
        }
        else
        {
            localStorage.setItem(key, data);
        }
    }

    /**
     * Supprime toutes les données
     *
     * @author Fabien Bellanger
     * @param (string)  type    local => localStorage | session => sessionStorage
     */
    public clear(type: string): void
    {
        if (type === 'session')
        {
            return sessionStorage.clear();
        }
        else
        {
            return localStorage.clear();
        }
    }

    /**
     * Supprime la valeur associée à la clé
     *
     * @author Fabien Bellanger
     * @param (string)  type    local => localStorage | session => sessionStorage
     * @param (string)  key     Clé
     */
    public remove(type: string, key: string): void
    {
        if (this.encrypt)
        {
            key = this.rc4Service.rc4Encrypt(key);
        }

        if (type === 'session')
        {
            sessionStorage.removeItem(key);
        }
        else
        {
            localStorage.removeItem(key);
        }
    }
}
