export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    aurelia.start().then(a => { 
        //this loads our app.js in the body element.
        a.setRoot('app/app', document.body);
    });
}