import ethereum from "../assets/icons/ethereum.png";
import arrow from "../assets/icons/arrow.png";
import { Link } from "react-router-dom";
import {trimAddress } from "../helperfunctions"
import {  useOutletContext} from "react-router-dom";
const Governance = () => {
  const { voteInput,connectWallet, addressOfUser,userData } = useOutletContext();
  const tempList = [
    {name:"Opera",symbol:"oper",address:"0x11c68f5c28684FD553160aC89b32c1F6390e7F33"},
    {name:"Tester2",symbol:"berd",address:"0x11c68f5c28684FD553160aC89b32c1F6390e7F33"},
    {name:"Tester4",symbol:"tet",address:"0x11c68f5c28684FD553160aC89b32c1F6390e7F33"},
    {name:"Sigma",symbol:"sdmg",address:"0x11c68f5c28684FD553160aC89b32c1F6390e7F33"},
  ]

  function getState(blocktime,lobbyId, state){
    const day =  86400
    const week =  604800
    const currentTime = parseInt(Date.now()/1000);
    if(lobbyId === 0){
      if(currentTime > blocktime + (day*3)){
        return 1
      } else {
        return 5
      }
    } else {
      if(state === 1){
        if(currentTime > blocktime + (day)){
          return 2
        } else {
          return 3
        }
      } else if(state === 2){
        if(currentTime > blocktime + (week)){
          return 1
        } else {
          return 5
        }
      } else if(state === 3){
        if(currentTime > blocktime + (day)){
          return 6
        } else {
          return 7
        }
      }else if(state === 4){
        return 4
      }
    }
    //start vote is code 1, complete vote is code 2, place a vote is code 3, lp removed is code 4, on cooldown is code 5, ready to remove lp is 6, lp remove cooldown is 7
  }
  return (
    <section>
      <div className="flex justify-between items-center pt-[44px] pb-[30px] pr-[50px]">
        <h4 className="text-[24px] ml-14 lg:ml-0 tracking-[0.075em]">
          Governance
        </h4>
        <div className="flex items-center">
          <img src={ethereum} className="hidden lg:block" alt="" />
          <button onClick={()=>{if(addressOfUser)return;connectWallet()}} className="flex items-center text-[10px] lg:text-[20px] text-[#85F983] bg-[#1A2218] pl-4 pr-4 rounded-2xl ml-1">
            {addressOfUser ? trimAddress(addressOfUser) : "CONNECT WALLET"} <img src={arrow} className="ml-5 w-[10px] lg:w-[27px]" alt="" />
          </button>
        </div>
      </div>
{/* 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:mr-[50px]">
        <div className="pt-[28px] px-[18px] pb-[32px] bg-black rounded-[15px]">
          <p className="text-[#AAAAAA] text-[15px] tracking-[0.075em] ml-[10px]">
            LIQUIDITY USAGE
          </p>
          <p className="text-[31px] ml-[10px]">
            100 ETH IN <br />
            DAO POOL
          </p>
          <p className="text-[18px] text-[#AAAAAA] font-medium tracking-[0.075em] ml-[10px]">
            70 LENDERS
          </p>

          <div className="w-full h-[11px] bg-[#5A5A5A] rounded-[17px] overflow-hidden mt-14">
            <div className="bg-[#D9D9D9] h-full w-[35%]"></div>
          </div>
          <p className="text-[15px] text-[#AAAAAA] tracking-[0.075em] mt-[11px] mb-[63px] ml-[10px]">
            27 ETH BEING USED
          </p>
          <button className="bg-white text-black w-[182px] h-[25px] font-semibold text-[14px] tracking-[0.0185em] rounded-[13px] ml-[10px]">
            ALL PROJECTS
          </button>
        </div>

        <div className="pt-[28px] px-[28px] pb-[32px] bg-black rounded-[15px]">
          <p className="text-[#AAAAAA] text-[15px] tracking-[0.075em]">
            POOL HEALTH
          </p>
          <p className="text-[22px]">1,542 ETH ALL-TIME</p>
          <p className="text-[11px] text-[#AAAAAA] font-medium tracking-[0.075em]">
            2,040 LENDERS PAID
          </p>

          <p className="text-[#AAAAAA] text-[15px] tracking-[0.075em] mt-[45px]">
            CURRENT DAO REVENUE
          </p>
          <p className="text-[22px]">
            7.55 ETH PER DAY <span className="text-[15px]">approx.</span>{" "}
          </p>

          <p className="text-[22px] font-medium tracking-[0.075em] mt-[37px] mb-[30px]">
            27% OF DAO FUNDS
            <br />
            ARE BEING USED.
          </p>
          <button className="bg-white text-black w-[182px] h-[25px] font-semibold text-[14px] tracking-[0.0185em] rounded-[13px]">
            LEND NOW
          </button>
        </div>

        <div className="pt-[28px] px-[28px] pb-[32px] bg-black rounded-[15px]">
          <p className="text-[#AAAAAA] text-[15px] tracking-[0.075em]">
            OVERALL PERFORMANCE
          </p>
          <p className="text-[29px] font-medium mt-5">200 - 300</p>
          <p className="text-[15px] text-[#AAAAAA] tracking-[0.075em]">
            TOTAL PROJECTS FUNDED
          </p>

          <div className="flex gap-5 mt-[35px] mb-[60px]">
            <div className="border pt-[59px] pl-[7px] pb-[6px] rounded-[6px] w-[101px]">
              <p className="text-[9px]">
                77
                <br />
                PROJECTS
                <br />
                ALIVE NOW
              </p>
            </div>
            <div className="border pt-[59px] pl-[7px] pb-[6px] rounded-[6px] w-[101px]">
              <p className="text-[9px]">
                700+
                <br />
                PEOPLE HAVE
                <br />
                USED OPERA
              </p>
            </div>
            <div className="border pt-[59px] pl-[7px] pb-[6px] rounded-[6px] w-[101px]">
              <p className="text-[9px]">
                1,500+
                <br />
                TOTAL ETH
                <br />
                LENT
              </p>
            </div>
          </div>
          <button className="bg-white text-black w-[182px] h-[25px] font-semibold text-[14px] tracking-[0.0185em] rounded-[13px]">
            ALL PROJECTS
          </button>
        </div>
      </div> */}

      <div className="mt-[43px]">
        <p className="text-[24px] tracking-[0.075em] mb-9">
          VOTE TO RETURN LIQUIDITY
        </p>
        <div >

          <table className="mr-[50px] border-separate border-spacing-y-[13px]">

            <thead>
              <tr>
                <th className="text-[#AAAAAA] text-[15px] tracking-[0.075em] font-normal text-left pl-[18px]">
                  NAME
                </th>
                <th className="text-[#AAAAAA] text-[15px] tracking-[0.075em] font-normal text-left">
                  SYMBOL
                </th>
                <th className="text-[#AAAAAA] text-[15px] tracking-[0.075em] font-normal text-left">
                  ADDRESS
                </th>
                <th className="text-[#AAAAAA] text-[15px] tracking-[0.075em] font-normal">
                  VOTE
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody >
            {userData.deployedTokens && userData.deployedTokens.map((_,index)=>{

              let codeOfToken = 99
              try{
                codeOfToken = getState(userData.tempVoteList[_.tokenCount].blocktime,userData.tempVoteList[_.tokenCount].lobbyId,userData.tempVoteList[_.tokenCount].state )
              }catch {
                codeOfToken = 99
              }
              
            return (              <tr key={index} className="bg-black ">
            <td className="text-xl tracking-[0.075em] py-[18px] pl-[18px]  rounded-tl-[6px] rounded-bl-[6px] w-[35%]">
              {_.name}
            </td>
            <td className="text-[#828282] text-[14px] tracking-[0.075em]  w-[16.6%]">
            {_.symbol}
            </td>
            <td className="text-[16px] tracking-[0.075em]  w-[0%]">
            {_.token}
            </td>
            <td className="pl-10 w-[16.6%] ">
              {codeOfToken === 1 &&               
              <button onClick={()=>{voteInput(_.tokenCount,codeOfToken,false)}} className="pt-2 pb-2 bg-transparent border rounded-[6px] w-[119px] text-[14px] font-semibold tracking-[0.185em] ">
                Start Vote
              </button>}
              {codeOfToken === 2 &&               
              <button onClick={()=>{voteInput(_.tokenCount,codeOfToken,false)}} className="pt-2 pb-2 bg-transparent border rounded-[6px] w-[119px] text-[14px] font-semibold tracking-[0.185em] ">
                Complete Vote
              </button>}
              {codeOfToken === 3 && <div className="voteButtonDiv">             
              <button onClick={()=>{voteInput(_.tokenCount,codeOfToken,false)}} className="pt-2 pb-2 bg-transparent border rounded-[6px] w-[119px] text-[14px] font-semibold tracking-[0.185em] ">
                Relock
              </button>
              <button onClick={()=>{voteInput(_.tokenCount,codeOfToken,true)}} className="mr-[5px] ml-[9px] pt-2 pb-2 bg-transparent border rounded-[6px] w-[119px] text-[14px] font-semibold tracking-[0.185em] ">
                Remove
              </button></div> 
              }
              {codeOfToken === 4 &&               
              <button className="pt-2 pb-2 bg-transparent border rounded-[6px] w-[119px] text-[14px] font-semibold tracking-[0.185em] ">
                Removed
              </button>}
              {codeOfToken === 5 &&               
              <button className="pt-2 pb-2 bg-transparent border rounded-[6px] w-[119px] text-[14px] font-semibold tracking-[0.185em] ">
                Cooldown
              </button>}
              {codeOfToken === 6 &&               
              <button onClick={()=>{voteInput(_.tokenCount,codeOfToken,false)}} className="pt-2 pb-2 bg-transparent border rounded-[6px] w-[119px] text-[14px] font-semibold tracking-[0.185em] ">
                Remove LP
              </button>}
              {codeOfToken === 7 &&               
              <button className="pt-2 pb-2 bg-transparent border rounded-[6px] w-[119px] text-[14px] font-semibold tracking-[0.185em] ">
                LP Cooldown
              </button>}
              {codeOfToken === 99 &&               
              <button className="pt-2 pb-2 bg-transparent border rounded-[6px] w-[119px] text-[14px] font-semibold tracking-[0.185em] ">
                Non Borrow
              </button>}
            </td>
            {/* <td className=" w-[16.6%] pl-10 text-[12px] font-semibold tracking-[0.185em] pr-[18px] rounded-tr-[6px] rounded-br-[6px]">
              VETO
            </td> */}
          </tr>)
          })}

            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Governance;
