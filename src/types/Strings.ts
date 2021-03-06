import {Props} from "../types/Objects";
import {has} from "../util/Functions";

/**
 * A class which provides some operations on String
 * @export
 * @class Strings
 */
export default class Strings {

    /**
     * Checks the given array is exist or not or index is exist or not.
     * @param src {string}
     * @param index? { number }
     * @return {boolean}
     */
    public static has(src: string, index?: number): boolean {
        if (!has(src)) {
            return false;
        }
        const source = Strings.trim(src);
        return ((has(index) && source.length > index) || source.length > 0);
    }

    /**
     * Gets length of the given value {string}.
     * @param value
     * @returns {number}
     */
    public static getLength(value: string): number {
        return Strings.has(value) ? value.length : 0;
    }

    /**
     * Returns toString of the given value {string}
     * @param value
     * @return {any}
     */
    public static toString(value: string): string {
        if (value === null || value === undefined) {
            return "";
        }
        return value.toString();
    }

    /**
     * Returns toString of the given value {string}
     * Determines whether a string begins with the characters of another string, returning true or false as appropriate.
     * @param value
     * @param searchString
     * @param position
     * @return {boolean}
     */
    public static startsWith(value: string, searchString: string, position?: number): boolean {
        if (!value || !searchString || value.length < searchString.length) {
            return false;
        }
        return value.substr(position || 0, searchString.length) === searchString;
    }

    /**
     * Determines whether a string ends with the characters of another string, returning true or false as appropriate.
     * @param value
     * @param searchString
     * @param position
     * @return {boolean}
     */
    public static endsWith(value: string, searchString: string, position?: number): boolean {
        if (!value || !searchString || value.length < searchString.length) {
            return false;
        }
        return value.substring((position || value.length) - searchString.length, position) === searchString;
    }

    /**
     * Trims space from both side of the given value {string}
     * @param value
     * @return {string}
     */
    public static trim(value: string) {
        if (!value) {
            return "";
        }
        return value.replace(/^\s+|\s+$/g, "");
    }

    /**
     * Trims space from left side of the given value {string}
     * @param value
     * @return {string}
     */
    public static lTrim(value: string) {
        if (!has(value)) {
            return "";
        }
        return value.replace(/^\s+/, "");
    }

    /**
     * Trims space from right side of the given value {string}
     * @param value
     * @return {string}
     */
    public static rTrim(value: string) {
        if (!has(value)) {
            return "";
        }
        return value.replace(/\s+$/, "");
    }

    /**
     * Changes first character as uppercase character of the given value {string}
     * @param value {string}
     * @return {string}
     */
    public static capitalizeFirstLetter(value: string): string {
        if (!has(value)) {
            return "";
        }
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    /**
     * Puts the given pad {string} by (the given value minus the given length) from left side of the given value {string}
     * @param value {string}
     * @param pad {string}
     * @param length {number}
     * @return {string}
     */
    public static lPad(value: string, pad: string, length: number) {
        let val = Strings.has(value) ? value : "";
        while (val.length < length) {
            val = pad + val;
        }
        return val;
    }

    /**
     * Puts the given pad {string} by (the given value minus the given length) from right side of the given value {string}
     * @param value {string}
     * @param pad {string}
     * @param length {number}
     * @return {string}
     */
    public static rPad(value: string, pad: string, length: number) {
        let val = Strings.has(value) ? value : "";
        while (val.length < length) {
            val = val + pad;
        }
        return val;
    }

    /**
     * Splits the given value {string} by the given length as equals parts.
     * @param value
     * @param length
     * @return {any}
     */
    public static partsByNumber(value: string, length: number): string[] {
        if (!Strings.has(value)) {
            return [];
        }
        if (value.length < length) {
            return [value];
        }
        const values = [];
        let start = 0;
        while (start < value.length) {
            values.push(value.substring(start, start + length));
            start = start + length;
        }
        return values;
    }

    /**
     *
     * @param value
     * @param search
     * @param replacement
     * @return {string}
     */
    public static replaceAll(value: string, search: string, replacement: string) {
        if (!has(value)) {
            return value;
        }
        return value.split(search).join(replacement);
    }

    /**
     * reverse string
     * @param value
     * @return {string}
     */
    public static reverse(value: string): string {
        return value ? value.split("").reverse().join("") : value;
    }

    /**
     * Provides to navigate in the given Object and can broken if return false from callback function.
     * @param value
     * @param callback
     * @return {boolean}
     */
    public static forEach(value: string, callback: (c: string, index?: number) => boolean | void): boolean {
        for (let i = 0; i < value.length; i++) {
            if (callback(value.charAt(i), i) === false) {
                break;
            }
        }
        return true;
    }

    /**
     *
     * @param {string} msg
     * @param {Props} params
     * @returns {any}
     */
    public static template<P extends Props>(msg: string, params: P) {
        if (!Strings.has(msg)) {
            return "";
        }

        if (!has(params)) {
            return msg;
        }

        return msg.replace(/\${(.*?)}/g, (_, code) => {
            const scoped = code.replace(/(["'\.\w\$]+)/g, (match: any) => /["']/.test(match[0]) ? match : "scope." + match);
            try {
                return new Function("scope", "return " + scoped)(params);
            } catch (e) {
                return "";
            }
        });
    }
}
