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
const Manager = () => { 
  const { provider,lendEth,userBalance,requestRevenue,usersRevenue,numberOfLenders,userData,connectWallet, addressOfUser } = useOutletContext();
  const [ err,setError] = useState(false)
  const [ tokenData, setTokenData ] = useState(false)
  const [ isOwner, setIsOwner ] = useState(false)
  const [ updateState, setUpdateState ] = useState(0)
  const [ txPending, setTxPending ] = useState(false)

  async function handleMaxChange(){
    let maxInput =  parseFloat(document.getElementById("maxWalletInput").value).toFixed(1) * 10
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
        await deployedTokenContract.methods.setMaxWallet(maxInput).send({value:0,from:window.web3.currentProvider.selectedAddress})
        setTxPending(false)
    } catch {
        setTxPending(false)
    }
  }
  async function handleSwapChange(){
    let swapInput =  parseFloat(document.getElementById("swapInput").value).toFixed(1) * 10
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
        await deployedTokenContract.methods.setTokenSwapSettings(swapInput).send({value:0,from:window.web3.currentProvider.selectedAddress})
        setTxPending(false)
    } catch {
        setTxPending(false)
    }
  }
  async function handleSocialChange(){
    let website =  document.getElementById("websiteInput").value
    let telegram =  document.getElementById("telegramInput").value
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
        await deployedTokenContract.methods.updateAboutMe(telegram,website).send({value:0,from:window.web3.currentProvider.selectedAddress})
        setTxPending(false)
    } catch {
        setTxPending(false)
    }
  }
  async function handleTaxChange(){
    let devBuy =  parseFloat(document.getElementById("devBuyInput").value).toFixed(1) * 10
    let devSell =  parseFloat(document.getElementById("devSellInput").value).toFixed(1) * 10
    let marketingBuy =  parseFloat(document.getElementById("marketingBuyInput").value).toFixed(1) * 10
    let marketingSell =  parseFloat(document.getElementById("marketingSellInput").value).toFixed(1) * 10
    let liqBuy =  parseFloat(document.getElementById("liqBuyInput").value).toFixed(1) * 10
    let liqSell =  parseFloat(document.getElementById("liqSellInput").value).toFixed(1) * 10
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
        await deployedTokenContract.methods.setTaxes(marketingBuy,marketingSell,devBuy,devSell,liqBuy,liqSell).send({value:0,from:window.web3.currentProvider.selectedAddress})
        setTxPending(false)
    } catch {
        setTxPending(false)
    }
  }

  async function handleAddressInput(){
    let addressInput =  document.getElementById("addressInput").value
    setUpdateState(0)
    try{
        let web3;
        if(window.ethereum){
            web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3){
            web3 = new Web3(window.web3.currentProvider)
        }

        // I will need to know a tokens TAXES, SUPPLY, NAME, SYMBOL, TELEGRAM, WEBSITE, OWNER, SWAP THRESHOLD, WALLETS, 

        const deployedTokenContract = new web3.eth.Contract(DeployedTokenABI,addressInput)
        // const WETHContract = new web3.eth.Contract(WETHABI,"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")

        // let tokenPair = await deployedTokenContract.methods.pair().call()
        let tokenName = await deployedTokenContract.methods.name().call()
        let aboutMe = await deployedTokenContract.methods.aboutMe().call()
        let buyTax = await deployedTokenContract.methods.getBuyTax().call()
        let sellTax = await deployedTokenContract.methods.getSellTax().call()
        let owner = await deployedTokenContract.methods.getOwner().call()
        let symbol = await deployedTokenContract.methods.symbol().call()
        let totalSupply = await deployedTokenContract.methods.totalSupply().call()
        let maxWallet = await deployedTokenContract.methods._maxWalletToken().call()
        let swapThreshold = await deployedTokenContract.methods._swapThreshold().call()

        if(owner.toLowerCase() === addressOfUser){
            setIsOwner(true)
        } else {
            setIsOwner(false)
        }

        // const pairTokenContract = new web3.eth.Contract(PAIRABI,tokenPair)
        // let pairTotalSupply = await pairTokenContract.methods.totalSupply().call()
        // let wethInPair = await WETHContract.methods.balanceOf(tokenPair).call()
        // let pairbalanceOfLocker = await pairTokenContract.methods.balanceOf("0x033437CB8D213FceAb933CF32458E6C8B5f2bb74").call()
        // let tokenbalanceOfPair = await deployedTokenContract.methods.balanceOf(tokenPair).call()

        setTokenData({
          "tokenAddress":addressInput,
          "name":tokenName,
          "symbol":symbol,
          "buyTax":buyTax,
          "sellTax":sellTax,
          "owner":owner,
          "totalSupply":totalSupply,
          "telegram":aboutMe[0],
          "website":aboutMe[1],
          "maxWallet":maxWallet,
          "swapThreshold":swapThreshold
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
       <p className="lockerHeaderText"><span className="headerSpan" style={{marginRight:"20px"}}>{tokenData["name"]}</span>      ${tokenData["symbol"]} </p>
       <p className="headerPairText">{tokenData["tokenAddress"]}</p>
      </div>
      <div className="lockerMiddleDiv">

        <div>
        <p className="lockerHeaderText headerSpan">TAXES</p>
        <p style={{textAlign:"center"}}>{parseFloat(tokenData["buyTax"]/10).toFixed(1)} % / {parseFloat(tokenData["sellTax"]/10).toFixed(1)} % </p>
        <p className="lockerHeaderText headerSpan" style={{marginTop:"25px"}}>TOTAL SUPPLY</p>
        <p  style={{textAlign:"center"}}>{parseInt(tokenData["totalSupply"] / 10**9).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        <p className="lockerHeaderText headerSpan" style={{marginTop:"25px"}}>MAX WALLET</p>
        <p  style={{textAlign:"center"}}>{parseInt(tokenData["maxWallet"] / 10**9).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        <p className="lockerHeaderText headerSpan" style={{marginTop:"25px"}}>SWAP THRESHOLD</p>
        <p  style={{textAlign:"center"}}>{parseInt(tokenData["swapThreshold"] / 10**9).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        <p className="lockerHeaderText headerSpan" style={{marginTop:"25px"}}>TELEGRAM</p>
        <p  style={{textAlign:"center"}}>{tokenData["telegram"]}</p>
        <p className="lockerHeaderText headerSpan" style={{marginTop:"25px"}}>WEBSITE</p>
        <p  style={{textAlign:"center",marginBottom:"15px"}}>{tokenData["website"]}</p>
        </div>
       

        <div className="linksDiv">

          <a target="blank" href={`https://etherscan.io/address/${tokenData["tokenAddress"]}`}>ETHERSCAN</a>
          {/* <a target="blank" href={`https://www.dextools.io/app/en/ether/pair-explorer/${tokenData["tokenAddress"]}`}>DEXTOOLS</a> */}
          {/* <a target="blank" href={`https://etherscan.io/address/${tokenData["tokenAddress"]}`}>TOKEN CA</a> */}
        </div>
        {isOwner && <div className="updateButtonsDiv">
            <button disabled={txPending} onClick={()=>{setUpdateState(1)}} className="launchButtons">UPDATE MAX WALLET</button>
            <button disabled={txPending} onClick={()=>{setUpdateState(2)}}  className="launchButtons">UPDATE SWAP THRESHOLD</button>
            <button disabled={txPending} onClick={()=>{setUpdateState(3)}}  className="launchButtons">UPDATE SOCIALS</button>
            <button disabled={txPending} onClick={()=>{setUpdateState(4)}}  className="launchButtons">UPDATE TAXES</button>
            </div>}
        {updateState > 0 && <div className="updateInputDiv">
            {updateState === 1 && 
            <div className="centeredColumn">
            <label htmlFor="" className="text-[18px]">
              Max Wallet
            </label>
            <input
              type="text"
              name=""
              id="maxWalletInput"
              style={{color:"white"}}
              placeholder="3%"
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[8px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            <p className="text-[12px] ml-[10px] mb-[13px]">
              Max Wallet must be 0.2% or greater
            </p>
            <button onClick={handleMaxChange} className="launchButtons">UPDATE</button>
            </div>}
            {updateState === 2 && 
            <div className="centeredColumn">
            <label htmlFor="" className="text-[18px]">
              Swap Threshhold
            </label>
            <input
              type="text"
              name=""
              id="swapInput"
              placeholder="5%"
              style={{color:"white"}}
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[8px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            <p className="text-[12px] ml-[10px] mb-[13px]">
              Choose between 0.2% and 5%
            </p>
            <button onClick={handleSwapChange} className="launchButtons">UPDATE</button>
            </div>}
            {updateState === 3 && 
            <div className="centeredColumn">
            <label htmlFor="" className="text-[15px]">
              Website
            </label>
            <input
              type="text"
              name=""
              style={{color:"white"}}
              id="websiteInput"
              defaultValue={tokenData["website"]}
            //   placeholder="www..."
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[14px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            <label htmlFor="" className="text-[15px]">
              Telegram
            </label>
            <input
              type="text"
              name=""
              id="telegramInput"
              style={{color:"white"}}
              defaultValue={tokenData["telegram"]}
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[14px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            <button onClick={handleSocialChange} className="launchButtons">UPDATE</button>
            </div>}
            {updateState === 4 && 
            <div className="centeredColumn">
          <label htmlFor="" className="text-[18px]">
              Marketing Buy Tax
            </label>
            <input
              type="text"
              name=""
              id="marketingBuyInput"
              style={{color:"white"}}
              placeholder="3%"
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[14px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            <label htmlFor="" className="text-[18px]">
              Dev Buy Tax
            </label>
            <input
              type="text"
              name=""
              id="devBuyInput"
              placeholder="3%"
              style={{color:"white"}}
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[14px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            <label htmlFor="" className="text-[18px]">
              Liquidity Buy Tax
            </label>
            <input
              type="text"
              name=""
              id="liqBuyInput"
              style={{color:"white"}}
              placeholder="3%"
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[14px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            <p  className="text-[12px] ml-[10px] mb-[13px]">
              Max Buy tax is 9.6% total
            </p>
            <label htmlFor="" className="text-[18px]">
              Marketing Sell Tax
            </label>
            <input
              type="text"
              name=""
              id="marketingSellInput"
              placeholder="3%"
              style={{color:"white"}}
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[14px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />

            <label htmlFor="" className="text-[18px]">
              Dev Sell Tax
            </label>
            <input
              type="text"
              name=""
              id="devSellInput"
              style={{color:"white"}}
              placeholder="3%"
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[14px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />

            <label htmlFor="" className="text-[18px]">
              Liquidity Sell Tax
            </label>
            <input
              type="text"
              name=""
              id="liqSellInput"
              placeholder="3%"
              style={{color:"white"}}
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[14px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
                        <p className="text-[12px] ml-[10px] mb-[13px]">
            Max Sell tax is 9.6% total
            </p>
            <button onClick={handleTaxChange} className="launchButtons">UPDATE</button>
            </div>}
            </div>}
        {/* <div className="lockerFooter">
        <p className="headerPairText centered">Please be aware that this token's liquidity has been borrowed from our DAO, and is 100% safe.</p>
        <p className="headerPairText centered">More liquidity tokens are minted as people add liquidity to the pool.</p>
        <p className="headerPairText centered">OPERA DAO owners the liquidity to this pair and can vote to remove it only when the token is deemed 'unresponsive'.</p>
        <p className="headerPairText white centered">Please visit <a className="docsLink" target="blank" href={`https://docs.operaprotocol.com`}> docs.operaprotocol.com </a> to learn more about this indefinite liquidity lock.</p>
        
        </div> */}
      </div>
      </div>}
    </section>
  );
};

export default Manager;
