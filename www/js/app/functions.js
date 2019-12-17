function getClients() {
    let container = $("#clients-content");
    $.ajax({
        url: API_BASE_URL + '/api/clients',
        type: 'GET',
        dataType: 'JSON',
        success: data => {
            if (data.success) {
                showClientsList(data.data);
            }
        }
    })
}

function connectApi(username, password) {
    $.ajax({
        url: API_BASE_URL + '/api/auth/login',
        type: 'POST',
        dataType: 'JSON',
        data: {username: username, password: password},
        success: data => {
            if (data.success) {
                notificationFull.open();
                let navigationButton = $("#navigation-button");
                navigationButton.css('display', 'block');
            } else {
                console.log(data);
            }
        }
    })
}

function showClientsList(clients) {
    let html = null;
    let clientsContainer = $("#clients-content > ul");
    clients.sort(alphabetSort);
    clients.forEach((client) => {
        html = `<li class="accordion-item"><a href="#" class="item-content item-link">
                    <div class="item-inner">
                        <div class="item-title">
                            ${client.client_nickname}
                        </div>
                    </div>
                </a>
                    <div class="accordion-item-content">
                        <div class="block">
                            <div class="row">
                                <div class="col-35"><b>UID</b></div>
                                <div class="col-65">${client.client_unique_identifier}</div>
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