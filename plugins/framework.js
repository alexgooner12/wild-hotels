const { createClient } = require('./contentful.js');
const _ = require('lodash');
const client = createClient();

const framework = {
    async loadUrls() {
        const entries = await client.getEntries();
        let pages = _.filter(
            entries.items,
            el => _.get(el, "sys.contentType.sys.id") === "page" || _.get(el, "sys.contentType.sys.id") === "hotel" || _.get(el, "sys.contentType.sys.id") === "room"
        );
        pages = _.map(pages, page => Object.assign({}, { ...page, url: page.slug }));
        return pages;
    },

    async loadActivePage(route) {
        const entries = await client.getEntries();
        let pages = _.filter(
            entries.items,
            el => _.get(el, "sys.contentType.sys.id") === "page"
        );
        return _.find(
            pages,
            el => route === _.get(el, "fields.slug")
        );
    },

    async loadActiveSubPage(route) {
        const entries = await client.getEntries();
        return _.find(
            entries.items,
            el => {
                const r = route.slice(1, route.length);
                return r == _.get(el, "fields.title").toLowerCase()
            }
        );
    },

    async loadHotel(route) {
        const entries = await client.getEntries();
        let comp = _.find(
            entries.items,
            el => {
                const r = route.slice(1, route.length);
                return r == _.get(el, "fields.title").toLowerCase().replace(/\s/g, "-")
            }
        );
        let hotel = comp;
        hotel = Object.assign({}, {
            ...hotel,
            fields: {
                ...hotel.fields,
                floors: _.map(_.get(hotel, "fields.floors"), floor => {
                    return Object.assign({}, {
                        ...floor, fields: Object.assign({}, {
                            ...floor.fields, rooms:
                                _.flatten(_.map(_.get(floor, "fields.rooms"), room => Object.assign({}, { ...room, url: `/${room.fields.title.toLowerCase().replace(/\s/g, "-")}` })))
                        })
                    })
                })
            }
        })

        return hotel;
    },

    async loadHotelByTitle(title) {
        const entries = await client.getEntries();
        let hotels = _.filter(
            entries.items,
            el => 'hotel' === _.get(el, "sys.contentType.sys.id")
        );
        return _.find(hotels, hotel => _.get(hotel, "fields.title").toLowerCase().replace(/\s/g, "-") == title);
    },

    async loadHotels() {
        const entries = await client.getEntries();
        let hotels = _.filter(
            entries.items,
            el => 'hotel' === _.get(el, "sys.contentType.sys.id")
        );

        hotels = _.map(hotels, hotel => Object.assign({}, { ...hotel, url: `/${_.get(hotel, "fields.title").toLowerCase().replace(/\s/g, "-")}` }))
        return hotels;
    },

    async loadRoom(route) {
        const entries = await client.getEntries();
        return _.find(
            entries.items,
            el => {
                const r = route.slice(1, route.length);
                let title = _.get(el, "fields.title").toLowerCase();
                title = title.replace(/\s/g, "-");
                return r == title
            }
        );
    },
    async loadRooms() {
        const entries = await client.getEntries();
        let rooms = _.filter(
            entries.items,
            el => 'room' === _.get(el, "sys.contentType.sys.id")
        );

        rooms = _.map(rooms, room => Object.assign({}, { ...room, url: `/${_.get(room, "fields.title").toLowerCase().replace(/\s/g, "-")}` }))
        return rooms;
    },

    async loadCheapestRoomsByType(rooms) {
        const roomTypes = _.uniq(_.map(rooms, room => _.get(room, "fields.type")));
        rooms = _.sortBy(rooms, room => _.get(room, "fields.price"));
        const cheapestRoomsByType = [];
        _.forEach(rooms, room => {
          const addedTypes = _.map(cheapestRoomsByType, el => _.get(el, "fields.type"));
          if (!addedTypes.includes(_.get(room, "fields.type"))) cheapestRoomsByType.push(room);
        });
        return cheapestRoomsByType;
    },

    async loadActiveFloorFromRoom(activeRoom) {
        const entries = await client.getEntries();
        const floors = _.filter(
            entries.items,
            el => 'floor' === _.get(el, "sys.contentType.sys.id")
        );
        return _.find(floors, floor => _.find(_.get(floor, "fields.rooms"), room => _.get(room, "sys.id") == _.get(activeRoom, "sys.id")));
    },

    async loadActiveHotelFromRoom(activeRoom) {
        const entries = await client.getEntries();
        const hotels = _.filter(
            entries.items,
            el => 'hotel' === _.get(el, "sys.contentType.sys.id")
        );
        const activeHotel = _.find(hotels, hotel => {
            const floors = _.flatten(_.get(hotel, "fields.floors"));
            const rooms = _.flatten(_.map(floors, floor => _.get(floor, "fields.rooms")))
            if (_.find(rooms, room => _.get(room, "sys.id") == _.get(activeRoom, "sys.id"))) {
                console.log(hotel, "hotel active")
                return hotel;
            }
        })
        return activeHotel;
    },

    async loadByType(type) {
        const entries = await client.getEntries();
        return _.filter(
            entries.items,
            el => type === _.get(el, "sys.contentType.sys.id")
        );
    },

    async loadHotelsSocialMedia(hotels){
        return _.map(hotels, hotel => Object.assign({}, { name: _.get(hotel, "fields.name"), socialMedia: _.pick(_.get(hotel, "fields"), ["facebook", "instagram", "linkedIn"]) }));
    }
}

module.exports = framework;