/**
 * The behaviour function provides cases for to trigger validations
 */

export default function behaviour() {
    var fields = this.getValidationFields();
    Array.prototype.forEach.call( fields, function( field ) {
        var type = field.getAttribute( 'type' );
        var tagName = field.tagName.toLowerCase();
        var eventName = type !== 'checkbox' && type !== 'radio' && tagName !== 'select' ? 'blur' : 'change';

        field.removeEventListener( eventName, this.handler[ field.id ] );

        var handler = function() {
            var fieldIdentifier = field.id;
            this.validation.setValueByField( field );
            this.validation.validate( fieldIdentifier, this.options.formId ).catch( function() {} );
            if ( this.configFields[ fieldIdentifier ].groupSel !== null ) {
                fields = document.querySelectorAll( this.configFields[ fieldIdentifier ].groupSel );
                Array.prototype.forEach.call( fields, function( field ) {
                    var fieldIdentifierGroupMember = this.validation.getIdentifier( field );
                    if ( fieldIdentifierGroupMember !== fieldIdentifier ) {
                        this.validation.setValueByField( field );
                        this.validation.validate( fieldIdentifierGroupMember, this.options.formId ).catch( function() {} );
                    }
                }.bind( this ) );
            }
        }.bind( this );

        this.handler[ field.id ] = handler;
        field.addEventListener( eventName,  handler );
    }.bind( this ) );
}

