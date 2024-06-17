import Scatter from "./Scatter";
import qLogo from "../assets/QWALogo_Full_Color-16349556.svg";

function Landing() {
  return (
    <div>
      <div className="mt-0 w-screen h-20 ">
        <img src={qLogo} alt="" className="absolute -mt-24 w-[400px]" />
      </div>
      <div className="flex justify-center">
        <Scatter />
      </div>
    </div>
  );
}

export default Landing;
