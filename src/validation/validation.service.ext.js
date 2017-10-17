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
     * Set one value by field
     *
     * @param {Object} field
     */
    setValueByField( field ) {
        if ( !( field instanceof HTMLInputElement ||
            field instanceof HTMLSelectElement ||
            field instanceof HTMLTextAreaElement )
        ) {
            throw new TypeError( 'The field parameter must be instance of ' +
                'HTMLInputElement, HTMLSelectElement or  HTMLTextAreaElement' );
        }
        var name = field.name;
        var value = field.getAttribute( 'type' ) === 'checkbox' ? ( field.checked ? true : false ) : field.value;
        super.setValue( name, value );
    }

}
