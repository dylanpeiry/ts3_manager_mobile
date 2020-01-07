$(document).on('click', '.navigation-menu-link', e => {
    //Close the panel on any link click.
    app.panel.close('left');

    //Format the href attribute to get the route and call the related html file
    //as the files are named with the same name as routes
    let href = $(e.currentTarget).attr('href');
    let route = href.substring(1, href.length - 1);

    //Display the content related to the link clicked
    $('.content').load(`${route}.html`);
    if (route === 'clients')
        getClients();
});

$(document).on('click', '#api-login-button', () => {
    let username = $("input#username").val();
    let password = $("input#password").val();
    connectApi(username, password);
});

$(document).on('click','#client-more',e => {
    let parentContainer = $(e.currentTarget).parents('.accordion-item')[0];

    let clientNick = $(parentContainer).find('#client-nickname').text();
    let clientId = $(parentContainer).find('#client-cldbid').text();
    showClientGroups(clientNick,clientId);
});