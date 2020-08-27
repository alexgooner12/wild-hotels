const getters = {
   getParsedPages: state => {
      return state.parsedPages
   },

   getPages: state => {
      return state.pages
   },

   getUrls: state => {
      return state.urls
   },
   
   getActivePage: state => {
      return state.activePage
   },

   getState: state => prop => {
      return state[prop]
   },

   getBuildings: state => {
        return state.buildings
   },

   getManyByAttr: state => (type, value, collection = 'urls') => state[collection].filter(page => {
      console.log("STATE", state);
      console.log("COLLECTION", collection);
      console.log("PAGE", page);
      console.log("TYPE", type);
      console.log("VALUE", value);
      console.log("GET", _.get(page, type))
      return _.get(page, type) == value
   }),

   getByAttr: state => (type, value, collection = "urls") => state[collection].find(page => {
      return _.get(page, type) == value
   }),
   
 };
 
 export default getters