var db = openDatabase(DB_NAME, DB_VERSION, DB_DESC, DB_SIZE);

db.transaction(tx => {
    /* Servers table creation */
    tx.executeSql('create table if not exists Servers(' +
        'idServer integer not null constraint Servers_pk primary key autoincrement,' +
        'labelServer text not null,' +
        'descriptionServer int,' +
        'totalSlots integer default 0);',
        null,
        onSuccess,
        onError
    );

    /* Groups table creation */
    tx.executeSql('create table if not exists Groups(' +
        'idGroup integer not null constraint Groups_pk primary key autoincrement,' +
        'labelGroup text not null unique,' +
        'isChannelGroup integer not null default 0);',
        null,
        onSuccess,
        onError
    );

    /* Channels table creation */
    tx.executeSql('create table if not exists Channels(' +
        'idChannel integer not null constraint Channels_pk primary key autoincrement,' +
        'labelChannel text not null);',
        null,
        onSuccess,
        onError
    );

    /* Clients table creation */
    tx.executeSql('create table if not exists Clients(' +
        'idClient integer not null constraint Clients_pk primary key autoincrement,' +
        'lastUsername text not null,' +
        'ts3UID text not null unique,' +
        'createdAt text default current_timestamp not null,' +
        'lastConnectedAt text,' +
        'totalConnectionsRegistered integer);',
        null,
        onSuccess,
        onError
    );

    /* Group_has_Clients table creation */
    tx.executeSql('create table if not exists Groups_has_Clients(' +
        'idGroup  integer not null references Groups,' +
        'idClient integer not null references Clients);',
        null,
        onSuccess,
        onError
    );

    /* Channels_has_Groups table creation */
    tx.executeSql('create table if not exists Channels_has_Groups(' +
        'name text not null unique,' +
        'idGroup integer references Groups,' +
        'idChannel integer references Channels);',
        null,
        onSuccess,
        onError
    );

    /* Servers_has_Groups table creation */
    tx.executeSql('create table if not exists Servers_has_Groups(' +
        'idServer integer references Servers,' +
        'idGroup integer references Groups);',
        null,
        onSuccess,
        onError
    );

});

function onSuccess(tx, results) {
    console.log(results);
}

function onError(tx, error) {
    console.log(error);
}


