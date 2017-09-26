import * as singleSrcModule from  './module';
import { INJECT_DATA } from './mutation-types'
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
        console.log('STREAM',data, map)
        
        // commit(action, payload) 
        store.commit(INJECT_DATA,{ data, map, options })
      })
    //store.subscribe(mutation => {})
  }
}

export default {
  SingleSrc,
  singleSrcModule
}
