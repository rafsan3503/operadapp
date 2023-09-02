import ethereum from "../assets/icons/ethereum.png";
import locker from "../assets/icons/locker.png";
import infinite from "../assets/icons/infinite.png";
import arrow from "../assets/icons/arrow.png";
import { Link } from "react-router-dom";
import triangle from "../assets/icons/triangle.png"; 
import {  useOutletContext} from "react-router-dom";
import {trimAddress } from "../helperfunctions"
import { useState } from "react";
import Web3 from 'web3';
import "../css/Locker.css"
import { DeployedTokenABI } from "../abis/DeployedTokenABI";
import { PAIRABI } from "../abis/PairABI";
import { WETHABI } from "../abis/WETHABI";
// eslint-disable-next-line react/prop-types
const Locker = () => { 
  const { provider,lendEth,userBalance,requestRevenue,usersRevenue,numberOfLenders,userData,connectWallet, addressOfUser } = useOutletContext();
  const [ err,setError] = useState(false)
  const [ tokenData, setTokenData ] = useState(false)

  async function handleAddressInput(){
    let addressInput =  document.getElementById("addressInput").value
    try{
        let web3;
        if(window.ethereum){
            web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3){
            web3 = new Web3(window.web3.currentProvider)
        }

        const deployedTokenContract = new web3.eth.Contract(DeployedTokenABI,addressInput)
        const WETHContract = new web3.eth.Contract(WETHABI,"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
        let tokenPair = await deployedTokenContract.methods.pair().call()
        let tokenName = await deployedTokenContract.methods.name().call()
        const pairTokenContract = new web3.eth.Contract(PAIRABI,tokenPair)
        let pairTotalSupply = await pairTokenContract.methods.totalSupply().call()
        let wethInPair = await WETHContract.methods.balanceOf(tokenPair).call()
        let pairbalanceOfLocker = await pairTokenContract.methods.balanceOf("0xa7A7F6cf9a39294fe350d9EDa4D8017729546250").call()
        let tokenbalanceOfPair = await deployedTokenContract.methods.balanceOf(tokenPair).call()

        setTokenData({
          "tokenAddress":addressInput,
          "name":tokenName,
          "pair":tokenPair,
          "pairTotalSupply":pairTotalSupply,
          "lockedPairTokens":pairbalanceOfLocker,
          "tokensInLP":tokenbalanceOfPair,
          "wethInLP":wethInPair
        })
        setError(false)

    } catch {
        setError("Failed to load this token data")
    }

  }
  return (
    <section>
      <div className="flex justify-between items-center pt-[44px] pb-[30px] lg:pr-[50px]"> 
        <h4 className="text-[24px] tracking-[0.075em] ml-14 lg:ml-0">Locker</h4>
        <div className="flex items-center">
          <img src={ethereum} className="hidden lg:block" alt="" />
          <button onClick={()=>{if(addressOfUser)return;connectWallet()}} className="flex items-center text-[10px] lg:text-[20px] text-[#85F983] bg-[#1A2218] pl-4 pr-4 rounded-2xl ml-1">
            {addressOfUser ? trimAddress(addressOfUser) : "CONNECT WALLET"} <img src={arrow} className="ml-5 w-[10px] lg:w-[27px]" alt="" />
          </button>
        </div>
      </div>
      <div className="bg-[#000000] p-[28px] lg:mr-[50px] rounded-[15px]">
      <label htmlFor="" className="text-[18px]">
              Input Address of Token
            </label>
            <input
            onChange={handleAddressInput}
              type="text"
              name=""
              id="addressInput"
              placeholder="0x..."
              style={{color:"white"}}
              className="text-[#ff0000] w-full h-[37px] block mt-[14px] mb-[30px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
  
    {err && <label htmlFor="" className="text-[#ff1130] text-[14px]">
              {err}
            </label>}
    </div>
    {tokenData && <div className="lockerOutputDiv">
      <div>
       <p className="lockerHeaderText"><span className="headerSpan">{tokenData["name"]}</span> Liquidity Lock </p>
       <p className="headerPairText">Uniswap V2 pair: {tokenData["pair"]}</p>
      </div>
      <div className="lockerMiddleDiv">
      <img src={locker} className="mr-[5px]" alt="" />

        <p className="headerPairText">LOCKED LIQUIDITY:</p>
        <p className="liquidityPercent">{((tokenData["lockedPairTokens"]/tokenData["pairTotalSupply"]) * 100).toFixed(1)} %</p>
        <div className="lpTokensDisplayDiv">
          <span className="centerPiece"><img src={ethereum} className="hidden mr-[5px] lg:block" alt="" /><p className=" green">{(tokenData["wethInLP"]/10**18).toFixed(2)} WETH</p></span>
         <p  className="centerPiece "> + </p> <p  className="green centerPiece">{(tokenData["tokensInLP"]/10**9).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {tokenData["name"]}</p>
        </div>
        {/* <p className="headerPairText">UNLOCK DATE</p> */}
        {tokenData["lockedPairTokens"] > 0 &&
        <img src={infinite} className="mr-[5px]" alt="" />}
        <div className="linksDiv">

          <a target="blank" href={`https://etherscan.io/address/${tokenData["pair"]}`}>ETHERSCAN</a>
          <a target="blank" href={`https://www.dextools.io/app/en/ether/pair-explorer/${tokenData["tokenAddress"]}`}>DEXTOOLS</a>
          <a target="blank" href={`https://etherscan.io/address/${tokenData["tokenAddress"]}`}>TOKEN CA</a>
        </div>
        <div className="lockerFooter">
        <p className="headerPairText centered">Please be aware that this token's liquidity has been borrowed from our DAO, and is 100% safe.</p>
        <p className="headerPairText centered">More liquidity tokens are minted as people add liquidity to the pool.</p>
        <p className="headerPairText centered">OPERA DAO owns the liquidity to this pair and can vote to remove it only when the token is deemed 'unresponsive'.</p>
        <p className="headerPairText white centered">Please visit <a className="docsLink" target="blank" href={`https://docs.operaprotocol.com`}> docs.operaprotocol.com </a> to learn more about this indefinite liquidity lock.</p>
        
        </div>
      </div>
      </div>}
    </section>
  );
};

export default Locker;
