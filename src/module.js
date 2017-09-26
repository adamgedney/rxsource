import { 
  INJECT_DATA
} from './mutation-types';

// const testMap = [
//   {
//     branch : 'bid',
//     key : 'getBidById',
//     updateByMerging: true //defaults to replace. Note: Arrays are concatenated
//   }
// ];

const mapKeyToStateBranch = (d,m)=>m.filter(item => d && d.hasOwnProperty(item.key))[0];

// mutations
export const mutations = {
  [INJECT_DATA] (state, { data, map, options }) {
    const mapped = mapKeyToStateBranch(data,map);
    if(!mapped){ return false; }
console.log('MUTATION', data, mapped)
    /**
     * Merge or replace based on assigned update strategy as assigned in the map
     * Handles arrays or objects
     */
    if(state.hasOwnProperty(mapped.branch) && mapped.updateByMerging){
      if(Array.isArray(state[mapped.branch])){
          state[mapped.branch] = state[mapped.branch].concat(data[mapped.key]);
      }else{
          state[mapped.branch] = {...state[mapped.branch], ...data[mapped.key]};
      }
    }else{
      state[mapped.branch] = data[mapped.key];
    }
  }
}

// actions
export const actions = {
  injectData ({ commit, state }, payload) {
    commit(INJECT_DATA, payload)
  }
}

export default {
  namespaced: false,
  actions,
  mutations
}
