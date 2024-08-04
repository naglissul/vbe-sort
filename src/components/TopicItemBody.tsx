import { Accordion } from "react-bootstrap";
import {
  SubjectType,
  getLongYearName,
  parseProblemFilename,
  shuffle,
} from "../misc";
import MathProblemRoot from "../routes/MainPage/MathProblemRoot";
import PuppProblemRoot from "../routes/MathPuppPage/PuppProblemRoot";
import HistProblemRoot from "../routes/HistPage/HistProblemRoot";
import { useDarkMode } from "./DarkModeContext";
import SingleProblem from "./SingleProblem";
import { useEffect, useState } from "react";

interface TopicItemBodyProps {
  topic: { topic: string; name: string };
  yearList: string[];
  nrTopicLut: { filename: string; topic: string; answer?: string }[];
  subject: SubjectType;
  listUrl?: string;
  setListUrl?: (url: string) => void;
}

export default function TopicItemBody({
  topic,
  yearList,
  nrTopicLut,
  subject,
  listUrl,
  setListUrl,
}: TopicItemBodyProps) {
  const { isShuffleOn } = useDarkMode();
  const [problemList, setProblemList] = useState(
    nrTopicLut.filter((problem) => {
      const currProblemInfo: any = parseProblemFilename(
        subject,
        problem.filename
      );
      return (
        yearList.includes(currProblemInfo.year) && problem.topic === topic.topic
      );
    })
  );

  useEffect(() => {
    setProblemList(
      shuffle(
        nrTopicLut.filter((problem) => {
          const currProblemInfo: any = parseProblemFilename(
            subject,
            problem.filename
          );
          return (
            yearList.includes(currProblemInfo.year) &&
            problem.topic === topic.topic
          );
        }),
        isShuffleOn
      )
    );
  }, [yearList, isShuffleOn, nrTopicLut, subject, topic.topic]);

  return (
    <Accordion.Body>
      {problemList.map((problem) => {
        const currProblemInfo: any = parseProblemFilename(
          subject,
          problem.filename
        );
        return (
          <div key={problem.filename} style={{}}>
            <hr style={{ border: "3px solid black" }} />
            <em>
              {getLongYearName(currProblemInfo.year)} {currProblemInfo.section}{" "}
              {subject !== "pupp" ? "dalis" : ""} {currProblemInfo.number} užd.
            </em>

            {currProblemInfo.problemType === "sub" && subject === "math" && (
              <MathProblemRoot currProblemInfo={currProblemInfo} />
            )}

            {currProblemInfo.problemType === "questions" &&
              subject === "hist" && (
                <HistProblemRoot questionsFilename={problem.filename} />
              )}

            {currProblemInfo.problemType === "sub" && subject === "pupp" && (
              <PuppProblemRoot currProblemInfo={currProblemInfo} />
            )}

            <SingleProblem
              filename={problem.filename}
              subject={subject}
              answerLut={nrTopicLut}
              listUrl={listUrl}
              setListUrl={setListUrl}
            />
          </div>
        );
      })}
    </Accordion.Body>
  );
}
