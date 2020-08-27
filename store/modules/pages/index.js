import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

const pagesModule =  {
   namespaced: true,
   actions,
   getters,
   state,
   mutations
};

export default pagesModule