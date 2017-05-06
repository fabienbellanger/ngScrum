import { Injectable } from '@angular/core';
/**
 * Classe qui gère les évènements liés à l'afficheur client
 *
 * @author Guillaume Moreau
 */
@Injectable()
export class Rc4Service
{

    private rc4Key: string;

    constructor()
    {
        this.rc4Key = 'N8R9342NR09D320ND203JRT490';
    }

    /**
     * Méthode interne qui encrype/decrypte en rc4
     *
     * @author Guillaume Moreau
     * @param (string)  key    Clef pour crypter/décrypter
     * @param (string)  pt     Valeur à crypter/décrypter
     */
    private rc4(pt: string): string
    {
        let s: Array<any> = [];
        for (let i: number = 0; i < 256; i++)
        {
            s[i] = i;
        }

        let j: number = 0;
        let x: any;
        for (let i: number = 0; i < 256; i++)
        {
            j    = (j + s[i] + this.rc4Key.charCodeAt(i % this.rc4Key.length)) % 256;
            x    = s[i];
            s[i] = s[j];
            s[j] = x;
        }

        let i: number  = 0;
        j              = 0;
        let ct: string = '';
        for (let y: number = 0; y < pt.length; y++)
        {
            i    = (i + 1) % 256;
            j    = (j + s[i]) % 256;
            x    = s[i];
            s[i] = s[j];
            s[j] = x;
            ct += String.fromCharCode(pt.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
        }
        return ct;
    }



    /**
     * Retourne la valeur héxadécimale rc4 de la chaine passée en paramètre
     *
     * @author Guillaume Moreau
     * @param (string)  pt     Valeur à crypter
     */
    public rc4Encrypt(ct: string): string
    {
        return this.hexEncode(this.rc4(ct.toString()));
    }

    /**
     * Décrypte la valeur rc4 hexadécimale passée en paramètre
     *
     * @author Guillaume Moreau
     * @param (string)  key    Clef pour décrypter
     * @param (string)  pt     Valeur à décrypter
     */
    public rc4Decrypt(ct: string): string
    {
        return this.rc4(this.hexDecode(ct));
    }

    /**
     * Méthode interne d'encodage en héxadécimal
     *
     * @author Guillaume Moreau
     * @param (string)  data     Valeur à encoder
     */
    private hexEncode(data: string): string
    {
        let b16Digits: string  = '0123456789abcdef';
        let b16Map: Array<any> = [];
        for (let i: number = 0; i < 256; i++)
        {
            b16Map[i] = b16Digits.charAt(i >> 4) + b16Digits.charAt(i & 15);
        }

        var result: Array<any> = [];
        for (let i: number = 0; i < data.length; i++)
        {
            result[i] = b16Map[data.charCodeAt(i)];
        }

        return result.join('');
    }

    /**
     * Méthode interne de décodade en héxadécimal
     *
     * @author Guillaume Moreau
     * @param (string)  data     Valeur à décodade
     */
    private hexDecode(data: string): string
    {
        let b16Digits: string  = '0123456789abcdef';
        let b16Map: Array<any> = [];
        for (let i: number = 0; i < 256; i++)
        {
            b16Map[b16Digits.charAt(i >> 4) + b16Digits.charAt(i & 15)] = String.fromCharCode(i);
        }
        if (!data.match(/^[a-f0-9]*$/i))
        {
            return ''; // return '' if input data is not a valid Hex string
        }
        if (data.length % 2)
        {
            data = '0' + data;
        }
        let result: Array<any> = [];
        let j: number          = 0;
        for (let i: number = 0; i < data.length; i += 2)
        {
            result[j++] = b16Map[data.substr(i, 2)];
        }

        return result.join('');
    }
}
