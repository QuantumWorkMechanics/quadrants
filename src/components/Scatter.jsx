import { useState, useEffect } from "react";
//import { getData } from "../services/dataService";
import { useParams, useSearchParams } from "react-router-dom";
import { HorizontalGridLines, LineSeries, MarkSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";

function Scatter({ scores, setComp1, setComp2, setScores, setShow, show, comp1, comp2, data, setData }) {
  const routeParams = useParams();
  const [searchParams] = useSearchParams();
  //console.log(searchParams);
  const userScore = { x: searchParams.get("_x"), y: searchParams.get("_y") };

  useEffect(() => {
    //console.log({ userScore });
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

    // let x = searchParams.get("x");
    // let y = searchParams.get("y");
    // setUserScore([{ x: x, y: y }]);

    const tempResponses = dataSet.responses.items.map((el) => {
      return {
        x: Number(
          el.variables.filter((x) => {
            //       console.log(x);
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
    // console.log(tempResponses);
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
          <div className="flex h-[370px]">
            <div className="w-5">
              {" "}
              <h2 className="-ml-[140px] mt-[150px] font-noto text-center w-[300px] -rotate-90">{comp2}</h2>
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

                <div className="z-50 flex">
                  <XYPlot height={300} width={300} xDomain={[0, 40]} yDomain={[0, 40]} tickValues={[0, 20, 40]} className={"z-50"}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis tickTotal={0} />
                    <YAxis tickTotal={0} />
                    <MarkSeries data={scores} fill="#0EA8DC" />
                    {userScore.x != null && userScore.y != null && <MarkSeries data={[userScore]} fill="#FDB517" />}
                  </XYPlot>
                  <div className="flex flex-col h-[320px]">
                    <div className="font-noto h-2 ml-2 text-[#142F55] ">40</div>
                    <div className="w-1 h-[300px] bg-slate-50 mt-4 ml-4"></div>
                  </div>
                </div>
                <div className="flex items-center -mt-5">
                  <div className="font-noto h-2 mr-1 text-[#142F55]">0</div>
                  <div className="w-[305px] h-1 bg-slate-50  mt-4"></div>
                </div>
                {userScore.x != null && userScore.y != null && (
                  <div className="font-noto mt-2 text-xs">
                    {/* Your Scores:{" "}
                    <div className="text-[#09497b]">
                      {comp1}: {userScore.x}
                    </div>
                    <div className="text-[#09497b]">
                      {comp2}: {userScore.y}
                    </div>
                  </div> */}
                    <div className="flex">
                      <div className="flex items-center">
                        <div>All respondents - </div>
                        <div className="h-3 w-3 rounded-full bg-[#0EA8DC] ml-2"></div>
                      </div>
                      <div className="flex items-center ml-5">
                        <div>Your response - </div>
                        <div className="h-3 w-3 rounded-full bg-[#FDB517] ml-2"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Scatter;
