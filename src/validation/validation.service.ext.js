import {ValidationService} from './validation.service';

/**
 * # The validator service ext
 *
 * This Class extends the validation.service
 * configuring the validators and a validationResolver. A config can look like this:
 *
 * @extends ValidationService
 */
export class ValidationServiceExt extends ValidationService {

    /**
     * @param {Object} config
     * @param {Object} validationResolver
     * @param {Object} cache
     * @param {Boolean} stopValidationOnFirstFail
     * @throws {TypeError}
     * @constructor
     */
    constructor( config, validationResolver, cache, stopValidationOnFirstFail ) {
        super( config, validationResolver, cache, stopValidationOnFirstFail );
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
        var name = field.id;
        var attr = field.getAttribute( 'type' );
        var value = attr === 'checkbox' || attr === 'radio' ? ( field.checked ? true : false ) : field.value;
        /**
         * {@link setValue}
         */
        super.setValue( name, value );
    }


}
