import { ValidationService } from '../../src/validation/validation.service';

describe( 'Validation Service', function() {

    var cacheMock = {
        getValue: function() {
            return false;
        },
        setValue: function() {}
    };

    var invalidConfigValues = [
        { value: 'string', name: 'String' },
        { value: undefined, name: 'undefined' },
        { value: [], name: 'Array' },
        { value: 5, name: 'Number' }
    ];

    invalidConfigValues.forEach( function( config ) {
        it( 'should throw a type error when config is given ' + config.name, function() {
            var validationResolver = { getValidator: function() {} };
            expect( function() {
                new ValidationService( config.value, validationResolver, cacheMock );
            } ).toThrowError( TypeError );
        } );
    } );

    it(
        'should throw an error when the validation resolver does not implement the getValidator method',
        function() {
            var validationResolver = { getValidator: 'foobar' };
            expect( function() {
                new ValidationService( {}, validationResolver, cacheMock );
            } ).toThrowError( TypeError );
        } );

    it( 'should throw an error when the cache does not implement the getValue method', function() {
        var cacheMock = {
            setValue: function() {}
        };
        var validationResolver = { getValidator: 'foobar' };

        expect( function() {
            new ValidationService( {}, validationResolver, cacheMock );
        } ).toThrowError( TypeError );
    } );

    it( 'should throw an error when the cache does not implement the setValue method', function() {
        var cacheMock = {
            getValue: function() {}
        };
        var validationResolver = { getValidator: 'foobar' };

        expect(function() {
            new ValidationService( {}, validationResolver, cacheMock )
        }).toThrowError( TypeError );
    } );

    it( 'should save the config on construction', function() {
        var validationResolver = { getValidator: function() {} };
        var validationService = new ValidationService( {
            foo: {}
        }, validationResolver, cacheMock );

        expect( validationService.config ).toEqual( {
            foo: {}
        } );
    } );

    it( 'should have a function setValues() setting all values', function() {
        var validationResolver = { getValidator: function() {} };
        var validationService = new ValidationService( {}, validationResolver, cacheMock );

        validationService.setValues( {
            test: 'laberfoo'
        } );

        expect( validationService.getValues() ).toEqual( {
            test: 'laberfoo'
        } );
    } );

    it( 'should have a function setValue() setting a specific values', function() {
        var validationResolver = { getValidator: function() {} };
        var validationService = new ValidationService( {}, validationResolver, cacheMock );

        validationService.setValue( 'test', 'laberfoo' );

        expect( validationService.getValue( 'test' ) ).toEqual( 'laberfoo' );
    } );

    it( 'should validate one field with success', function( done ) {
        var spy = sinon.spy( cacheMock, 'setValue' );

        var validationResolver = { getValidator: function() {
            return new Promise( function( resolve ) {
                resolve( function( value, config, service ) {
                    expect( value ).toBe( 'test' );
                    expect( config ).toEqual( { message: 'Required field not set' } );
                    expect( service ).toBe( validationService );
                    return new Promise( function( resolve ) {
                        resolve( { isValid: true } );
                    } );
                } );
            } );
        } };
        var validationService = new ValidationService( {
            'fieldA': {
                'required': { message: 'Required field not set' }
            }
        }, validationResolver, cacheMock );

        validationService.setValue( 'fieldA', 'test' );
        validationService.validate( 'fieldA', 'test' ).then( function( result ) {
            spy.firstCall.calledWith( 'test.fieldA', {
                value: 'test',
                validators: {
                    'required': {
                        isValid: true
                    }
                }
            } );
            cacheMock.setValue.restore();
            expect( result ).toEqual( {
                isValid: true,
                results: {
                        required: { isValid: true }
                    }
            } );
            done();
        } ).catch( function() {
            fail();
            done();
        } );
    } );

    it( 'should validate one field with failure', function( done ) {
        var spy = sinon.spy( cacheMock, 'setValue' );

        var resolver = { getValidator: function() {} };
        var validationResolver = sinon.mock( resolver );
        var validationService = new ValidationService( {
            'fieldA': {
                'required': { message: 'Required field not set' },
                'email': { message: 'Not a valid email address' }
            }
        }, resolver, cacheMock );

        validationResolver.expects( 'getValidator' )
            .once()
            .withExactArgs( 'required' )
            .returns( new Promise( function( resolve ) {
                resolve( function() {
                    return new Promise( function( resolve ) {
                        resolve( { isValid: true } );
                    } );
                } );
            } ) );

        validationResolver.expects( 'getValidator' )
            .once()
            .withExactArgs( 'email' )
            .returns( new Promise( function( resolve ) {
                resolve( function( value, config ) {
                    return new Promise( function( resolve, reject ) {
                        reject( { isValid: false, message: config.message } );
                    } );
                } );
            } ) );

        validationService.setValue( 'fieldA', 'test' );
        validationService.validate( 'fieldA' ).then( function() {
            fail();
            done();
        } ).catch( function( result ) {
            spy.firstCall.calledWith( '.fieldA', {
                value: 'test',
                validators: {
                    'required': {
                        isValid: true
                    }
                }
            } );
            spy.secondCall.calledWith( '.fieldA', {
                value: 'test',
                validators: {
                    'required': {
                        isValid: true
                    },
                    'email': {
                        isValid: false,
                        message: 'Not a valid email address'
                    }
                }
            } );

            cacheMock.setValue.restore();
            expect( result ).toEqual( {
                isValid: false,
                results: {
                    required: { isValid: true },
                    email: { isValid: false, message: 'Not a valid email address' }
                }
            } );
            done();
        } );

        validationResolver.verify();
    } );

    it( 'should validate the form with success', function( done ) {
        var resolver = { getValidator: function() {} };
        var validationResolver = sinon.mock( resolver );
        var validationService = new ValidationService( {
            'fieldA': {
                'required': { message: 'Required field not set' },
                'email': { message: 'Not a valid email address' }
            },
            'fieldB': {
                'required': { message: 'Required field not set' }
            }
        }, resolver, cacheMock );

        validationResolver.expects( 'getValidator' )
            .twice()
            .withExactArgs( 'required' )
            .returns( new Promise( function( resolve ) {
                resolve( function() {
                    return new Promise( function( resolve ) {
                        resolve( { isValid: true } );
                    } );
                } );
            } ) );

        validationResolver.expects( 'getValidator' )
            .once()
            .withExactArgs( 'email' )
            .returns( new Promise( function( resolve ) {
                resolve( function() {
                    return new Promise( function( resolve ) {
                        resolve( { isValid: true } );
                    } );
                } );
            } ) );

        validationService.setValue( 'fieldA', 'test' );
        validationService.setValue( 'fieldB', 'lorem ipsum' );
        validationService.validateForm().then( function( result ) {
            expect( result ).toEqual( {
                isValid: true,
                results: {
                    'fieldA': {
                        isValid: true,
                        results: {
                            required: { isValid: true },
                            email: { isValid: true }
                        }
                    },
                    'fieldB': {
                        isValid: true,
                        results: {
                            required: { isValid: true }
                        }
                    }
                }
            } );
            done();
        } ).catch( function() {
            fail();
            done();
        } );
    } );

    it( 'should validate the form with failure', function( done ) {
        var resolver = { getValidator: function() {} };
        var validationResolver = sinon.mock( resolver );
        var validationService = new ValidationService( {
            'fieldA': {
                'required': { message: 'Required field not set' },
                'email': { message: 'Not a valid email address' }
            },
            'fieldB': {
                'required': { message: 'Field B is mendatory' }
            }
        }, resolver, cacheMock );

        validationResolver.expects( 'getValidator' )
            .twice()
            .withExactArgs( 'required' )
            .returns( new Promise( function( resolve ) {
                resolve( function( value, config ) {
                    return new Promise( function( resolve, reject ) {
                        if ( value === '' ) {
                            reject( {
                                isValid: false,
                                message: config.message
                            } );
                        } else {
                            resolve( { isValid: true } );
                        }
                    } );
                } );
            } ) );

        validationResolver.expects( 'getValidator' )
            .once()
            .withExactArgs( 'email' )
            .returns( new Promise( function( resolve ) {
                resolve( function() {
                    return new Promise( function( resolve ) {
                        resolve( { isValid: true } );
                    } );
                } );
            } ) );

        validationService.setValue( 'fieldA', 'test' );
        validationService.setValue( 'fieldB', '' );
        validationService.validateForm().then( function() {
            fail();
            done();
        } ).catch( function( result ) {
            expect( result ).toEqual( {
                isValid: false,
                results: {
                    'fieldA': {
                        isValid: true,
                        results: {
                            required: { isValid: true },
                            email: { isValid: true }
                        }
                    },
                    'fieldB': {
                        isValid: false,
                        results: {
                            required: {
                                isValid: false,
                                message: 'Field B is mendatory'
                            }
                        }
                    }
                }
            } );
            done();
        } );
    } );

    it( 'should succeed when getting a valid the value from cache', function( done ) {
        var cacheMock = {
            getValue: function() {
                return {
                    value: 'test',
                    results: {
                        required: {
                            isValid: true
                        }
                    }
                };
            },
            setValue: function() {}
        };

        var validationResolver = { getValidator: function() {
            fail();
            done();
        } };
        var validationService = new ValidationService( {
            'fieldA': {
                'required': { message: 'Required field not set' }
            }
        }, validationResolver, cacheMock );

        validationService.setValue( 'fieldA', 'test' );
        validationService.validate( 'fieldA', 'test' ).then( function( result ) {
            expect( result ).toEqual( {
                isValid: true,
                results: {
                    required: { isValid: true }
                }
            } );
            done();
        } ).catch( function() {
            fail();
            done();
        } );
    } );

    it( 'should fail when getting a invalid the value from cache', function( done ) {
        var cacheMock = {
            getValue: function( cacheKey ) {
                expect( cacheKey ).toBe( 'foo.fieldA' );
                return {
                    value: '',
                    results: {
                        required: {
                            isValid: false,
                            message: 'Required field not set'
                        }
                    }
                };
            },
            setValue: function() {}
        };

        var validationResolver = { getValidator: function() {
            fail();
            done();
        } };
        var validationService = new ValidationService( {
            'fieldA': {
                'required': { message: 'Required field not set' }
            }
        }, validationResolver, cacheMock );

        validationService.setValue( 'fieldA', '' );
        validationService.validate( 'fieldA', 'foo' ).then( function() {
            fail();
            done();
        } ).catch( function( result ) {
            expect( result ).toEqual( {
                isValid: false,
                results: {
                    required: {
                        isValid: false,
                        message: 'Required field not set'
                    }
                }
            } );
            done();
        } );
    } );

    it( 'should mark a field as valid when there is no validator configured', function( done ) {
        var validationResolver = { getValidator: function() {
            fail();
            done();
        } };

        var validationService = new ValidationService( {}, validationResolver, cacheMock );

        validationService.setValue( 'fieldA', 'test' );
        validationService.setValue( 'fieldA', '' );
        validationService.validate( 'fieldA', '' ).then( function( result ) {
            expect( result ).toEqual( {
                isValid: true
            } );
            done();
        } ).catch( function() {
            fail();
            done();
        } );
    } );
} );
