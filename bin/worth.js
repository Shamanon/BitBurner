/** @param {NS} ns */
import {getServers} from '/inc/include.js';
export async function main(ns) {
  const args = ns.flags([["all", false]]);
  if(args.all){
    for(let host of getServers(ns)){
      let value = ns.getServerMoneyAvailable(host);
      if(value > 0) ns.tprint(host+': '+ns.nFormat(value, "$0.00a"));
    }
  }else{
    const host = args._[0];
    ns.tprint(host+': '+ns.nFormat(ns.getServerMoneyAvailable(host), "$0.00a"));
  } 
}
export const autocomplete = data => data.servers