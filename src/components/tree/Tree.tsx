import { motion } from "framer-motion";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { SteppedLineTo, Line } from "react-lineto";
import Button from "../button/Button";
import { Link } from "react-router-dom";

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
    someKey: "test_1",
    someLabel: "test 1",
    someData: [
      {
        someKey: "test_2",
        someLabel: "test 2",
        someData: [
          {
            someKey: "test_3",
            someLabel: "test 3",
            someData: [
              {
                someKey: "test_4",
                someLabel: "test 4",
                someData: [
                  {
                    someKey: "test_5",
                    someLabel: "test 5",
                  },
                  {
                    someKey: "test_16",
                    someLabel: "test 16",
                  },
                ],
              },
              {
                someKey: "test_17",
                someLabel: "test 17",
              },
              {
                someKey: "test_20",
                someLabel: "test 20",
                someData: [
                  {
                    someKey: "test_19",
                    someLabel: "test 19",
                  },
                  {
                    someKey: "test_22",
                    someLabel: "test 22",
                  },
                ],
              },
            ],
          },
          {
            someKey: "test_6",
            someLabel: "test 6",
          },
        ],
      },
      {
        someKey: "test_9",
        someLabel: "test 9",
        someData: [
          {
            someKey: "test_10",
            someLabel: "test 10",
          },
          {
            someKey: "test_13",
            someLabel: "test 13",
            someData: [
              {
                someKey: "test_14",
                someLabel: "test 14",
                someData: [
                  {
                    someKey: "test_15",
                    someLabel: "test 15",
                  },
                  {
                    someKey: "test_23",
                    someLabel: "test 23",
                  },
                  {
                    someKey: "test_24",
                    someLabel: "test 24",
                  },
                ],
              },
              {
                someKey: "test_21",
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
  path?: any;
};
type GroupTypes = {
  data: any;
  path?: any;
  parentLabel?: any;
};

const TreeItem = ({ label, parentLabel, path }: ItemTypes) => {
  return (
    <>
      <Item className={`${label}`}>
        <Link to={`/${path}`}>
          <Button>{label}</Button>
        </Link>
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

const TreeGroup = ({ data, parentLabel, path }: GroupTypes) => {
  const hasData = data && data.data && data.data.length > 0;
  return (
    <>
      <Container>
        {data.label && (
          <TreeItem label={data.label} parentLabel={parentLabel} path={path} />
        )}
        <Group>
          {hasData ? (
            data.data.map((d: any, i: number) => (
              <TreeGroup
                parentLabel={data.label}
                data={d}
                path={`${path ? `${path}/` : ""}${data.key}`}
              />
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
const mapForKey = "someKey";

const Tree = (props: any) => {
  const [mappedData, setMappedData] = useState([]);

  const handleDataMap = (newData: any) => {
    const mapData = newData.map((d: any) => ({
      label: d[mapForLabel],
      key: d[mapForKey],
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
