const getters = {
    getState: state => prop => {
       return state[prop]
    }
 };
 
 export default getters