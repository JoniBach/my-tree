import { motion } from "framer-motion";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { SteppedLineTo, Line } from "react-lineto";
import Button from "../button/Button";

type TreeProps = {
  children?: any;
};

const style = {
  delay: true,
  borderColor: "blue",
  borderStyle: "dashed",
  borderWidth: 4,
};

const Item = styled(motion.div)`
  display: flex;
  margin: 10px;
  align-self: center;
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Group = styled(motion.div)`
  display: flex;
`;

const data = [
  {
    someLabel: "test 1",
    someData: [
      {
        someLabel: "test 2",
        someData: [
          {
            someLabel: "test 3",
            someData: [
              {
                someLabel: "test 4",
                someData: [
                  {
                    someLabel: "test 5",
                  },
                  {
                    someLabel: "test 16",
                  },
                ],
              },
              {
                someLabel: "test 17",
              },
              {
                someLabel: "test 20",
                someData: [
                  {
                    someLabel: "test 19",
                  },
                  {
                    someLabel: "test 22",
                  },
                ],
              },
            ],
          },
          {
            someLabel: "test 6",
          },
        ],
      },
      {
        someLabel: "test 9",
        someData: [
          {
            someLabel: "test 10",
          },
          {
            someLabel: "test 13",
            someData: [
              {
                someLabel: "test 14",
                someData: [
                  {
                    someLabel: "test 15",
                  },
                  {
                    someLabel: "test 23",
                  },
                  {
                    someLabel: "test 24",
                  },
                ],
              },
              {
                someLabel: "test 21",
              },
            ],
          },
        ],
      },
    ],
  },
];

type ItemTypes = {
  label: any;
  parentLabel?: any;
};
type GroupTypes = {
  data: any;
  parentLabel?: any;
};

const TreeItem = ({ label, parentLabel }: ItemTypes) => {
  return (
    <>
      <Item className={`${label}`}>
        <Button>{label}</Button>
      </Item>
      {parentLabel && (
        <SteppedLineTo
          from={parentLabel}
          to={label}
          fromAnchor="bottom"
          toAnchor="top"
          {...style}
        />
      )}
    </>
  );
};

const TreeGroup = ({ data, parentLabel }: GroupTypes) => {
  const hasData = data && data.data && data.data.length > 0;
  console.log(data);
  return (
    <>
      <Container>
        {data.label && (
          <TreeItem label={data.label} parentLabel={parentLabel} />
        )}
        <Group>
          {hasData ? (
            data.data.map((d: any, i: number) => (
              <TreeGroup parentLabel={data.label} data={d} />
            ))
          ) : (
            <>
              {/* <TreeItem label={data.label} parentLabel={parentLabel} /> */}
            </>
          )}
        </Group>
      </Container>
    </>
  );
};

const mapForData = "someData";
const mapForLabel = "someLabel";

const Tree = (props: any) => {
  const [mappedData, setMappedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDataMap = (newData: any) => {
    const mapData = newData.map((d: any) => ({
      label: d[mapForLabel],
      data:
        d[mapForData] && d[mapForData].length > 0
          ? handleDataMap(d[mapForData])
          : [],
    }));
    const completedData = mapData;
    return completedData;
  };

  useEffect(() => {
    setMappedData(handleDataMap(data));
  }, []);

  return (
    <div>
      <Container>
        {mappedData.length === 0 ? (
          "loading"
        ) : (
          <TreeGroup data={mappedData[0]} />
        )}
      </Container>
    </div>
  );
};

export default Tree;
