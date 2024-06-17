import { useState, useEffect } from "react";
//import { getData } from "../services/dataService";
import { useParams } from "react-router-dom";
import { HorizontalGridLines, LineSeries, MarkSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";

function Scatter() {
  const routeParams = useParams();
  const [data, setData] = useState();
  const [comp1, setComp1] = useState();
  const [comp2, setComp2] = useState();
  const [scores, setScores] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mimir_url = "https://mimir-production.up.railway.app/";
  //   const mimir_url = "http://localhost:3000/";
  async function getData() {
    const responses = await fetch(mimir_url + "tf-scatter/" + routeParams.tfid, requestOptions)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log({ error });
      });

    const dataSet = await responses.json();
    console.log({ dataSet });
    setComp1(dataSet.typeForm.fields[0].title.replaceAll("*", ""));
    setComp2(dataSet.typeForm.fields[1].title.replaceAll("*", ""));

    const tempResponses = dataSet.responses.items.map((el) => {
      return {
        x: Number(
          el.variables.filter((x) => {
            console.log(x);
            return x.key == "change";
          })[0].number
        ),
        y: Number(
          el.variables.filter((x) => {
            return x.key == "attributes";
          })[0].number
        ),
      };
    });
    console.log(tempResponses);
    setScores(tempResponses);
    setData(dataSet);
    setShow(true);
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const tempData = [
    { x: 10, y: 30 },
    { x: 20, y: 20 },
    { x: 30, y: 15 },
  ];

  return (
    <div>
      {show && (
        <>
          <div className="flex">
            <div className="w-5">
              {" "}
              <h2 className="-ml-[140px] mt-[150px] mfont-noto text-center w-[300px] -rotate-90">{comp2}</h2>
            </div>
            <div className="">
              <h2 className="font-noto text-center w-[300px] ">{comp1}</h2>
              <div>
                <div className="w-[300px] h-1 bg-slate-200 absolute mt-0 z-10 bg-opacity-90"></div>
                <div className="w-[300px] h-1 bg-slate-200 absolute mt-[150px] z-10 bg-opacity-90"></div>
                <div className="w-[304px] h-1 bg-slate-200 absolute mt-[300px] z-10 bg-opacity-90"></div>
                <div className="w-1 h-[300px] bg-slate-200 absolute ml-0 z-10 bg-opacity-90"></div>
                <div className="w-1 h-[300px] bg-slate-200 absolute ml-[150px] z-10 bg-opacity-90"></div>
                <div className="w-1 h-[300px] bg-slate-200 absolute ml-[300px] z-10 bg-opacity-90"></div>
                <div className="z-0 w-[150px] h-[150px] bg-[#BDE3F9] absolute bg-opacity-10"></div>
                <div className="z-0 mt-[150px] w-[150px] h-[150px] bg-[#BDE3F9] absolute bg-opacity-20"></div>
                <div className="z-0 mt-[150px] ml-[150px] w-[150px] h-[150px] bg-[#BDE3F9] absolute bg-opacity-30"></div>
                <div className="z-0 ml-[150px] w-[150px] h-[150px] bg-[#BDE3F9] absolute bg-opacity-40"></div>
                <div className="z-50">
                  <XYPlot height={300} width={300} xDomain={[0, 40]} yDomain={[0, 40]} tickValues={[0, 20, 40]} className={"z-50"}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis tickTotal={0} />
                    <YAxis tickTotal={0} />
                    <MarkSeries data={scores} fill="#0EA8DC" />
                  </XYPlot>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Scatter;
