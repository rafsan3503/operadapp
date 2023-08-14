import ethereum3 from "../assets/icons/ethereum3.png";
import ethereum2 from "../assets/icons/ethereum2.png";

const OperaStakeModal = ({ modalHandler }) => {
  return (
    <div
      className="absolute top-0 backdrop-blur-sm bg-black/10 bottom-[-100%] right-0 left-0"
      onClick={modalHandler}
    >
      <div className="bg-black lg:w-[578px] mx-auto mt-[150px] pt-[50px] pb-[17px] border border-slate-900 rounded-[15px]">
        <img
          className="mx-auto animate-spin rounded-full"
          src={ethereum3}
          alt=""
        />
        <p className="text-[22px] text-center tracking-[0.075em] font-medium">
          ALMOST THERE...
        </p>
        <p className="text-[8px] text-center mt-[7px]">
          TO STAKE OPERA ON THE NETWORK, YOU MUST FIRST{" "}
          <span className="text-[#59FF56]">ENABLE + APPROVE SPENDING.</span>
        </p>

        <p className="flex items-center justify-center gap-1 text-[22px] tracking-[0.075em] font-medium mt-[60px]">
          <img className="animate-spin" src={ethereum2} alt="" />
          1,000
        </p>
        <div className="flex justify-center mt-4 mb-14">
          <button className="w-[151px] text-[14px] tracking-[0.185em] border py-1 rounded-[13px]">
            ENABLE
          </button>
        </div>
        <p className="text-[#59FF56] text-center text-[10px] tracking-[0.075em]">
          YOU MUST STAKE $OPERA + ETH TO JOIN OUR DAO AND LEND.
        </p>
        <p className="text-white text-center text-[10px] tracking-[0.075em]">
          THE CURRENT MINIMUM IS 500 OPERA.
        </p>
      </div>
    </div>
  );
};

export default OperaStakeModal;
