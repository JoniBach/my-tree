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
  const { data } = props;
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
