const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const { loadUrls, loadByType } = require('../../plugins/framework');
const nodemailer = require('nodemailer');

const getRouteComponent = item => {
    if (item.sys.contentType.sys.id == 'page') return item.fields.template || 'BasicPage'
    else if (item.sys.contentType.sys.id == 'hotel') return 'Hotel'
    return 'Room';
}

const createRouteUrl = item => {
    let url;
    if (item.sys.contentType.sys.id == 'room' || item.sys.contentType.sys.id == 'hotel') {
        url = `/${item.fields.title.toLowerCase().replace(/\s/g, "-")}`;
        return url;
    }
    return item.fields.slug || `/${item.fields.title.toLowerCase()}`
}

const createTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        secure: true,
        auth: {
            user: 'aleksandar_radulovic@rocketmail.com',
            pass: 'ljmifrgulxzbjqoy'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
}

const RoutesRepository = () => {
    this.generateRoute = item => {
        return {
            url: createRouteUrl(item),
            id: item.sys.id,
            component: getRouteComponent(item),
            title: item.fields.title
        };
    };

    this.fetchRoutes = async (forceRestart) => {
        let routes = [];

        let cmsItems = await loadUrls()

        _.each(cmsItems, item => {
            routes.push(this.generateRoute(item))
        })

        fs.writeFile(path.join(__dirname, '../../routes.json'), JSON.stringify(routes), function (err) {
            if (err) throw err;
        })

        return routes;
    };

    this.sendEmail = async (email, res) => {
        const transporter = createTransporter();
        await transporter.sendMail({
            from: 'aleksandar_radulovic@rocketmail.com',
            to: `aleksandar_radulovic@rocketmail.com`,
            subject: 'Wild Hotels',
            text: 'Your inquiery',
            html: `something`
        }, (error, info) => {
            if (error) {
                console.log(222)
                return res.send({ error: error.message });
            } else {
                console.log("Message sent: " + info.response);
                socketTimeout: 30 * 1000
                transporter.close();
                res.send({ emailSent: 'Email sent' });
            }
        });
    }

    return this;
};
module.exports = RoutesRepository;