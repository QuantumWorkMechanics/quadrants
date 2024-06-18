import { HorizontalBarSeries, HorizontalGridLines, VerticalGridLines, XAxis, XYPlot, YAxis } from "react-vis";

function Question({ field }) {
  return (
    <div>
      <div className="flex justify-between gap-2">
        <div className="ml-5 text-xs w-[250px] ">{field.title}</div>
        <div className="text-sm mr-5">{field.avg}</div>
      </div>
      <XYPlot height={70} width={300} xDomain={[0, 5]} yDomain={[0, 1]} tickValues={[0, 20, 40]} className={"z-50"}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickTotal={0} />
        <YAxis tickTotal={0} />
        <HorizontalBarSeries data={[{ x: field.avg, y: 1 }]} fill="#0EA8DC" />
      </XYPlot>
    </div>
  );
}

export default Question;
