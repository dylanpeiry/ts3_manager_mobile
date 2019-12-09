$(document).on('click', '.navigation-menu-link', e => {
    //Close the panel on any link click.
    app.panel.close('left');

    //Format the href attribute to get the route and call the related html file
    //as the files are named with the same name as routes
    let href = $(e.currentTarget).attr('href');
    let route = href.substring(1,href.length-1);

    //Display the content related to the link clicked
    $('#content').load(`${route}.html`);
});

