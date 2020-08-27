// import appConfig from '~/config/appConfig'
import framework from '~/plugins/framework'

// import stringify from 'json-stringify-safe'

const actions = {

    SET_STATE({ commit }, obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                commit('SET_STATE', { prop: key, value: obj[key] })
            }
        }
    },

    async LOAD_FOOTER({ commit, getters, dispatch }, locale) {

        let footer = await framework.loadByType('footer')

        commit('SET_STATE', {
            prop: 'footer',
            value: footer,
            locale: locale
        });
    },

    async LOAD_NAVIGATION({ commit, getters, dispatch }, locale) {

        let navigation = await framework.loadByType('navigation')

        commit('SET_STATE', {
            prop: 'navigation',
            value: navigation
        })

        return navigation
    },

    async LOAD_HOTELS({ commit, getters, dispatch }, locale) {

        let hotels = await framework.loadHotels();
        console.log(hotels, "hotels in actions")

        commit('SET_STATE', {
            prop: 'hotels',
            value: hotels
        })

        return hotels;
    },

    async LOAD_ROOMS({ commit, getters, dispatch }, locale) {

        let rooms = await framework.loadRooms();

        commit('SET_STATE', {
            prop: 'rooms',
            value: rooms
        })

        return rooms;
    },

    async LOAD_TRANSLATIONS({ commit, getters, dispatch }, locale) {

        const translations = await framework.loadByType('translation')
        //  { en: {} }

        // let tr = _.mapValues(translations.fields, (t, k) => t.fields.translation)
        const tr = _.map(translations, translation => Object.assign({}, { [_.get(translation, "fields.title")]: _.get(translation, "fields.translation")}))[0];

        commit('SET_STATE', {
            prop: 'translations',
            value: tr
        });
    }

};

export default actions
