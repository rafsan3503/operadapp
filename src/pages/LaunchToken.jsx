import ethereum from "../assets/icons/ethereum.png";
import arrow from "../assets/icons/arrow.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import LaunchModal from "../components/LaunchModal";
import {  useOutletContext} from "react-router-dom";
import {trimAddress } from "../helperfunctions"



const LaunchToken = () => {
  const [modalOn, setModalOn] = useState(false);
  const [sellTaxError, setSellTaxError] = useState(false);
  const [buyTaxError, setBuyTaxError] = useState(false);
  const [swapError, setSwapError] = useState(false);
  const [maxWalletError, setMaxWalletError] = useState(false);
  const [borrowAmountError, setBorrowAmountError] = useState(false);
  const [noTaxToken, setNoTaxToken] = useState(false);
  const [borrowedEth, setBorrowedEth] = useState(0);
  const { unstakeEth,lendEth,txPending,userData,userBalance,connectWallet, addressOfUser } = useOutletContext();


    async function setTaxesZero(){
      if(noTaxToken){
        setNoTaxToken(false)
      } else {
        setNoTaxToken(true)
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
      console.log("Token Limits Met")
    let stringList = [nameInput,symbolInput,telegramInput,websiteInput]
    let addressList = [devWalletInput,marketingWalletInput]
    let numbersList = [supplyInput,maxWalletInput,swapInput,marketingBuyInput,marketingSellInput,devBuyInput,devSellInput,liqBuyInput,liqSellInput]

    setModalOn({stringList,addressList,numbersList,borrowedEth,noTaxToken})      
    }


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
        {/* <ul className="flex flex-wrap items-center gap-4 lg:gap-8">
          <li className="text-[15px]">🚀 Opera Trending</li>
          <li className="text-[9px] tracking-[0.075em]">
            #1{" "}
            <Link className="text-white hover:text-[#9847FF]">SHARKBITE</Link>
          </li>
          <li className="text-[9px] tracking-[0.075em]">
            #2 <Link className="text-white hover:text-[#9847FF]">bingAI</Link>
          </li>
          <li className="text-[9px] tracking-[0.075em]">
            #3{" "}
            <Link className="text-white hover:text-[#9847FF]">PAPA POWELL</Link>
          </li>
          <li className="text-[9px] tracking-[0.075em]">
            #4{" "}
            <Link className="text-white hover:text-[#9847FF]">MIAMICOIN</Link>
          </li>
          <li className="text-[9px] tracking-[0.075em]">
            #5{" "}
            <Link className="text-white hover:text-[#9847FF]">BEGONE THOT</Link>
          </li>
          <li className="text-[9px] tracking-[0.075em]">
            #6{" "}
            <Link className="text-white hover:text-[#9847FF]">
              JEKYL FINANCE
            </Link>
          </li>
        </ul> */}

        <div className="mt-0 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            {/* <label htmlFor="" className="text-[15px]">
              Token Type (Smart Contract)
            </label>
            <select
              name=""
              id=""
              className="text-[#696969] w-full h-[37px] block mt-[14px] bg-black border rounded-[6px] text-[11px] px-[10px]"
            >
              <option value="">Normal Token</option>
            </select> */}
            <p className="text-[9px] ml-[10px] mt-[5px] mb-[13px]">
              {/* Cost: 0.1 ETH */}
            </p>

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
            </p>
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
            <p className="text-[12px] ml-[10px] mb-[13px]">
              Total supply can be between 1 and 999,999,999,999,999
            </p>
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
            <div style={{display:"flex"}}>
            <input onChange={setTaxesZero} type="checkbox">

            </input>
            <p style={{marginLeft:"20px"}}>NO TAX TOKEN</p>
            </div>
            {!noTaxToken && <>
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
              Max Buy tax is 49.6% total
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
              Max Sell tax is 49.6% total
            </p>
            </>}
            {/* <div className="flex  items-center gap-[47px]">
              <div>
                <input type="checkbox" name="" id="tax" className="mr-[7px]" />
                <label htmlFor="tax">0% tax?</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name=""
                  id="sell-tax"
                  className="mr-[7px]"
                />
                <label htmlFor="sell-tax">Separate buy/sell tax?</label>
              </div>
              <div></div>
            </div> */}
          </div>

          {/* right */}
          <div>
            <div className="bg-[#000000] pr-[14px] pt-[18px] pb-[18px] rounded-[15px] mb-[60px]">
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
                  {userData.totalAvailable } ETH
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
                  <button
                    onClick={handleDeployClick}
                    className="text-[14px] px-[40px] border-[1px] pt-[1px] rounded-[15px] bg-white text-black font-semibold tracking-[0.185em]"
                  >
                    LAUNCH
                  </button>
                </div>
              </div>
            </div>

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
          </div>
        </div>
      </div>

      {modalOn && <LaunchModal modalOn={modalOn} setModalOn={setModalOn} />}
    </section>
  );
};

export default LaunchToken;
