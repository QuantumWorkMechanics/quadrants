import Scatter from "./Scatter";
import { useState } from "react";
// import qLogo from "../assets/QWALogo_Full_Color-16349556.svg";
import qLogo from "../assets/QWA_Logo_Greyscale.png";
import { BLUE1, BLUE2, GREY2, BLUE3, BLUE4, BLUE5, YELLOW1 } from "../globals/colors";
import { color } from "chart.js/helpers";
import Bars from "./Bars";

function Landing() {
  const [data, setData] = useState();
  const [comp1, setComp1] = useState();
  const [comp2, setComp2] = useState();
  const [scores, setScores] = useState();
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="mt-0 w-screen h-20  bg-[#878787]">
          <img src={qLogo} alt="" className={`absolute -mt-24 w-[400px] animate-fade-up`} />
        </div>
        <div className="w-screen h-1 bg-[#FDB517]"></div>
        <div className="w-screen flex justify-center animate-fade-up animate-delay-500">
          {show && <h1 className="font-noto text-xl m-4 text-[#142F55] ">{data.typeForm.title}</h1>}
        </div>
        <div className="flex h-[380px] flex-col md:flex-row justify-center items-center animate-fade-up animate-delay-500">
          <Scatter
            data={data}
            setData={setData}
            comp1={comp1}
            comp2={comp2}
            setComp1={setComp1}
            setComp2={setComp2}
            scores={scores}
            setScores={setScores}
            show={show}
            setShow={setShow}
          />
          {/* <Bars
            data={data}
            setData={setData}
            comp1={comp1}
            comp2={comp2}
            setComp1={setComp1}
            setComp2={setComp2}
            scores={scores}
            setScores={setScores}
            show={show}
            setShow={setShow}
          /> */}
          {/* {show && <img className="w-[300px] m-2" src={data.typeForm.welcome_screens[0].attachment.href} alt="" />} */}
        </div>
        <div className="mt-20 h-1 w-screen bg-[#FDB517] "></div>
        <div className=" bg-[#878787]  flex  w-screen flex-grow "></div>
      </div>
    </>
  );
}

export default Landing;
