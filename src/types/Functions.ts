import {has} from "../util/Functions";
import Validations from "../util/Validations";

export default class Functions {
    /**
     * Checks the given function is exist or not.
     * @param fn {any}
     * @return {boolean}
     */
    static has(fn: any): boolean {
        return has(fn);
    }
    /**
     * Checks the given value is a function or not
     * @param fn
     * @return {boolean}
     */
    static is(fn: any) {
        return Validations.isFunction(fn);
    }

    /**
     * Checks the given function name
     * @param fn
     */
    static getName(fn: any) {
        return fn.name;
    }
}

