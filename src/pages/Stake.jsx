import ethereum from "../assets/icons/ethereum.png";
import ethereum2 from "../assets/icons/ethereum2.png";
import arrow from "../assets/icons/arrow.png";

import { useState } from "react";
import OperaStakeModal from "../components/OperaStakeModal";
import {  useOutletContext} from "react-router-dom";
import {trimAddress } from "../helperfunctions"
const Stake = () => {
  const [modalOn, setModalOn] = useState(false);
  const [ethToStake, setEthToStake] = useState(0);
  const [operaToStake, setOperaToStake] = useState(0);
  const [ethToWithdraw, setEthToWithdraw] = useState(0);
  const { getReward,userEarned,totalStaked,usersRevenue,stakedBalanceV2,unstakeOpera,unstakeV1,unstakeEth,lendEth,txPending,userData,userBalance,connectWallet, addressOfUser,requestRevenue,userOperaBalance,userStakedAmount,stakeOpera, } = useOutletContext();
  const modalHandler = () => {
    setModalOn(!modalOn);
  };

  function handleInputChangeStakedEth(input){
    try{
      setEthToStake(parseInt(input))
    } catch{
      setEthToStake(0)
    }
  }

  function setOperaStake(input){
    try{
      setOperaToStake(parseInt(input))
    } catch{
      setOperaToStake(0)
    }
  }



  function handleUnstakeEth(input){
    try{
      setEthToWithdraw(parseInt(input))
    } catch{
      setEthToWithdraw(0)
    }
  }

  function setInputValue(input){
    const inputContainter = document.getElementById("inputETHLent")
    inputContainter.value = (parseInt(input))
  }
  function setInputValueWithdraw(input){
    const inputContainter = document.getElementById("inputEthUnstake")
    inputContainter.value = (parseInt(input))
  }
  function setInputValueStaked(input){
    const inputContainter = document.getElementById("inputOperaStaked")
    inputContainter.value = (parseInt(input))
  }
  function handleStakedMax(){
    let maxAmount = parseInt(String(((userOperaBalance) / 10**9)).split(".")[0])
    setInputValueStaked(maxAmount)
    setOperaStake(parseFloat(maxAmount))
  }
  function handleEthLentMaxClick(){

    let maxAmount = parseInt(String(((userBalance) / 10**18)).split(".")[0])
    setInputValue(maxAmount)
    setEthToStake(parseFloat(maxAmount).toFixed(1))
  }
  function handleUnstakeEthMax(){
    let maxAmount = userData.usersLentEth 
    setInputValueWithdraw(maxAmount)
    setEthToWithdraw(parseInt(maxAmount))
  }
  return (
    <section>
      <div className="flex justify-between items-center pt-[44px] pb-[30px] pr-[50px]">
        <h4 className="lg:text-[24px] ml-14 lg:ml-0 tracking-[0.075em]">
          LEND ETH
        </h4>
        <div className="flex items-center">
          <img src={ethereum} className="hidden lg:block" alt="" />
          <button onClick={()=>{if(addressOfUser)return;connectWallet()}} className="flex items-center text-[10px] lg:text-[20px] text-[#85F983] bg-[#1A2218] pl-4 pr-4 rounded-2xl ml-1">
            {addressOfUser ? trimAddress(addressOfUser) : "CONNECT WALLET"} <img src={arrow} className="ml-5 w-[10px] lg:w-[27px]" alt="" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:pr-[50px]">
        <div className="bg-[#000000] p-[18px] pb-[45px] pl-[28px] rounded-[15px]">
          <p className="flex justify-between text-[#AAAAAA]">
            LEND 
            {/* <span className="text-[8px]">CHANGE NETWORK</span> */}
          </p>
          <p className="text-[22px] leading-[30px] mb-14">ETH</p>

          <div className="relative ">
            <img
              className="absolute w-[19px] h-[19px] mt-[19px] ml-[10px]"
              src={ethereum}
              alt=""
            />
            <p style={{cursor:"pointer"}} onClick={handleEthLentMaxClick} className="absolute right-0 flex top-5 text-[13px] text-[#59FF56] mr-4">
              MAX
            </p>
            <input
              id="inputETHLent"
              onChange={(_)=>{handleInputChangeStakedEth(_.target.value)}}
              type="text"
              className="border border-white bg-black text-[22px] p-[13px] pl-[35px] w-full  rounded-[11px]"
              defaultValue="0"
            />
          </div>
          <p className="text-[#828282] mt-[6px] text-[13px] mb-[60px]">
            WALLET BALANCE: <span className="text-white">{(userBalance / 10**18).toFixed(2)} ETH</span>
          </p>

          {/* <p className="text-[#828282] mt-[6px] text-[10px] mb-[8px]">
            PROJECTED DAILY YIELD:{" "}
            <span className="text-white">0.04 ETH ($72.83 USD)</span>
          </p> */}
          <p className="text-[#828282] mt-[6px] text-[13px] flex items-center gap-1 mb-8">
            LENT BALANCE:
            <span className="text-white flex items-center gap-1">
            {userData.usersLentEth? userData.usersLentEth  : 0} ETH ({userData.usersLentEth?userData.usersLentEth  : 0}{" "}
              <img   src={arrow} className="w-[8px] h-2" alt="" /> {!userData.usersLentEth ? parseInt(ethToStake) : (parseInt(userData.usersLentEth ) + parseInt(ethToStake))})
            </span>
          </p>
          <button
          disabled={txPending}
            onClick={()=>{lendEth(parseInt(ethToStake * 10**18))}}
            className="pl-[47px] pr-[47px] pt-[2px] pb-[3px] border border-white rounded-[13px] mb-[13px]"
          >
            LEND
          </button>
          <p className="text-[13px]">
            {/* YOU MUST STAKE $OPERA + ETH TO JOIN OUR DAO AND LEND. */}
            <br />

            THE CURRENT MINIMUM IS 1 ETH.
            <br />
            MUST STAKE 2.5 MILLION $OPERA TO LEND.
          </p>
        </div>

        <div className="bg-[#000000] p-[18px] pb-[45px] pl-[28px] rounded-[15px]">
          <p className="flex justify-between text-[#AAAAAA]">
            STAKE
          </p>
          <p className="text-[22px] leading-[30px]">OPERA</p>
          <p className="text-[#AAAAAA] text-[10px] mb-7">ETHEREUM</p>
          {/* <p className="text-[22px] leading-[30px] mb-5">CURRENT APY {parseFloat((1000000000 / (totalStaked/10**9)) * 120).toFixed(1)} %</p> */}
          {/* <p className="text-[#AAAAAA] text-[8px] mb-14">ETHEREUM NETWORK</p> */}
          {/* <div className="relative ">
            <img
              className="absolute w-[19px] h-[19px] mt-[19px] ml-[10px]"
              src={ethereum}
              alt=""
            />
            <p style={{cursor:"pointer"}} onClick={handleStakedMax} className="absolute right-0 flex top-5 text-[13px] text-[#59FF56] mr-4">
              MAX
            </p>
            <input
              id="inputOperaStaked"
              onChange={(_)=>{setOperaStake(_.target.value)}}
              type="text"
              className="border border-white bg-black text-[22px] p-[13px] pl-[35px] w-full  rounded-[11px]"
              defaultValue="0"
            />
          </div> */}
          
          <p className="text-[#828282] mt-[6px] text-[12px] mb-[6px]">
            WALLET BALANCE: <span className="text-white">{parseFloat(userOperaBalance/10**9).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $OPERA</span>
          </p>
          <p className="text-[#828282] text-[12px] mb-[6px]">
            STAKED BALANCE: <span className="text-white">{parseFloat(stakedBalanceV2/10**9).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $OPERA</span>
          </p>
          <p className="text-[#828282] text-[12px] mb-[16px]">
            CURRENT REWARDS: <span className="text-white">{parseFloat(userEarned/10**9).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $OPERA</span>
          </p>
          {/* { userStakedAmount > 0 && <div>
            <button onClick={()=>{unstakeV1()}} className="pl-[47px] pr-[47px] pt-[2px] pb-[3px] border border-white rounded-[13px] mb-[2px]">
            Withdraw V1 Staked
          </button>
          <p className="text-[#828282] mt-[6px] text-[12px] mb-[20px]">
            V1 STAKED AMOUNT: <span className="text-white">{parseFloat(userStakedAmount/10**9).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $OPERA</span>
          </p>
          </div> } */}



          {/* <p className="text-[#828282] mt-[6px] text-[10px] mb-[8px]">
            PROJECTED DAILY YIELD:{" "}
            <span className="text-white">0.04 ETH ($72.83 USD)</span>
          </p>
          <p className="text-[#828282] mt-[6px] text-[10px] flex items-center gap-1 mb-8">
            STAKED BALANCE:
            <span className="text-white flex items-center gap-1">
              0.04 ETH ($72.83 USD)2.65{" "}
              <img src={arrow} className="w-[8px] h-2" alt="" /> 3.65 ETH
            </span>
          </p> */}
          {/* <button onClick={()=>{stakeOpera(parseInt(operaToStake)*10**9)}} className="pl-[47px] pr-[47px] pt-[2px] pb-[3px] border border-white rounded-[13px] mb-[13px]">
            STAKE
          </button> */}
          <button onClick={()=>{unstakeOpera(userStakedAmount)}} className="pl-[47px] pr-[47px] pt-[2px] pb-[3px] border border-white rounded-[13px] ml-[15px] mb-[13px]">
            WITHDRAW
          </button>
          <button onClick={()=>{getReward()}} className="pl-[47px] pr-[47px] pt-[2px] pb-[3px] border border-white rounded-[13px] ml-[15px] mb-[13px]">
            CLAIM
          </button>
          {/* <p className="text-[10px]">
            YOU MUST STAKE $OPERA + ETH TO JOIN OUR DAO AND LEND.
            <br />
            THE CURRENT MINIMUM IS 1 ETH.
          </p> */}
        </div>
      </div>
      {/* <p className="text-[10px] tracking-[0.075em] mt-[27px] mb-[67px]">
        <span className="text-[#828282]">NOTE:</span> YIELD FROM NORMAL STAKING
        COMES FROM OPERA TRADING FEES AND TOKEN EMISSIONS.
      </p> */}

      <div className="mt-[24px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:pr-[50px]">
        <div className="bg-black pt-[25px] pl-[28px] pb-[17px] pr-[14px] rounded-[15px]">
          <p className="text-[#AAAAAA] text-[19px] tracking-[0.075em]">
            TOTAL LENT FUNDS
          </p>
          <p className="text-[22px] tracking-[0.075em] mb-[31px]">
            {userData.totalLentEth ? userData.totalLentEth  : 0} ETH
          </p>
          <p className="text-19px] text-[#AAAAAA]  tracking-[0.075em]">
            YOUR SHARE
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[25px] tracking-[0.075em]">{userData.usersLentEth ? parseFloat((parseInt(userData.usersLentEth) / parseInt(userData.totalLentEth))*100).toFixed(1) : 0} %</p>
              <p className="text-[13px]">
                <span className="text-[#AAAAAA]">VALUE:</span> {userData.usersLentEth ?   userData.usersLentEth : 0} ETH
                {/* ($4801.25 USD) */}
              </p>
            </div>
            <button onClick={()=>{unstakeEth(parseInt(ethToWithdraw ))}}  className="pl-[47px] pr-[47px] pt-[2px] pb-[2px] border border-white rounded-[13px] mb-[13px]">
              RECLAIM
            </button>
          </div>
          <p className="text-[#828282] mt-[6px] text-[13px] flex items-center gap-1 mb-8">
            LENT BALANCE:
            <span className="text-white flex items-center gap-1">
            {userData.usersLentEth ?userData.usersLentEth :0} ETH ({userData.usersLentEth ? userData.usersLentEth  : 0}{" "}
              <img   src={arrow} className="w-[8px] h-2" alt="" /> {userData.usersLentEth ? (parseInt(userData.usersLentEth ) - parseInt(ethToWithdraw)) :0})
            </span>
          </p>
          <div className="relative mt-[19px]">
            <img
              className="absolute w-[19px] h-[19px] mt-[19px] ml-[10px]"
              src={ethereum}
              alt=""
            />
            <p style={{cursor:"pointer"}} onClick={handleUnstakeEthMax} className="absolute right-0 flex top-5 text-[13px] text-[#59FF56] mr-4">
              MAX
            </p>
            <input
              id="inputEthUnstake"
              onChange={(_)=>{handleUnstakeEth(_.target.value)}}
              type="text"
              className="border border-white bg-black text-[22px] p-[13px] pl-[35px] w-full  rounded-[11px]"
              defaultValue="0"
            />
          </div>
        </div>

        <div className="bg-black pt-[25px] pl-[28px] pb-[17px] pr-[14px] rounded-[15px]">
          {/* <p className="text-[#AAAAAA] text-[19px] tracking-[0.075em]">
            YOUR TOTAL REVENUE
          </p>
          <p className="text-[22px] tracking-[0.075em] mb-[31px]">{userData.usersRevenue ? (userData.usersRevenue / 10**18).toFixed(3) : 0} ETH</p> */}
          <p className="text-[#AAAAAA] text-[19px] tracking-[0.075em]">
            YOUR CLAIMABLE REVENUE
          </p>
          <p className="text-[22px] tracking-[0.075em] mb-[31px]">{(usersRevenue / 10**18).toFixed(3) } ETH</p>
          <button onClick={()=>{requestRevenue()}}  className="pl-[47px] pr-[47px] pt-[2px] pb-[2px] border border-white rounded-[13px] mb-[13px]">
              REQUEST REVENUE
            </button>
          {/* <p className="text-15px] text-[#AAAAAA]  tracking-[0.075em]">
            CLAIMABLE
          </p> */}
          {/* <div className="flex items-center justify-between">
            <div>
              <p className="text-[22px] tracking-[0.075em]">$545.54 USD</p>
              <p className="text-[10px]">
                <span className="text-[#AAAAAA]">TOTAL STAKED ETH VALUE:</span>{" "}
                2.65 ETH ($4801.25 USD)
              </p>
            </div>
            <button className="pl-[47px] pr-[47px] pt-[2px] pb-[2px] border border-white rounded-[13px] mb-[13px]">
              CLAIM
            </button>
          </div> */}
        </div>
      </div>
      {modalOn && (
        <OperaStakeModal modalHandler={modalHandler} />
      )}
    </section>
  );
};

export default Stake;
