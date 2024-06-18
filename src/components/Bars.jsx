import { useEffect, useState } from "react";
import Question from "./Question";

function Bars({ scores, setComp1, setComp2, setScores, setShow, show, comp1, comp2, data, setData }) {
  const [localFields, setLocalFields] = useState();
  useEffect(() => {
    if (data) {
      let fields = [...data.typeForm.fields[0].properties.fields, ...data.typeForm.fields[1].properties.fields];
      //   console.log(fields);
      let localResponses = [];
      data.responses.items.map((el, i) => {
        let answers = el.answers;
        localResponses = [...localResponses, ...el.answers];
      });
      let newFields = fields.map((el, i) => {
        let currentAnswers = localResponses.filter((x) => {
          return x.field.ref == el.ref;
        });
        // console.log(currentAnswers);
        let avg = currentAnswers.reduce((acc, x) => acc + x.number, 0) / currentAnswers.length;
        avg = Math.round(avg * 100) / 100;
        // console.log(avg);
        el.avg = avg;
        return el;
      });
      //  console.log(newFields);
      setLocalFields(newFields);
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-col">
        <div className="h-1 bg-[#878787]"></div>
        <div className="mb-5 sticky">Mean of Responses</div>
        <div className="md:h-[500px] mt-2 md:overflow-y-scroll">
          {data && (
            <div>
              {localFields &&
                localFields.map((el, i) => {
                  return <Question key={`question_${i}`} field={el}></Question>;
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Bars;
