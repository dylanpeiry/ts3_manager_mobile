var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Add default routes
    // see https://blog.framework7.io/mastering-v2-router-958ea2dbd24f
    routes: [
        {
            path: '/server-configuration/',
            templateUrl: 'server-configuration.html',
        }
    ],
    // ... other parameters
});

