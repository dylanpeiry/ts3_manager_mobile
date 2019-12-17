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
        },
        {
            path: '/clients/',
            component: ''
        }
    ],
    // ... other parameters
});

let notificationFull = app.notification.create({
    icon: '<i class="fas fa-teamspeak"></i>',
    title: 'TS3 Manager',
    titleRightText: 'Info',
    subtitle: 'Connection successful',
    text: 'Test',
    closeTimeout: 3000
});

