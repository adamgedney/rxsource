import { 
  INJECT_DATA
} from './mutation-types.js';

const mapKeyToStateBranch = (d,m)=>{
  for(let k in m){
    if(d && d.hasOwnProperty(k)){
      return {
        branch: m[k],
        key : k
      };
    }
  }
};

// actions
export const actions = {
  injectData ({ commit, state }, payload) {
    commit(INJECT_DATA, payload)
  }
}

// mutations
export const mutations = {
  [INJECT_DATA] (state, { data, map, options }) {
    const mapped = mapKeyToStateBranch(data,map);

    if(state.hasOwnProperty(mapped.branch)){
      if(Array.isArray(state[mapped.branch])){
        // Diff the array here, concatenate, or replace?
      }
    }else{
      state[branch] = data[mapped.key];
    }
    // 
    // state.count = state.count + amount
  }
}

export default {
  actions,
  mutations
}
