import { Accordion, Alert, Form } from "react-bootstrap";
import topics from "./data/topics-names-list.json";
import nrTopicLut from "./data/nr-topic-lut.json";
import { useState } from "react";
import allYearList from "./data/year-list.json";
import TopicItem from "../components/TopicItem";
import { getShortYearName } from "../misc";

export default function PhysicsPage() {
  const [yearList, setYearList] = useState<string[]>(
    allYearList.filter((year) => year !== "")
  );

  const toggleYearInList = (yearToToggle: string) => {
    if (yearList.includes(yearToToggle)) {
      setYearList(yearList.filter((year) => year !== yearToToggle));
    } else {
      setYearList([...yearList, yearToToggle]);
    }
  };

  return (
    <>
      <Alert variant="warning">Augustas surūšiavo</Alert>
      <Alert variant="info">
        Kolkas tik pirmųjų dalių užduotys (testinės ABCD)
      </Alert>
      <p>
        <strong>12-okams: </strong>Siūlau žiūrint užduotis pasilikti 2023 m.
        egzamino pagrindinės sesijos užduotis nematytas, kad ruošiantis būtų
        galima išspręsti egzaminą pilnai, sekant laiką ir pasitikrinant
        pasiruošimą.
      </p>
      <div>
        <div style={{ marginTop: "50px", marginBottom: "20px" }}>
          <div style={{ marginTop: "20px", display: "flex" }}>
            <Form style={{ flexGrow: 3 }}>
              {allYearList.map((year) => (
                <Form.Check
                  key={year}
                  inline
                  label={getShortYearName(year)}
                  checked={yearList.includes(year)}
                  onChange={() => toggleYearInList(year)}
                />
              ))}
            </Form>
          </div>
        </div>
        <Accordion>
          {topics.map((topic) => (
            <TopicItem
              key={topic.topic}
              topic={topic}
              yearList={yearList}
              nrTopicLut={nrTopicLut}
              subject="physics"
            />
          ))}
        </Accordion>
      </div>
    </>
  );
}
