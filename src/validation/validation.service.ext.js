import {ValidationService} from './validation.service';

/**
 * # The validator service ext
 *
 * This Class extends the validation.service
 * configuring the validators and a validationResolver. A config can look like this:
 *

 */
export class ValidationServiceExt extends ValidationService {

    /**
     * @param {Object} config
     * @param {Object} validationResolver
     * @param {Object} cache
     * @throws {TypeError}
     * @constructor
     */
    constructor( config, validationResolver, cache ) {
        super( config, validationResolver, cache );
    }

    /**
     * Set config
     *
     * @param {Object} config
     */
    setConfig( config ) {
        this.config = config;
    }


    /**
     * Set one value
     *
     * @param {Object} field
     */
    setValue( field ) {
        var name = field.name;
        var value = field.getAttribute( 'type' ) === 'checkbox' ? ( field.checked ? true : false ) : field.value;
        // console.log( typeof field , name, value );
        super.setValue( name, value );
    }



}
