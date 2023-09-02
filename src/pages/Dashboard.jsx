import ethereum from "../assets/icons/ethereum.png";
import arrow from "../assets/icons/arrow.png";
import { Link } from "react-router-dom";
import triangle from "../assets/icons/triangle.png"; 
import {  useOutletContext} from "react-router-dom";
import {trimAddress } from "../helperfunctions"
import { useState } from "react";
import "../css/Dashboard.css"
// eslint-disable-next-line react/prop-types
const Dashboard = () => { 
  const { lendEth,userBalance,requestRevenue,usersRevenue,numberOfLenders,userData,connectWallet, addressOfUser } = useOutletContext();
  const [ lendEthAmount,setLendEthAmount] = useState(0)
  return (
    <section>
      <div className="flex justify-between items-center pt-[44px] pb-[30px] lg:pr-[50px]"> 
        <h4 className="text-[24px] tracking-[0.075em] ml-14 lg:ml-0">Dashboard</h4>
        <div className="flex items-center">
          <img src={ethereum} className="hidden lg:block" alt="" />
          <button onClick={()=>{if(addressOfUser)return;connectWallet()}} className="flex items-center text-[10px] lg:text-[20px] text-[#85F983] bg-[#1A2218] pl-4 pr-4 rounded-2xl ml-1">
            {addressOfUser ? trimAddress(addressOfUser) : "CONNECT WALLET"} <img src={arrow} className="ml-5 w-[10px] lg:w-[27px]" alt="" />
          </button>
        </div>
      </div>
      <div className="doubleDash">

          <div className="dashHalf">

        <p className="text-[22px] mb-[34px]">Opera Revenue</p>
        <p className="text-[#AAAAAA] text-[15px] tracking-[0.075em]">
          Total Revenue Generated
        </p>
        <span style={{alignItems:"center",display:"flex"}}>


        <p className="text-[58px] tracking-[0.075em] font-semibold">{parseFloat(userData.totalRevenue  / 10**18).toFixed(4)} </p><img src={ethereum} style={{marginLeft:"5px",width:"40px",height:"50px"}} alt="" />
        </span>
        <div className="flex items-center flex-wrap gap-8 mt-4">
          <div>
            <p className="text-[#AAAAAA] text-[15px] tracking-[0.075em] mb-1">
              DAILY EARNINGS (EST.)
            </p>
            <p className="text-[#FFFFFF] text-4xl font-medium">{(userData.dailyRevenue / 10** 18).toFixed(4)} ETH</p>
          </div>
          {/* <div className="bg-[#4E4E4E] w-[1px] h-[71px]"></div> */}
          {/* <div>
            <p className="text-[#AAAAAA] text-[15px] tracking-[0.075em] mb-1">
              STAKED BALANCE
            </p>
            <p className="text-[#FFFFFF] text-4xl font-medium">{userData.usersLentEth} ETH</p>
          </div> */}
          {/* <div className="bg-[#4E4E4E] w-[1px] h-[71px]"></div> */}
          {/* <div>
            <p className="text-[#AAAAAA] text-[15px] tracking-[0.075em] mb-1">
              BORROWED LIQUIDITY
            </p>
            <p className="text-[#FFFFFF] text-4xl font-medium">2 ETH</p>
          </div> */}
        </div>
        {/* <p className="text-[#FFFFFF] text-[13px] tracking-[0.075em] mt-[34px]">
          YOUR LIQUIDITY IS CURRENTLY BEING USED OPTIMALLY.
        </p> */}
          </div>
          <div className="dashHalf">
          <div className="flex justify-between">
              <p className="text-[#AAAAAA] text-[15px] tracking-[0.075em] mt-[7px]">
                DAO POOLED FUNDS (BORROWABLE)
              </p>
              <Link
                className="underline text-[#FFFFFF] text-[9px] tracking-[0.185em] font-semibold"
                style={{ fontFamily: "Inter" }}
                to="/stake"
              >
                WITHDRAW SHARE
              </Link>
            </div>
            <p className="flex items-baseline gap-[7px] text-[22px] font-medium tracking-[0.075em] mt-[3px] mb-[31px]">
              {userData.totalAvailable} ETH
              {/* <img src={triangle} alt="" /> */}
              {/* <span className="text-[11px] font-medium">100 ETH</span> */}
            </p>
            <div className="flex items-end flex-wrap justify-between">
              <div>
                <p className="text-[#AAAAAA] tracking-[0.075em] text-[15px]">
                  YOUR SHARE
                </p>
                <p className="text-[22px] font-medium tracking-[0.075em] ">
                  {userData.totalLentEth ? ((userData.usersLentEth / userData.totalLentEth)*100).toFixed(1) : "0"}%
                </p>
              </div>
              <div>
                <p className="text-[#AAAAAA] tracking-[0.075em] text-[15px]">
                  LENDERS
                </p>
                <p className="text-[22px] font-medium tracking-[0.075em] ">
                  {numberOfLenders}
                </p>
              </div>
              <div>
                <p className="text-[#AAAAAA] tracking-[0.075em] text-[15px]">
                  CLAIMABLE YIELD
                </p>
                <p className="text-[22px] font-medium tracking-[0.075em] ">
                  {(usersRevenue / 10**18).toFixed(3)} ETH
                </p>
              </div>
              <button onClick={requestRevenue} className="tracking-[0.185em] text-[9px] font-semibold text-black bg-white pl-[38px] pr-[38px] pt-1 rounded-[15px]">
                CLAIM
              </button>
            </div>
          </div>

      </div>



      {/* <div className="mt-[35px] lg:mr-[50px] grid grid-cols-1 lg:grid-cols-2 gap-9"> */}
      <div className="doubleDash">

          <div className="dashHalf">
          <div className="bg-[#000000] pl-[28px] pr-[14px] pb-[18px] rounded-[15px]">
            <p className="text-[#AAAAAA] text-[15px] tracking-[0.075em] mt-[7px]">
              LEND FUNDS
            </p>
            <p className="text-[22px] font-medium tracking-[0.075em] mb-[24px]">
              ETHEREUM
            </p>
            <div className="mb-[15px] flex justify-between items-center mt-4">
              <p className="text-[14px]">
              BALANCE: {(userBalance/10**18).toFixed(2)} ETH
              </p>
            </div>
            <div className="flex items-center gap-1">
              <img src={ethereum} alt="" />
              <div>
                <p className="text-[22px] font-medium tracking-[0.075em]">
                 <span style={{cursor:"pointer"}} onClick={()=>{setLendEthAmount(lendEthAmount + 1)}}>+</span> {lendEthAmount} ETH <span style={{cursor:"pointer"}} onClick={()=>{if(lendEthAmount > 0){setLendEthAmount(lendEthAmount - 1)}}}>-</span>
                </p>
                {/* <p className="text-[13px] text-[#AAAAAA] tracking-[0.075em]">
                  (~$3,612.56 USD)
                </p> */}
              </div>
              
            </div>
            <button onClick={()=>{lendEth(lendEthAmount*10**18)}} className="text-[14px] w: pr-[52px] mt-[15px] pl-[52px] border-[1px] pt-[1px] rounded-[15px]">
                  LEND
                </button>

            <div className="flex justify-between items-center mt-7">
              <p className="text-[16px] mr-5">
                YOUR LIQUIDITY WILL BE TRANSFERRED TO THE DAO POOL + YOU GET
                SHARES OF REVENUE.
              </p>

            </div>
          </div>
          </div>
          <div className="dashHalf2">
          <p className="text-[#AAAAAA] text-[25px] tracking-[0.075em]">
          Total Eth Lent
        </p>
        <span style={{alignItems:"center",display:"flex"}}>


        <p className="text-[40px] tracking-[0.075em] font-semibold">{userData.totalLentEth ? userData.totalLentEth:0} </p><img src={ethereum} style={{marginLeft:"5px",width:"40px",height:"50px"}} alt="" />
        </span>

                {/* <Link className="underline text-[8px]">CHANGE NETWORK</Link> */}


          </div>
      </div>
     
    </section>
  );
};

export default Dashboard;
