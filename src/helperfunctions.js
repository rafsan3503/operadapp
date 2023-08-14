export const   trimAddress = (address) => {
    let tempAddress = ""
    try{
        tempAddress = `${address.slice(0,5)}...${address.slice(38,42)}`
        return tempAddress
    } catch {
        return ""
    }
}
export const addresses = {
    "lendingpool":"0x7900421514E80D34B60fc3867261491FdAfaC533",
    "factory":"0x623bf4a5295f2597Fa74f755267227953a46bCEA",
    "rewardContract":"0x11c68f5c28684FD553160aC89b32c1F6390e7F33",
    "operaToken":"0x3bd8268791de798d4ed5d424d49412cf42b8ec3a",
    "stakingContract":"0x670E71219219a6625a3B0E68D0D8CdBD9d065A49",
    "dao":"0xCc14EDfff7d0408ee523fBd328207D1B385E1871",
    "stakingContractV2":"0xa1db0796f664b9356C507e9C306128eCC9Bd13aF",
    "taxDeployer":"0x7feC5C4250AdDe6225b560A5C6d9aA4492f4268C",
    "notaxDeployer":"0x213A88aFE9bB5Bb73bE445E581a975cF3156C5fC"
}
// export const addresses = {
//     "lendingpool":"0x839C578093482608e8C8C39beC473Acb385B0849",
//     "factory":"0xa03DE50582AeaC1b1C7A83e7EeCd7584f9fA9149",
//     "rewardContract":"0x98eFB91029784335Ea9205A751D2444F317d06fe",
//     "operaToken":"0x3bd8268791de798d4ed5d424d49412cf42b8ec3a",
//     "stakingContract":"0x670E71219219a6625a3B0E68D0D8CdBD9d065A49",
//     "dao":"0x24903A1e5A3888628FF1C78D55bd1e3878FD1A16",
//     "stakingContractV2":"0xa1db0796f664b9356C507e9C306128eCC9Bd13aF"
// }