# denkstrap-validation-service

> denkwerk validation service

## There are three main classes which are ready to use

- ValidationService (the basic validation service class)
- ValidationServiceDom (extends ValidationService class and adds basic dom handling)
- FormValidation (a full customizable html configurable form validation adaption)

## Documentation

- The documentation can be found in "dist/esdoc", just download a release:<br>
 https://github.com/denkstrap/denkstrap-toolkit/releases
 <br>
and open index.html in the unzipped dist folder.
- Download the demo page (dist is needed although) to watch the demos

## Just want to use the form validation code?

Download formValidation.js, located in folder "dist/validation/" and embed it.<br>
Dist folder is shipped with each release:<br>
https://github.com/denkstrap/denkstrap-toolkit/releases<br>

Use "data-validation" attribute to define a validation field in the markup.<br>
The according form needs an id.
This id is the minimal option to give to the form validation class constructor.
Each field needs a specific id, too.<br>
Example:<br>

    <form id="form">
        <label for="name">Name</label>
        <input name="name" id="name" data-validation='{
        "validators": {
        "required": {"message": "Enter your name, please."}
        }
        }'>
        <button type="submit>Submit</button>
    </form>

    <script>
        var formValidation = new FormValidation( { formId: 'form'} );

        var form = document.getElementById( form );
        form.addEventListener( 'submit', function( event ) {
            event.preventDefault();
            validationService.validateForm().then( function( result ) {
               form.submit();
            } ).catch( function( result ) {
                console.log( '----->validateForm fail', result );
            } );
        } );
    </script>

You have to include the according polyfills in folder "demo/polyfills"
to make it running in all tested browsers (IE10, Android 5, Chrome, Safari, Firefox).

Have a look on the docs and demo page for further options and examples.


## Want to help developing the code?

### Requirements

There are a few prerequisites for this repository:

- [nvm](https://github.com/creationix/nvm) on Mac and Linux, [nvmw](https://github.com/hakobera/nvmw) or [nvm-windows](https://github.com/coreybutler/nvm-windows) on Windows
- As an alternative you have node.js version 6.0 as your systems default node.js version
  (Version 6.0 of node is necessary to run ESDoc.)

### Install with yarn

    yarn install

### Work on the sources

Sources are located here: "src/".
The code is written in ES6. It's transpiled to ES2015 via Babbel.

### Work on tests

Tests are located here; "test/".<br>
Test files must have same file name as source files plus ".spec" extension.<br>
Tests are written with Jasmine and Sinon.JS.<br>
The tests ara running in Karma.<br>
Karma tests can run in real browsers.<br>
Some browser adapters are installed. Comment them out/in in the "karma.conf.js" to let the
tests run with the target browser (The browser must be installed on your system locally).


#### console commands

- yarn run watch (runs the watch task)
- yarn run test (runs the karma tests
- yarn lint-fix (runs ESLint with auto-error-fixing)
- yarn doc (runs ESDoc)

Code coverage ist build within test task. Coverage output is located in folder
"artifacts/test/coverage".




