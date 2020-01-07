let clients_servergroups = {};

function getClients() {
    let container = $("#clients-content");
    $.ajax({
        url: API_BASE_URL + '/clients',
        type: 'GET',
        dataType: 'JSON',
        success: data => {
            if (data.success) {
                data.data.forEach(c => {
                    getClientServerGroups(c.cldbid);
                });
                showClientsList(data.data);
            }
        }
    })
}

function getClientServerGroups(clientId) {
    $.ajax({
        url: API_BASE_URL + `/clients/${clientId}/servergroups`,
        type: 'GET',
        dataType: 'JSON',
        success: data => {
            if (data.success) {
                clients_servergroups[clientId] = {'servergroups': data.data};
            }
        }
    })
}

function getServerInformation() {
    let container = $("#server_config-content");
    $.ajax({
        url: API_BASE_URL + '/server/information',
        type: 'GET',
        dataType: 'JSON',
        success: data => {

        }
    })
}

function connectApi(username, password) {
    $.ajax({
        url: API_BASE_URL + '/auth/login',
        type: 'POST',
        dataType: 'JSON',
        data: {username: username, password: password},
        success: data => {
            if (data.success) {
                let navigationButton = $("#navigation-button");
                navigationButton.css('display', 'block');
            } else {
                console.log(data);
            }
        }
    })
}

function showClientGroups(clientNick, clientId) {
    let html = null;
    let clientNickname = $(".more-clientnickname");
    let serverGroups = null;
    if (clients_servergroups.hasOwnProperty(clientId))
        serverGroups = clients_servergroups[clientId].servergroups;
    clientNickname.text(clientNick);
    //Make a dropdown list
    serverGroups.forEach(serverGroup => {
    })
}

function showClientsList(clients) {
    let html = null;
    let clientsContainer = $("#clients-content > ul");
    clients.sort(alphabetSort);
    clients.forEach(client => {
        html = `<li class="accordion-item">
                    <a href="#" class="item-content item-link">
                        <div class="item-inner">
                            <div id="client-nickname" class="item-title">
                                ${client.client_nickname}
                            </div>
                        </div>
                    </a>
                    <div class="accordion-item-content">
                        <div class="block">
                            <div class="row">
                                <div class="col-35"><b>UID</b></div>
                                <div id="client-uid" class="col-65">${client.client_unique_identifier}</div>
                            </div>
                            <div class="row">
                                <div class="col-35"><b>CLDBID</b></div>
                                <div id="client-cldbid" class="col-65">${client.cldbid}</div>
                            </div>
                            <div class="row">
                                <div class="col-35"><b>Created the</b></div>
                                <div class="col-65">${formatDate(client.client_created)}</div>
                            </div>
                            <div class="row">
                                <div class="col-35"><b>Last connection</b></div>
                                <div class="col-65">${formatDate(client.client_lastconnected)}</div>
                            </div>
                            <div class="row">
                                <div class="col-35"><b>Nb of connections</b></div>
                                <div class="col-65">${client.client_totalconnections}</div>
                            </div>
                            <div class="row">
                                <div class="col-35"><b>Last IP</b></div>
                                <div class="col-65">${client.client_lastip}</div>
                            </div>
                            <div class="row">   
                                <div class="col-33">
                                    <button class="col button button-fill color-orange button-small"><i class="fas fa-trash"></i> DELETE</a></button>
                                </div>                 
                                <div class="col-33">
                                    <button class="col button button-fill color-red button-small"><i class="fas fa-ban"></i> BAN</a></button>
                                </div>                 
                                <div class="col-33">
                                    <button class="col button button-fill color-blue button-small popup-open" data-popup=".popup-client" id="client-more"><i class="fas fa-plus"></i> MORE</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>`;
        clientsContainer.append(html);
    });
}

function formatDate(epoch) {
    let d = new Date(epoch * 1000);

    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}

/***
 * Sort an array of object by alphabet
 * @param a
 * @param b
 */
function alphabetSort(a, b) {
    return a.client_nickname.toLowerCase().localeCompare(b.client_nickname.toLowerCase());
}