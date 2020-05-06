$(document).ready(() => {
    fetch('./users.json').then(response => {
        response.json().then(json => {
            // First, load in the rows
            let rows = [];
            $.each(json, (username, info) => {
                let chapoUrl = 'https://www.reddit.com' + info['chapotraphouse']['link'];
                let cumtownUrl = 'https://www.reddit.com' + info['cumtown']['link'];
                let chapoTime = moment.unix(info['chapotraphouse']['timestamp']).format('YYYY-MM-DD HH:mm');
                let cumtownTime = moment.unix(info['cumtown']['timestamp']).format('YYYY-MM-DD HH:mm');
                rows.push({
                    "user": username,
                    "cumtown-link": '<a href="' + cumtownUrl + '">' + cumtownTime + '</a>',
                    "chapo-link": '<a href="' + chapoUrl + '">' + chapoTime + '</a>',
                });
            });

            $('#chapo-table').bootstrapTable({
                sortable: true,
                search: true,
                pagination: true,
                sortName: 'cumtown-link',
                sortOrder: 'desc',
                columns: [{
                    title: 'Username',
                    field: 'user',
                    sortable: true
                }, {
                    title: 'Cumtown Comment Link',
                    field: 'cumtown-link',
                    sortable: true
                }, {
                    title: 'ChapoTrapHouse Comment Link',
                    field: 'chapo-link',
                    sortable: true
                }],
                data: rows
            }).show();
        });
    });
});
