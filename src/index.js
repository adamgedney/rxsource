import { module } from  './module';

/**
 * $stream is an Observable
 * options {updateMethod: "replace", "merge"}
 * @param {*}  
 * @param {*} map  
 */
function SingleSrc($stream, map, options){
  return store => {
    $stream
      .subscribe(data=>{
        // commit(action, payload)
        store.commit('injectData',{ data, map, options });
      })
    //store.subscribe(mutation => {})
  }
}

export default {
  SingleSrc,
  singleSrcModule: module
}