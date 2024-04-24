/** @param {NS} ns */
export async function main(ns) {
    let factionToSearchFor = ns.args[0];
    let discoveredHosts = []; // Hosts (a.k.a. servers) we have scanned
    let hostsToScan = ["home"]; // Hosts we know about, but have no yet scanned
    let infiniteLoopProtection = 9999; // In case you mess with this code, this should save you from getting stuck
    let files;
    let factionContractsFound = 0;
    let totalContractsCount = 0;
    let totalFactionCount = 0;
    // Search Related
    let searchContractsFound = 0;
    let contractServersFound = [];
    // Faction Counts
    let omniTekIncorporatedCount = 0;
    let carmichaelSecurityCount = 0;
    let alphaEnterprisesCount = 0;
    let megaCorpCount = 0;
    let sector12Count = 0;
    let tianDiHuiCount = 0;
    let bladeIndustriesCount = 0;
    let nationalSecurityAgencyCount = 0;
    let netburnersCount = 0;
    let niteSecCount = 0;
    let aevumCount = 0;
    let centralIntelligenceAgencyCount = 0;
    let cyberSecCount = 0;
    let theBlackHandCount = 0;
    let bitRunnersCount = 0;
    let otherContractsCount = 0;
    if (!factionToSearchFor)
        factionToSearchFor = "";
    while (hostsToScan.length > 0 && infiniteLoopProtection-- > 0) { // Loop until the list of hosts to scan is empty
        let hostName = hostsToScan.pop(); // Get the next host to be scanned
        for (const connectedHost of ns.scan(hostName)) // "scan" (list all hosts connected to this one)
            if (!discoveredHosts.includes(connectedHost)) // If we haven't already scanned this host
                hostsToScan.push(connectedHost); // Add it to the queue of hosts to be scanned
        discoveredHosts.push(hostName); // Mark this host as "scanned"
        files = ns.ls(hostName);
        //ns.tprint(files);
        for (const fileName of files) {
            if (fileName.includes(".cct")) {
                totalContractsCount += 1;
                ns.tprint(fileName + ':' + hostName);
                if (fileName.includes('OmniTekIncorporated')) {
                    omniTekIncorporatedCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('CarmichaelSecurity')) {
                    carmichaelSecurityCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('AlphaEnterprises')) {
                    alphaEnterprisesCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('MegaCorp')) {
                    megaCorpCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('Sector-12')) {
                    sector12Count += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('TianDiHui')) {
                    tianDiHuiCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('BladeIndustries')) {
                    bladeIndustriesCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('Sector-12')) {
                    omniTekIncorporatedCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('NationalSecurityAgency')) {
                    nationalSecurityAgencyCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('Netburners')) {
                    netburnersCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('NiteSec')) {
                    niteSecCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('Aevum')) {
                    aevumCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('CentralIntelligenceAgency')) {
                    centralIntelligenceAgencyCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('CyberSec')) {
                    cyberSecCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('TheBlackHand')) {
                    theBlackHandCount += 1;
                    totalFactionCount += 1;
                }
                else if (fileName.includes('BitRunners')) {
                    bitRunnersCount += 1;
                    totalFactionCount += 1;
                }
                else {
                    otherContractsCount += 1;
                    if (factionToSearchFor == 'other' && !contractServersFound.includes(hostName)) {
                        searchContractsFound += 1;
                        contractServersFound.push(hostName);
                    }
                }
                if (fileName.includes(factionToSearchFor)) {
                    searchContractsFound += 1;
                    if (!contractServersFound.includes(hostName))
                        contractServersFound.push(hostName);
                }
            }
        }
    }
    //ns.tprint("discoveredHosts: " + discoveredHosts);
    ns.tprint("------------------------------------");
    ns.tprint("Searching Contracts ....");
    ns.tprint("------------------------------------");
    ns.tprint("Sector-12: " + sector12Count);
    ns.tprint("Aevum: " + aevumCount);
    ns.tprint("TianDiHui: " + tianDiHuiCount);
    ns.tprint("");
    ns.tprint("Netburners: " + netburnersCount);
    ns.tprint("NiteSec: " + niteSecCount);
    ns.tprint("The Black Hand: " + theBlackHandCount);
    ns.tprint("BitRunners: " + bitRunnersCount);
    ns.tprint("");
    ns.tprint("OmniTek Incorporated: " + omniTekIncorporatedCount);
    ns.tprint("Carmichael Security: " + carmichaelSecurityCount);
    ns.tprint("Alpha Enterprises: " + alphaEnterprisesCount);
    ns.tprint("MegaCorp: " + megaCorpCount);
    ns.tprint("CyberSec: " + cyberSecCount);
    ns.tprint("");
    ns.tprint("National Security Agency: " + nationalSecurityAgencyCount);
    ns.tprint("Central Intelligence Agency: " + centralIntelligenceAgencyCount);
    ns.tprint("-------------------------------------------------------------");
    ns.tprint("Other Contracts: " + otherContractsCount);
    ns.tprint("Faction Contracts: " + totalFactionCount);
    ns.tprint("Total Contracts: " + totalContractsCount);
    if (factionToSearchFor.length > 0) {
        if (searchContractsFound > 0) {
            ns.tprint("-------------------------------------------------------------");
            ns.tprint(searchContractsFound + " contracts found for " + factionToSearchFor + " !!!!");
            ns.tprint("On servers: " + contractServersFound);
        }
        else {
            ns.tprint("No contracts found for " + factionToSearchFor + ".");
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZGNvbnRyYWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdHMvZmluZGNvbnRyYWN0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQkFBcUI7QUFDckIsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBRTtJQUN6QixJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEMsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDLENBQUMseUNBQXlDO0lBQ25FLElBQUksV0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQywrQ0FBK0M7SUFDM0UsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsQ0FBQywyRUFBMkU7SUFFOUcsSUFBSSxLQUFLLENBQUM7SUFDVixJQUFJLHFCQUFxQixHQUFHLENBQUMsQ0FBQztJQUM5QixJQUFJLG1CQUFtQixHQUFHLENBQUMsQ0FBQztJQUM1QixJQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUUxQixpQkFBaUI7SUFDakIsSUFBSSxvQkFBb0IsR0FBRyxDQUFDLENBQUM7SUFDN0IsSUFBSSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7SUFFOUIsaUJBQWlCO0lBQ2pCLElBQUksd0JBQXdCLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLElBQUksdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLElBQUkscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztJQUN0QixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDdEIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLElBQUksb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLElBQUksMkJBQTJCLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztJQUN4QixJQUFJLFlBQVksR0FB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QUFDLE1BQU0sQ0FBQyx5QkFBeUIsR0FBRyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNuRTtLQUNKO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAcGFyYW0ge05TfSBucyAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1haW4obnMpIHtcbiAgICBsZXQgZmFjdGlvblRvU2VhcmNoRm9yID0gbnMuYXJnc1swXTtcblxuICAgIGxldCBkaXNjb3ZlcmVkSG9zdHMgPSBbXTsgLy8gSG9zdHMgKGEuay5hLiBzZXJ2ZXJzKSB3ZSBoYXZlIHNjYW5uZWRcbiAgICBsZXQgaG9zdHNUb1NjYW4gPSBbXCJob21lXCJdOyAvLyBIb3N0cyB3ZSBrbm93IGFib3V0LCBidXQgaGF2ZSBubyB5ZXQgc2Nhbm5lZFxuICAgIGxldCBpbmZpbml0ZUxvb3BQcm90ZWN0aW9uID0gOTk5OTsgLy8gSW4gY2FzZSB5b3UgbWVzcyB3aXRoIHRoaXMgY29kZSwgdGhpcyBzaG91bGQgc2F2ZSB5b3UgZnJvbSBnZXR0aW5nIHN0dWNrXG5cbiAgICBsZXQgZmlsZXM7XG4gICAgbGV0IGZhY3Rpb25Db250cmFjdHNGb3VuZCA9IDA7XG4gICAgbGV0IHRvdGFsQ29udHJhY3RzQ291bnQgPSAwO1xuICAgIGxldCB0b3RhbEZhY3Rpb25Db3VudCA9IDA7XG5cbiAgICAvLyBTZWFyY2ggUmVsYXRlZFxuICAgIGxldCBzZWFyY2hDb250cmFjdHNGb3VuZCA9IDA7XG4gICAgbGV0IGNvbnRyYWN0U2VydmVyc0ZvdW5kID0gW107XG5cbiAgICAvLyBGYWN0aW9uIENvdW50c1xuICAgIGxldCBvbW5pVGVrSW5jb3Jwb3JhdGVkQ291bnQgPSAwO1xuICAgIGxldCBjYXJtaWNoYWVsU2VjdXJpdHlDb3VudCA9IDA7XG4gICAgbGV0IGFscGhhRW50ZXJwcmlzZXNDb3VudCA9IDA7XG4gICAgbGV0IG1lZ2FDb3JwQ291bnQgPSAwO1xuICAgIGxldCBzZWN0b3IxMkNvdW50ID0gMDtcbiAgICBsZXQgdGlhbkRpSHVpQ291bnQgPSAwO1xuICAgIGxldCBibGFkZUluZHVzdHJpZXNDb3VudCA9IDA7XG4gICAgbGV0IG5hdGlvbmFsU2VjdXJpdHlBZ2VuY3lDb3VudCA9IDA7XG4gICAgbGV0IG5ldGJ1cm5lcnNDb3VudCA9IDA7XG4gICAgbGV0IG5pdGVTZWNDb3VudCA9IDA7XG4gICAgbGV0IGFldnVtQ291bnQgPSAwO1xuICAgIGxldCBjZW50cmFsSW50ZWxsaWdlbmNlQWdlbmN5Q291bnQgPSAwO1xuICAgIGxldCBjeWJlclNlY0NvdW50ID0gMDtcbiAgICBsZXQgdGhlQmxhY2tIYW5kQ291bnQgPSAwO1xuICAgIGxldCBiaXRSdW5uZXJzQ291bnQgPSAwO1xuICAgIGxldCBvdGhlckNvbnRyYWN0c0NvdW50ID0gMDtcblxuICAgIGlmICghZmFjdGlvblRvU2VhcmNoRm9yKSBmYWN0aW9uVG9TZWFyY2hGb3IgPSBcIlwiO1xuXG5cblxuXG4gICAgd2hpbGUgKGhvc3RzVG9TY2FuLmxlbmd0aCA+IDAgJiYgaW5maW5pdGVMb29wUHJvdGVjdGlvbi0tID4gMCkgeyAvLyBMb29wIHVudGlsIHRoZSBsaXN0IG9mIGhvc3RzIHRvIHNjYW4gaXMgZW1wdHlcbiAgICAgICAgbGV0IGhvc3ROYW1lID0gaG9zdHNUb1NjYW4ucG9wKCk7IC8vIEdldCB0aGUgbmV4dCBob3N0IHRvIGJlIHNjYW5uZWRcbiAgICAgICAgZm9yIChjb25zdCBjb25uZWN0ZWRIb3N0IG9mIG5zLnNjYW4oaG9zdE5hbWUpKSAvLyBcInNjYW5cIiAobGlzdCBhbGwgaG9zdHMgY29ubmVjdGVkIHRvIHRoaXMgb25lKVxuICAgICAgICAgICAgaWYgKCFkaXNjb3ZlcmVkSG9zdHMuaW5jbHVkZXMoY29ubmVjdGVkSG9zdCkpIC8vIElmIHdlIGhhdmVuJ3QgYWxyZWFkeSBzY2FubmVkIHRoaXMgaG9zdFxuICAgICAgICAgICAgICAgIGhvc3RzVG9TY2FuLnB1c2goY29ubmVjdGVkSG9zdCk7IC8vIEFkZCBpdCB0byB0aGUgcXVldWUgb2YgaG9zdHMgdG8gYmUgc2Nhbm5lZFxuICAgICAgICBkaXNjb3ZlcmVkSG9zdHMucHVzaChob3N0TmFtZSk7IC8vIE1hcmsgdGhpcyBob3N0IGFzIFwic2Nhbm5lZFwiXG5cbiAgICAgICAgZmlsZXMgPSBucy5scyhob3N0TmFtZSk7XG5cbiAgICAgICAgLy9ucy50cHJpbnQoZmlsZXMpO1xuXG4gICAgICAgIGZvciAoY29uc3QgZmlsZU5hbWUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgIGlmIChmaWxlTmFtZS5pbmNsdWRlcyhcIi5jY3RcIikpIHtcbiAgICAgICAgICAgICAgICB0b3RhbENvbnRyYWN0c0NvdW50ICs9IDE7XG5cbiAgICAgICAgICAgICAgICBucy50cHJpbnQoZmlsZU5hbWUrJzonK2hvc3ROYW1lKTtcblxuICAgICAgICAgICAgICAgIGlmIChmaWxlTmFtZS5pbmNsdWRlcygnT21uaVRla0luY29ycG9yYXRlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9tbmlUZWtJbmNvcnBvcmF0ZWRDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEZhY3Rpb25Db3VudCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZU5hbWUuaW5jbHVkZXMoJ0Nhcm1pY2hhZWxTZWN1cml0eScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhcm1pY2hhZWxTZWN1cml0eUNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsRmFjdGlvbkNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlTmFtZS5pbmNsdWRlcygnQWxwaGFFbnRlcnByaXNlcycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFscGhhRW50ZXJwcmlzZXNDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEZhY3Rpb25Db3VudCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZU5hbWUuaW5jbHVkZXMoJ01lZ2FDb3JwJykpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVnYUNvcnBDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEZhY3Rpb25Db3VudCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZU5hbWUuaW5jbHVkZXMoJ1NlY3Rvci0xMicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3RvcjEyQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxGYWN0aW9uQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbGVOYW1lLmluY2x1ZGVzKCdUaWFuRGlIdWknKSkge1xuICAgICAgICAgICAgICAgICAgICB0aWFuRGlIdWlDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEZhY3Rpb25Db3VudCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZU5hbWUuaW5jbHVkZXMoJ0JsYWRlSW5kdXN0cmllcycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsYWRlSW5kdXN0cmllc0NvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsRmFjdGlvbkNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlTmFtZS5pbmNsdWRlcygnU2VjdG9yLTEyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgb21uaVRla0luY29ycG9yYXRlZENvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsRmFjdGlvbkNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlTmFtZS5pbmNsdWRlcygnTmF0aW9uYWxTZWN1cml0eUFnZW5jeScpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdGlvbmFsU2VjdXJpdHlBZ2VuY3lDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEZhY3Rpb25Db3VudCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZU5hbWUuaW5jbHVkZXMoJ05ldGJ1cm5lcnMnKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXRidXJuZXJzQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxGYWN0aW9uQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbGVOYW1lLmluY2x1ZGVzKCdOaXRlU2VjJykpIHtcbiAgICAgICAgICAgICAgICAgICAgbml0ZVNlY0NvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsRmFjdGlvbkNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlTmFtZS5pbmNsdWRlcygnQWV2dW0nKSkge1xuICAgICAgICAgICAgICAgICAgICBhZXZ1bUNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsRmFjdGlvbkNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlTmFtZS5pbmNsdWRlcygnQ2VudHJhbEludGVsbGlnZW5jZUFnZW5jeScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbnRyYWxJbnRlbGxpZ2VuY2VBZ2VuY3lDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEZhY3Rpb25Db3VudCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZU5hbWUuaW5jbHVkZXMoJ0N5YmVyU2VjJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY3liZXJTZWNDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEZhY3Rpb25Db3VudCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZU5hbWUuaW5jbHVkZXMoJ1RoZUJsYWNrSGFuZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoZUJsYWNrSGFuZENvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsRmFjdGlvbkNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlTmFtZS5pbmNsdWRlcygnQml0UnVubmVycycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJpdFJ1bm5lcnNDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB0b3RhbEZhY3Rpb25Db3VudCArPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyQ29udHJhY3RzQ291bnQgKz0gMTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmFjdGlvblRvU2VhcmNoRm9yID09ICdvdGhlcicgJiYgIWNvbnRyYWN0U2VydmVyc0ZvdW5kLmluY2x1ZGVzKGhvc3ROYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29udHJhY3RzRm91bmQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyYWN0U2VydmVyc0ZvdW5kLnB1c2goaG9zdE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVOYW1lLmluY2x1ZGVzKGZhY3Rpb25Ub1NlYXJjaEZvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29udHJhY3RzRm91bmQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250cmFjdFNlcnZlcnNGb3VuZC5pbmNsdWRlcyhob3N0TmFtZSkpIGNvbnRyYWN0U2VydmVyc0ZvdW5kLnB1c2goaG9zdE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy9ucy50cHJpbnQoXCJkaXNjb3ZlcmVkSG9zdHM6IFwiICsgZGlzY292ZXJlZEhvc3RzKTtcbiAgICBucy50cHJpbnQoXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgbnMudHByaW50KFwiU2VhcmNoaW5nIENvbnRyYWN0cyAuLi4uXCIpO1xuICAgIG5zLnRwcmludChcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcblxuICAgIG5zLnRwcmludChcIlNlY3Rvci0xMjogXCIgKyBzZWN0b3IxMkNvdW50KTtcbiAgICBucy50cHJpbnQoXCJBZXZ1bTogXCIgKyBhZXZ1bUNvdW50KTtcbiAgICBucy50cHJpbnQoXCJUaWFuRGlIdWk6IFwiICsgdGlhbkRpSHVpQ291bnQpO1xuICAgIG5zLnRwcmludChcIlwiKTtcbiAgICBucy50cHJpbnQoXCJOZXRidXJuZXJzOiBcIiArIG5ldGJ1cm5lcnNDb3VudCk7XG4gICAgbnMudHByaW50KFwiTml0ZVNlYzogXCIgKyBuaXRlU2VjQ291bnQpO1xuICAgIG5zLnRwcmludChcIlRoZSBCbGFjayBIYW5kOiBcIiArIHRoZUJsYWNrSGFuZENvdW50KTtcbiAgICBucy50cHJpbnQoXCJCaXRSdW5uZXJzOiBcIiArIGJpdFJ1bm5lcnNDb3VudClcbiAgICBucy50cHJpbnQoXCJcIik7XG4gICAgbnMudHByaW50KFwiT21uaVRlayBJbmNvcnBvcmF0ZWQ6IFwiICsgb21uaVRla0luY29ycG9yYXRlZENvdW50KTtcbiAgICBucy50cHJpbnQoXCJDYXJtaWNoYWVsIFNlY3VyaXR5OiBcIiArIGNhcm1pY2hhZWxTZWN1cml0eUNvdW50KTtcbiAgICBucy50cHJpbnQoXCJBbHBoYSBFbnRlcnByaXNlczogXCIgKyBhbHBoYUVudGVycHJpc2VzQ291bnQpO1xuICAgIG5zLnRwcmludChcIk1lZ2FDb3JwOiBcIiArIG1lZ2FDb3JwQ291bnQpO1xuICAgIG5zLnRwcmludChcIkN5YmVyU2VjOiBcIiArIGN5YmVyU2VjQ291bnQpO1xuICAgIG5zLnRwcmludChcIlwiKTtcbiAgICBucy50cHJpbnQoXCJOYXRpb25hbCBTZWN1cml0eSBBZ2VuY3k6IFwiICsgbmF0aW9uYWxTZWN1cml0eUFnZW5jeUNvdW50KTtcbiAgICBucy50cHJpbnQoXCJDZW50cmFsIEludGVsbGlnZW5jZSBBZ2VuY3k6IFwiICsgY2VudHJhbEludGVsbGlnZW5jZUFnZW5jeUNvdW50KTtcbiAgICBucy50cHJpbnQoXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgIG5zLnRwcmludChcIk90aGVyIENvbnRyYWN0czogXCIgKyBvdGhlckNvbnRyYWN0c0NvdW50KTtcbiAgICBucy50cHJpbnQoXCJGYWN0aW9uIENvbnRyYWN0czogXCIgKyB0b3RhbEZhY3Rpb25Db3VudCk7XG4gICAgbnMudHByaW50KFwiVG90YWwgQ29udHJhY3RzOiBcIiArIHRvdGFsQ29udHJhY3RzQ291bnQpO1xuXG4gICAgaWYgKGZhY3Rpb25Ub1NlYXJjaEZvci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChzZWFyY2hDb250cmFjdHNGb3VuZCA+IDApIHtcbiAgICAgICAgICAgIG5zLnRwcmludChcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgICAgICAgICBucy50cHJpbnQoc2VhcmNoQ29udHJhY3RzRm91bmQgKyBcIiBjb250cmFjdHMgZm91bmQgZm9yIFwiICsgZmFjdGlvblRvU2VhcmNoRm9yICsgXCIgISEhIVwiKTtcbiAgICAgICAgICAgIG5zLnRwcmludChcIk9uIHNlcnZlcnM6IFwiICsgY29udHJhY3RTZXJ2ZXJzRm91bmQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbnMudHByaW50KFwiTm8gY29udHJhY3RzIGZvdW5kIGZvciBcIiArIGZhY3Rpb25Ub1NlYXJjaEZvciArIFwiLlwiKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=