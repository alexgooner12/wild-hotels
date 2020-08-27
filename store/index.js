
import app from './modules/app';
import pages from './modules/pages';

export const actions = {
    async nuxtServerInit({ dispatch, commit, state }, { req }) {

    	let acceptHeader = req.headers['accept'];

        dispatch('app/SET_STATE', {
           webp: _.includes(acceptHeader, 'webp')
        })

        let locale = 'en'

        // let footer = await dispatch('pages/LOAD_FOOTER', locale)
        let navigation = await dispatch('pages/LOAD_NAVIGATION', locale)
        let translations = await dispatch('pages/LOAD_TRANSLATIONS', locale)
        let hotels = await dispatch('pages/LOAD_HOTELS', locale)
        let rooms = await dispatch('pages/LOAD_ROOMS', locale)

    }
}
 
export const modules = {
    app,
    pages
}