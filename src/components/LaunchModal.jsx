import { Link } from "react-router-dom";
import ethereum3 from "../assets/icons/ethereum3.png";
import { useState } from "react";
import Web3 from 'web3';
import { FactoryABI } from "../abis/FactoryABI";
import { addresses } from "../helperfunctions";
import { TaxDeployerABI } from "../abis/TaxDeployerABI";
import { NoTaxDeployerABI } from "../abis/NoTaxDeployerABI";
const LaunchModal = ({ modalOn,setModalOn }) => {
  console.log(modalOn)
  const [txPending, setTxPending] = useState(false);
  const [tokenDeployed, setTokenDeployed] = useState(false);
  async function launchToken(inputObject){
    console.log(inputObject)
    try{
      let web3;
      if(window.ethereum){
          web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
      } else if(window.web3){
          web3 = new Web3(window.web3.currentProvider)
      }
          if(inputObject.borrowedEth === 0){
            if(inputObject.noTaxToken){
              const factoryContract = new web3.eth.Contract(NoTaxDeployerABI,addresses["notaxDeployer"])
              let fee = 4 * 10**16
              let response = await factoryContract.methods.deployToken(inputObject.stringList,[inputObject.numbersList[0],inputObject.numbersList[1]]).send({value:fee,from:window.web3.currentProvider.selectedAddress})
              // console.log(response)
              setTokenDeployed(response.events.tokenDeployed.returnValues.token)

            } else {
              const factoryContract = new web3.eth.Contract(TaxDeployerABI,addresses["taxDeployer"])
              let fee = 4 * 10**16
              let response = await factoryContract.methods.deployToken(inputObject.stringList,inputObject.addressList,inputObject.numbersList).send({value:fee,from:window.web3.currentProvider.selectedAddress})
              setTokenDeployed(response.events.tokenDeployed.returnValues.token)
            }

          } else {
            const factoryContract = new web3.eth.Contract(FactoryABI,addresses["factory"])
            let fee = inputObject.borrowedEth * 10**17
            let response = await factoryContract.methods.deployToken(inputObject.stringList,inputObject.addressList,inputObject.numbersList,inputObject.borrowedEth).send({value:fee,from:window.web3.currentProvider.selectedAddress})
            setTokenDeployed(response.events.tokenDeployed.returnValues.token)
          }

          setTxPending(false)
  
      } catch {
        setTxPending(false)
      }
  }
  if(!tokenDeployed){
    return (
      <div
        className="absolute top-0 backdrop-blur-sm bg-black/10 bottom-[-100%] right-0 left-0"
        // onClick={()=>{setModalOn(false)}}
      >
        {txPending && 
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
             <p className="text-[22px] text-center tracking-[0.075em] font-medium">
PLEASE CONFIRM THE TRANSACTION
             </p>

           </div>
         </div>
        }
        {!txPending && <div className="bg-black lg:w-[578px] mx-auto mt-[150px] pt-[50px] pb-[25px] border border-slate-900 rounded-[15px]">

          <p className="text-[32px] text-center tracking-[0.075em] font-medium">
            Please review your settings
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Dev Wallet
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.addressList[0]}
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Marketing Wallet
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.addressList[1]}
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Token Name
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.stringList[0]}
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Token Symbol
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.stringList[1]}
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Website
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.stringList[3]}
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Telegram
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.stringList[2]}
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Total Supply
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.numbersList[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tokens
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Max Wallet
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.numbersList[1] / 10} %
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Swap ThreshHold
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.numbersList[2] / 10} %
          </p>
          {!modalOn.noTaxToken && <>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Marketing Buy Tax
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.numbersList[3] / 10} %
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Marketing Sell Tax
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.numbersList[4] / 10} %
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
          Dev Buy Tax
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.numbersList[5] / 10} %
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Dev Sell Tax
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.numbersList[6] / 10} %
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            Liquidity Buy Tax
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.numbersList[7] / 10} %
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
          Liquidity Sell Tax
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.numbersList[8] / 10} %
          </p></>}
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
          Eth Borrowed
          </p>
          <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.borrowedEth } ETH
          </p>
          <p className="text-[22px] text-center tracking-[0.075em] font-medium">
            {modalOn.borrowedEth > 0 ? "Deployment and Borrow Fee" :"Deployment Fee"}
          
          </p>
          { modalOn.borrowedEth > 0 &&         <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {modalOn.borrowedEth / 10} ETH
          </p>}
          { modalOn.borrowedEth === 0 &&     <p className="text-[12px] text-center tracking-[0.075em] mb-[15px] font-medium">
            {4 / 100} ETH {modalOn.noTaxToken  ? "": "+ 0.4% of supply"}
          </p>}



          <div className="flex flex-col items-center gap-[9px]">
                  <button
                  disabled={txPending}
                    onClick={()=>{setTxPending(true);launchToken(modalOn)}}
                    className="text-[14px] px-[40px] border-[1px] pt-[1px] rounded-[15px] bg-white text-black font-semibold tracking-[0.185em]"
                  >
                    LAUNCH
                  </button>
          </div>
          <p className="text-white text-center text-[10px] mt-[22px] tracking-[0.075em]">

          {/* VIA ETHERSCAN.{" "} */}
          <span style={{cursor:"pointer"}} onClick={()=>{setModalOn(false)}} className="text-[#59FF56]">BACK</span>
        </p>
        </div>}
      </div> )
  }
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
          GO TO  TO DEXTOOLS TO TRADE.
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
  );
};

export default LaunchModal;
