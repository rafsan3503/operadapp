import ethereum from "../assets/icons/ethereum.png";
import arrow from "../assets/icons/arrow.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import LaunchModal from "../components/LaunchModal";
import {  useOutletContext} from "react-router-dom";
import {trimAddress } from "../helperfunctions"
import "../css/Launcher.css"
import Web3 from 'web3';
import { FactoryABI } from "../abis/FactoryABI";
import { addresses } from "../helperfunctions";
import { TaxDeployerABI } from "../abis/TaxDeployerABI";
import { NoTaxDeployerABI } from "../abis/NoTaxDeployerABI";
import ethereum3 from "../assets/icons/ethereum3.png";

const LaunchToken = () => {
  const [modalOn, setModalOn] = useState(false);
  const [sellTaxError, setSellTaxError] = useState(false);
  const [buyTaxError, setBuyTaxError] = useState(false);
  const [swapError, setSwapError] = useState(false);
  const [maxWalletError, setMaxWalletError] = useState(false);
  const [borrowAmountError, setBorrowAmountError] = useState(false);
  const [noTaxToken, setNoTaxToken] = useState(false);
  const [modalState, setModalState] = useState(0);
  const [borrowedEth, setBorrowedEth] = useState(0);
  const [selectedTokenType, setSelectedTokenType] = useState(false);
  const [generalError, setGeneralError] = useState(false);
  const [tokenInputs, setTokenInputs] = useState({});
  const [tokenDeployed, setTokenDeployed] = useState(false);
  const { unstakeEth,lendEth,userData,userBalance,connectWallet, addressOfUser } = useOutletContext();
  const [txPending, setTxPending] = useState(false);

    async function setTaxesZero(){
      if(noTaxToken){
        setNoTaxToken(false)
      } else {
        setNoTaxToken(true)
      }

    }

  async function handleFirstInputClick(){
    let nameInput = document.getElementById("nameInput").value
    let symbolInput = document.getElementById("symbolInput").value
    if(nameInput === "" && symbolInput === ""){
      setGeneralError("Please input a Name and Symbol")
    } else if(nameInput === "" ){
      setGeneralError("Please input a Name")
    }else if(symbolInput === "" ){
      setGeneralError("Please input a Symbol")
    } else {
      setGeneralError(false)
      setTokenInputs({name:nameInput,symbol:symbolInput})
      setModalState(2)
    }
  }
  async function handleSecondInputClick(){
    try{
      let maxWalletInput =0
      let supplyInput = 0
      let swapInput = 0
      if(selectedTokenType !== 3){
         maxWalletInput = parseInt(parseFloat(document.getElementById("maxWalletInput").value).toFixed(1) * 10)
         supplyInput = parseInt(document.getElementById("supplyInput").value)
         swapInput = parseInt(parseFloat(document.getElementById("swapInput").value).toFixed(1)* 10)
      } else {
        maxWalletInput = parseInt(parseFloat(document.getElementById("maxWalletInput").value).toFixed(1) * 10)
         supplyInput = parseInt(document.getElementById("supplyInput").value)
      }
      if(selectedTokenType === 1 && supplyInput >= 0 && supplyInput > 999999999999999){
        setGeneralError("Invalid Supply")
      } else if (selectedTokenType !== 3 && swapInput < 2 && swapInput > 50) {
        setGeneralError("Invalid Swap Threshhold")
      }
      else if(maxWalletInput >=2 && supplyInput > 0 && swapInput >= 0){
        setGeneralError(false)
        setTokenInputs((_)=>{
          let temp = _
          temp.maxWallet = maxWalletInput
          temp.supply = supplyInput
          temp.swap = swapInput
          return temp
        })
        if(selectedTokenType !== 3){
          setModalState(3)
        } else {
          setTokenInputs((_)=>{
            let temp = _
            temp.marketingBuyTax = 0
            temp.marketingSellTax = 0
            temp.devBuyTax = 0
            temp.devSellTax = 0
            temp.liqBuyTax = 0
            temp.liqSellTax = 0
            return temp
          })
          setModalState(5)
        }

      } else {
        setGeneralError("Invalid Inputs")
      }
    }catch {
      console.log("failed")
    }


  }
  async function handleThirdInputClick(){
    let marketingBuyInput = parseInt(parseFloat(document.getElementById("marketingBuyInput").value).toFixed(1) * 10)
    let marketingSellInput = parseInt(parseFloat(document.getElementById("marketingSellInput").value).toFixed(1) * 10)
    let devBuyInput = parseInt(parseFloat(document.getElementById("devBuyInput").value).toFixed(1) * 10)
    let devSellInput = parseInt(parseFloat(document.getElementById("devSellInput").value).toFixed(1) * 10)
    let liqBuyInput = parseInt(parseFloat(document.getElementById("liqBuyInput").value).toFixed(1) * 10)
    let liqSellInput = parseInt(parseFloat(document.getElementById("liqSellInput").value).toFixed(1) * 10)
    if(marketingBuyInput >= 0 && marketingSellInput >= 0 && devBuyInput >= 0 && devSellInput >= 0 && liqBuyInput >=0 && liqSellInput >= 0){
      let operaTax = 0
      if(selectedTokenType === 1){
        operaTax = 4
      } else {
        operaTax = 2
      }
      if(marketingBuyInput + devBuyInput + liqBuyInput + operaTax > 500){
        setGeneralError("Buy Tax Too High")
      } else if(marketingSellInput + devSellInput + liqSellInput + operaTax > 500){
        setGeneralError("Sell Tax Too High")
      } else {
        // console.log("valid inputs")
        setGeneralError(false)
        setTokenInputs((_)=>{
          let temp = _
          temp.marketingBuyTax = marketingBuyInput
          temp.marketingSellTax = marketingSellInput
          temp.devBuyTax = devBuyInput
          temp.devSellTax = devSellInput
          temp.liqBuyTax = liqBuyInput
          temp.liqSellTax = liqSellInput
          return temp
        })
        setModalState(5)
      }

    } else{
      setGeneralError("Invalid Inputs")
    }
    
  }
  async function handleFourthInputClick(){
    let telegramInput = document.getElementById("telegramInput").value
    let websiteInput = document.getElementById("websiteInput").value
    let devWalletInput = document.getElementById("devWalletInput").value
    let marketingWalletInput = document.getElementById("marketingWalletInput").value
    if(devWalletInput === "" ){
      setGeneralError("Please Input Dev Wallet")
    } else if(marketingWalletInput === ""){
      setGeneralError("Please Input Marketing Wallet")
    } else {
      setGeneralError(false)
      setTokenInputs((_)=>{
        let temp = _
        temp.telegram = telegramInput
        temp.website = websiteInput
        temp.devWallet = devWalletInput
        temp.marketingWallet = marketingWalletInput
        return temp
      })
      if(selectedTokenType === 1 ){
        setModalState(6)
      } else {
        setModalState(7)
      }
    }
  }
  async function handleFifthInputClick(){
    if(borrowedEth > 0){
      // console.log("valid borrow amount")
      setGeneralError(false)
      setModalState(7)
    } else {
      setGeneralError("Cannot Borrow 0 ETH")
    }

  }


  async function handleSixthInputClick(){
    setTxPending(true)
    try{
      let web3;
      if(window.ethereum){
          web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
      } else if(window.web3){
          web3 = new Web3(window.web3.currentProvider)
      }
      // console.log(tokenInputs)
      let stringList = [tokenInputs["name"],tokenInputs["symbol"],tokenInputs["telegram"],tokenInputs["website"]]
      let intList = [tokenInputs["supply"],tokenInputs["maxWallet"],tokenInputs["swap"],tokenInputs["marketingBuyTax"],tokenInputs["marketingSellTax"],tokenInputs["devBuyTax"],tokenInputs["devSellTax"],tokenInputs["liqBuyTax"],tokenInputs["liqSellTax"]]
          if(borrowedEth === 0){
            if(selectedTokenType === 3){
              const factoryContract = new web3.eth.Contract(FactoryABI,addresses["factory"])
              let fee = 5 * 10**16
              intList[9] = 0
              intList[10] = 0
              let response = await factoryContract.methods.deployToken(stringList,[tokenInputs["supply"],tokenInputs["maxWallet"]],intList,borrowedEth).send({value:fee,from:window.web3.currentProvider.selectedAddress})
            try{
              setTokenDeployed(response.events.tokenDeployed.returnValues.token)
            }catch {
              setTokenDeployed("")
            }

            } else {
              const factoryContract = new web3.eth.Contract(FactoryABI,addresses["factory"])
              let fee = 5 * 10**16
              intList[9] = 1
              intList[10] = 0
              let response = await factoryContract.methods.deployToken(stringList,[tokenInputs["devWallet"],tokenInputs["marketingWallet"]],intList,borrowedEth).send({value:fee,from:window.web3.currentProvider.selectedAddress})
              try{
                setTokenDeployed(response.events.tokenDeployed.returnValues.token)
              }catch {
                setTokenDeployed("")
              }
            }

          } else {
            const factoryContract = new web3.eth.Contract(FactoryABI,addresses["factory"])
            let fee = borrowedEth * 10**17
            intList[9] = 1
            intList[10] = 1
            let response = await factoryContract.methods.deployToken(stringList,[tokenInputs["devWallet"],tokenInputs["marketingWallet"]],intList,borrowedEth).send({value:fee,from:window.web3.currentProvider.selectedAddress})
            try{
              setTokenDeployed(response.events.tokenDeployed.returnValues.token)
            }catch {
              setTokenDeployed("")
            }
            
          }

          setTxPending(false)
  
      } catch {
        setTxPending(false)
      }

  }


  async function handleDeployClick(){
    let nameInput = document.getElementById("nameInput").value
    let symbolInput = document.getElementById("symbolInput").value
    let swapInput =0
    let maxWalletInput = document.getElementById("maxWalletInput").value
    let supplyInput = document.getElementById("supplyInput").value
    let marketingBuyInput = 0
    let marketingSellInput = 0
    let devBuyInput = 0
    let devSellInput = 0
    let liqBuyInput = 0
    let liqSellInput = 0
    if(!noTaxToken){
      swapInput = document.getElementById("swapInput").value
      marketingBuyInput = document.getElementById("marketingBuyInput").value
      marketingSellInput = document.getElementById("marketingSellInput").value
      devBuyInput = document.getElementById("devBuyInput").value
      devSellInput = document.getElementById("devSellInput").value
      liqBuyInput = document.getElementById("liqBuyInput").value
      liqSellInput = document.getElementById("liqSellInput").value
    }

    let telegramInput = document.getElementById("telegramInput").value
    let websiteInput = document.getElementById("websiteInput").value
    let devWalletInput = document.getElementById("devWalletInput").value
    let marketingWalletInput = document.getElementById("marketingWalletInput").value
    let initialSwapThreshold = parseFloat(swapInput).toFixed(1)
    let initialMaxWallet = parseFloat(maxWalletInput).toFixed(1)

    supplyInput = parseInt(supplyInput)
    swapInput =  (parseFloat(swapInput).toFixed(1) *10)
    maxWalletInput =(parseFloat(maxWalletInput).toFixed(1) *10)
    // swapInput = parseInt((supplyInput * swapInput) / 1000)
    // maxWalletInput = parseInt((supplyInput * maxWalletInput) / 1000)

    marketingBuyInput = parseFloat(marketingBuyInput).toFixed(1) * 10
    marketingSellInput = parseFloat(marketingSellInput).toFixed(1) * 10
    devBuyInput = parseFloat(devBuyInput).toFixed(1) * 10
    devSellInput = parseFloat(devSellInput).toFixed(1) * 10
    liqBuyInput = parseFloat(liqBuyInput).toFixed(1) * 10
    liqSellInput = parseFloat(liqSellInput).toFixed(1) * 10
    let tempBool = false

    if(!supplyInput || !maxWalletInput){
      return
    }
    // if(borrowedEth===0){
    //   tempBool = true
    //   setBorrowAmountError(true)
    // } else {
    //   setBorrowAmountError(false)
    // }
    if(liqSellInput + devSellInput + marketingSellInput > 480){
      setSellTaxError(true)
      tempBool = true
    } else {
      setSellTaxError(false)
    }
    if(liqBuyInput + devBuyInput + marketingBuyInput > 480){
      setBuyTaxError(true)
      tempBool = true
    } else {
      setBuyTaxError(false)
    }
    if(initialSwapThreshold < 0.2 || initialSwapThreshold > 5 ){
      if(!noTaxToken){
        setSwapError(true)
        tempBool = true
      }

    } else {
      setSwapError(false)
    }
    if(initialMaxWallet < 0.2  ){
      setMaxWalletError(true)
      tempBool = true
    } else {
      setMaxWalletError(false)
    }
    if(tempBool){
      return
    } else {
      // console.log("Token Limits Met")
    let stringList = [nameInput,symbolInput,telegramInput,websiteInput]
    let addressList = [devWalletInput,marketingWalletInput]
    let numbersList = [supplyInput,maxWalletInput,swapInput,marketingBuyInput,marketingSellInput,devBuyInput,devSellInput,liqBuyInput,liqSellInput]

    setModalOn({stringList,addressList,numbersList,borrowedEth,noTaxToken})      
    }


  }
  if(txPending){
    return (           <div
      className="absolute top-0 backdrop-blur-sm bg-black/10 bottom-[-100%] right-0 left-0"
      // onClick={setModalOn(false)}
    >
      <div className="bg-black lg:w-[578px] mx-auto mt-[150px] pt-[50px] pb-[25px] border border-slate-900 rounded-[15px]">
        <img
          className="mx-auto animate-spin rounded-full mb-3"
          src={ethereum3}
          alt=""
        />
        <p className="text-[22px] text-center tracking-[0.075em] font-medium">
PLEASE CONFIRM THE TRANSACTION
        </p>

      </div>
    </div>)
  }
  if(tokenDeployed) {
    return (
<div
      className="absolute top-0 backdrop-blur-sm bg-black/10 bottom-[-100%] right-0 left-0"
      // onClick={setModalOn(false)}
    >
      <div className="bg-black lg:w-[578px] mx-auto mt-[150px] pt-[50px] pb-[25px] border border-slate-900 rounded-[15px]">
        <img
          className="mx-auto animate-spin rounded-full mb-3"
          src={ethereum3}
          alt=""
        />
        <p className="text-[24px] text-center tracking-[0.075em] font-medium">
          YOUR TOKEN IS
          <br />
          NOW LIVE! 🥳
        </p>
        <p className="text-[10px] text-center mt-[7px] tracking-[0.075em]">
          GO TO <a target="blank" href={`https://etherscan.io/token/${tokenDeployed}`} className="font-semibold underline">ETHERSCAN</a> TO
          SEE THE DEPLOYED CONTRACT.
        </p>
        <p className="text-[10px] text-center mt-[15px] tracking-[0.075em]">
          GO TO DEXTOOLS TO TRADE.
        </p>
        <p className="text-[10px] text-center mt-[7px] tracking-[0.075em]">
        {`https://www.dextools.io/app/en/ether/pair-explorer/${tokenDeployed}`}
        </p>


        <p className="text-[22px] font-bold tracking-[0.075em] text-center my-[55px]">
          {modalOn.stringList[0]}
        </p>
        <p className="text-[17px] font-bold tracking-[0.075em] text-center my-[55px]">
          {tokenDeployed}
        </p>
        <p className="text-white text-center text-[10px] tracking-[0.075em]">
          YOU CAN NOW CLOSE THIS POPUP AND MANAGE YOUR TOKEN IN THE DAPP
          <br />
          {/* VIA ETHERSCAN.{" "} */}
          <span style={{cursor:"pointer"}} onClick={()=>{setModalOn(false)}} className="text-[#59FF56]">CLOSE</span>
        </p>
      </div>
    </div>
    )
  }

  return (
    <section>
      <div className="flex justify-between items-center pt-[44px] pb-[30px] pr-[50px]">
        <h4 className="text-[20px] lg:text-[24px] ml-14 lg:ml-0 tracking-[0.075em]">Launch Token</h4>
        <div className="flex items-center">
          <img src={ethereum} className="hidden lg:block" alt="" />
          <button onClick={()=>{if(addressOfUser)return;connectWallet()}} className="flex items-center text-[10px] lg:text-[20px] text-[#85F983] bg-[#1A2218] pl-4 pr-4 rounded-2xl ml-1">
            {addressOfUser ? trimAddress(addressOfUser) : "CONNECT WALLET"} <img src={arrow} className="ml-5 w-[10px] lg:w-[27px]" alt="" />
          </button>
        </div>
      </div>


      <div className="bg-black pt-[27px] pb-[57px] pl-[30px] pr-[30px] lg:mr-[50px] rounded-[15px]">
      {modalState === 0 && 
        <div className="baseCentered">
          <p className="modalHeader">Welcome to the Opera Token Launcher Page</p>
          <p className="modalText">With this page users will be able to deploy tokens seemlessly with the opportunity to borrow Initial Liquidity.</p>
          <p className="modalText">Deployed Tokens can be managed within the Token Manager Page.</p>
          <button onClick={()=>{setModalState(4)}} className="launchButtons">START</button>
        </div>}
        {modalState === 4 && 
        <div className="baseCentered">
          <p className="modalHeader">First Select the Type of Token</p>
          <div onClick={()=>{setSelectedTokenType(1)}} className={selectedTokenType === 1 ? "baseCentered tokenSelection selectedToken" :"baseCentered tokenSelection"}>
              <p className="modalHeader">Token With Borrowed Liquidity</p>
              <p className="modalText">Select this token if you wish to borrow liquidity.</p>
              <p className="modalText">There is a fee of 10% of the borrowed amount paid upfront, also a 0.4% hardcoded tax in the contract.</p>
              <p className="modalText">Initial Tax can be set to a max of 48% buy/sell. If the initial tax is above 20% round trip then the hardcoded tax will be 2%.</p>
              <p className="modalText">When the deployer lowers the initial tax the maximum tax will be 10% for both buys and sells, and the hardcoded Opera tax will be reduced to 0.4%.</p>
              <p className="modalText">The OPERA DAO will control the liquidity pool tokens. They will be locked initially for 3 days before being voted on by the DAO. The DAO can vote to relock in 1 week cycles.</p>
          </div>
          <div onClick={()=>{setSelectedTokenType(2)}} className={selectedTokenType === 2 ? "baseCentered tokenSelection selectedToken" :"baseCentered tokenSelection"}>
              <p className="modalHeader">Token With Tax and no Borrowed Liquidity</p>
              <p className="modalText">Select this token if you wish to start your own LP with a taxable token.</p>
              <p className="modalText">There is a fee of 0.04 ETH paid upfront, also a 0.2% hardcoded tax in the contract along with 0.4% of initial supply.</p>
              {/* <p className="modalText">Initial Tax can be set to a max of 48% buy/sell. If the initial tax is above 20% round trip then the hardcoded tax will be 2%.</p> */}
          </div>
          <div onClick={()=>{setSelectedTokenType(3)}} className={selectedTokenType === 3 ? "baseCentered tokenSelection selectedToken" :"baseCentered tokenSelection"}>
              <p className="modalHeader">Token With no Tax and no Borrowed Liquidity</p>
              <p className="modalText">Select this token if you wish to start your own LP with a non taxable token.</p>
              <p className="modalText">There is a fee of 0.04 ETH paid upfront.</p>
           </div>
          {selectedTokenType && <button onClick={()=>{setModalState(1)}} className="launchButtons">SELECT</button>}
        </div>}
      {modalState === 1 && 
        <div className="baseCentered">
          <p className="modalHeader">Please Fill in the Fields</p>
          <label htmlFor="" className="text-[18px]">
              Name
            </label>
            <input
              type="text"
              name=""
              id="nameInput"
              placeholder="Pepe Coin"
              style={{color:"white"}}
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[30px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            <label htmlFor="" className="text-[18px]">
              Symbol (Don’t use the “$”)
            </label>
            <input
              type="text"
              name=""
              id="symbolInput"
              placeholder="Pepe"
              style={{color:"white"}}
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[30px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            {generalError && <p className="modalText red">{generalError}</p>}
          <button onClick={handleFirstInputClick} className="launchButtons">CONTINUE</button>
        </div>}
      {modalState === 2 && 
        <div className="baseCentered">
          <p className="modalHeader">Please Fill in the Fields</p>
          <label htmlFor="" className="text-[18px]">
              Total Supply
            </label>
            <input
              type="text"
              name=""
              id="supplyInput"
              style={{color:"white"}}
              placeholder="1,000,000,000"
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[10px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            {selectedTokenType === 1 &&
            <p className="text-[12px] ml-[10px] mb-[13px]">
              Total supply can only be between 1 and 999,999,999,999,999
            </p>}
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
            <p style={{color:maxWalletError ? "red":""}} className="text-[12px] ml-[10px] mb-[13px]">
              Max Wallet must be 0.2% or greater
            </p>
            {selectedTokenType !== 3 && <>
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
            <p style={{color:swapError ? "red":""}} className="text-[12px] ml-[10px] mb-[13px]">
              Choose between 0.2% and 5%
            </p></>}
            {generalError && <p className="modalText red">{generalError}</p>}
          <button onClick={handleSecondInputClick} className="launchButtons">CONTINUE</button>
        </div>}
      {modalState === 3 && 
        <div className="baseCentered">
          <p className="modalHeader">Please Fill in the Fields</p>
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
            <p style={{color:buyTaxError ? "red":""}}  className="text-[12px] ml-[10px] mb-[13px]">
              {selectedTokenType === 2 ? "Max Buy tax is 49.8% total" : "Max Buy tax is 49.6% total"}
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
            <p style={{color:sellTaxError ? "red":""}} className="text-[12px] ml-[10px] mb-[13px]">
            {selectedTokenType === 2 ? "Max Sell tax is 49.8% total" : "Max Sell tax is 49.6% total"}
            </p>
            {generalError && <p className="modalText red">{generalError}</p>}
          <button onClick={handleThirdInputClick} className="launchButtons">CONTINUE</button>
        </div>}
      {modalState === 5 && 
        <div className="baseCentered">
          <p className="modalHeader">Please Fill in the Fields</p>
          <label htmlFor="" className="text-[15px]">
              Website
            </label>
            <input
              type="text"
              name=""
              style={{color:"white"}}
              id="websiteInput"
              placeholder="www..."
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
              placeholder="...tg"
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[14px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            <label htmlFor="" className="text-[15px]">
              Dev Wallet
            </label>
            <input
              type="text"
              name=""
              id="devWalletInput"
              style={{color:"white"}}
              placeholder="0x..."
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[14px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            {/* <p className="text-[9px] ml-[10px] mt-[5px] mb-[29px]">
              Need a dev wallet?
            </p> */}
            <label htmlFor="" className="text-[15px]">
              Marketing Wallet
            </label>
            <input
              type="text"
              name=""
              style={{color:"white"}}
              id="marketingWalletInput"
              placeholder="0x..."
              className="text-[#696969] w-full h-[37px] block mt-[14px] mb-[14px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            />
            {generalError && <p className="modalText red">{generalError}</p>}
          <button onClick={handleFourthInputClick} className="launchButtons">CONTINUE</button>
        </div>}
      {modalState === 6 && 
        <div className="baseCentered">
          <p className="modalHeader">Please Select the Borrow Amount</p>
          <div className="bg-[#000000] pr-[14px] pt-[18px] pb-[18px] rounded-[15px] mb-[10px]">
              <p className="text-[#AAAAAA] text-[18px] tracking-[0.075em] mt-[7px]">
                BORROW LAUNCH LIQUIDITY
              </p>
              <p className="text-[22px] font-medium tracking-[0.075em] mb-[24px]">
                ETH
              </p>
              <p className="text-[#AAAAAA] text-[18px] tracking-[0.075em]">
                TOTAL AVAILABLE FUNDS
                </p>
                <p className="text-[22px] tracking-[0.075em] mb-[31px]">
                  {userData.totalAvailable ? userData.totalAvailable : 0 } ETH
                </p>
              <div className="flex items-center gap-1">
                <img src={ethereum} alt="" />
                <div>
                  <div style={{color:borrowAmountError ? "red":""}} className="flex text-[22px] font-medium tracking-[0.075em]">
                    <p style={{cursor:"pointer",marginRight:"5px"}} onClick={()=>{setBorrowedEth(borrowedEth == userData.totalAvailable ? userData.totalAvailable : borrowedEth + 1)}}>+</p> {borrowedEth} ETH <p style={{cursor:"pointer",marginLeft:"5px"}} onClick={()=>{setBorrowedEth(borrowedEth == 0 ? 0 : borrowedEth - 1)}}>-</p>
                  </div>

                  {/* <p className="text-[13px] text-[#AAAAAA] tracking-[0.075em]">
                    (~$3,612.56 USD)
                  </p> */}
                </div>
                
              </div>
              <p className="text-[14px] ml-[10px] mt-[5px] mb-[13px]">
              FEE: {(borrowedEth * 0.1).toFixed(2)} ETH
            </p>
              <div className="flex justify-between items-center mt-7">
                <p className="text-[13px] text-[#AAAAAA]">
                  WHEN YOU HIT LAUNCH, YOUR TOKEN WILL BE DEPLOYED WITH THE
                  BORROWED ETH.
                </p>
                <div className="flex flex-col items-end gap-[9px]">
                  {/* <Link className="underline text-[8px]">CHANGE NETWORK</Link> */}
                  {/* <button
                    onClick={handleDeployClick}
                    className="text-[14px] px-[40px] border-[1px] pt-[1px] rounded-[15px] bg-white text-black font-semibold tracking-[0.185em]"
                  >
                    LAUNCH
                  </button> */}
                </div>
              </div>
            </div>
            {generalError && <p className="modalText red">{generalError}</p>}
          <button onClick={handleFifthInputClick} className="launchButtons">CONTINUE</button>
        </div>}
      {modalState === 7 && 
        <div className="baseCentered">
          <p className="modalHeader">Please Verify Values</p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Dev Wallet
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {tokenInputs.devWallet}
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Marketing Wallet
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
          {tokenInputs.marketingWallet}
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Token Name
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
          {tokenInputs.name}
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Token Symbol
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
          {tokenInputs.symbol}
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Website
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
          {tokenInputs.website}
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Telegram
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
          {tokenInputs.telegram}
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Total Supply
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {tokenInputs.supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tokens
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Max Wallet
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {tokenInputs.maxWallet / 10} %
          </p>
          {selectedTokenType < 3 && <>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Swap ThreshHold
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {tokenInputs.swap / 10} %
          </p>
          {!modalOn.noTaxToken && <>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Marketing Buy Tax
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {tokenInputs.marketingBuyTax / 10} %
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Marketing Sell Tax
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {tokenInputs.marketingSellTax/ 10} %
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
          Dev Buy Tax
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {tokenInputs.devBuyTax / 10} %
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Dev Sell Tax
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {tokenInputs.devSellTax / 10} %
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Liquidity Buy Tax
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {tokenInputs.liqBuyTax / 10} %
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
          Liquidity Sell Tax
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {tokenInputs.liqSellTax / 10} %
          </p></>}</>}
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
          Eth Borrowed
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {borrowedEth } ETH
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            {borrowedEth > 0 ? "Deployment and Borrow Fee" :"Deployment Fee"}
          
          </p>
          { borrowedEth > 0 &&         <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {borrowedEth / 10} ETH
          </p>}
          { borrowedEth === 0 &&     <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {4 / 100} ETH {selectedTokenType === 3  ? "": "+ 0.4% of supply"}
          </p>}


            {generalError && <p className="modalText red">{generalError}</p>}
          <button disabled={txPending} onClick={handleSixthInputClick} className="launchButtons">DEPLOY</button>
        </div>}

      </div>

      {modalOn && <LaunchModal modalOn={modalOn} setModalOn={setModalOn} />}
    </section>
  );
};

export default LaunchToken;
