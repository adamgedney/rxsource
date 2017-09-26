import * as rxsourceModule from  './module';
import { INJECT_DATA } from './mutation-types'
/**
 * $stream is an Observable
 * options {updateMethod: "replace", "merge"}
 * @param {*}  
 * @param {*} map   
 */
function Rxsource($stream, map, options){
  return store => {
    $stream
      .subscribe(data=>{
        store.commit(INJECT_DATA,{ data, map, options })
      })
  }
}

export default {
  Rxsource,
  rxsourceModule
}
