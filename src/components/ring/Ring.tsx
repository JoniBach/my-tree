import { motion } from "framer-motion";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Line from "react-lineto";
import Button from "../button/Button";
import { Link } from "react-router-dom";

type StyledItemProps = {
  index?: any;
  counterRotation?: number;
  spacing?: number;
};

type StyledGroupProps = {
  initialRotation?: any;
};

const style = {
  delay: true,
  borderColor: "blue",
  borderStyle: "dashed",
  borderWidth: 4,
  zIndex: -1,
};
const styleB = {
  delay: true,
  borderColor: "blue",
  borderStyle: "dotted",
  borderWidth: 2,
  zIndex: -1,
};

const Center = styled(motion.div)`
  display: flex;
  align-self: center;
  position: fixed;
`;

const Item = styled(motion.div)<StyledItemProps>`
  display: flex;
  margin: 10px;
  align-self: center;
  position: absolute;
  ${(props: any) => `transform: rotate(${props.counterRotation}deg);`}
  ${(props: any) => `right: ${props.spacing}px;`}
`;

const Container = styled(motion.div)<StyledGroupProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  ${(props: any) => `transform: rotate(${props.initialRotation}deg);`}
`;

const Group = styled(motion.div)`
  display: flex;
`;

type ItemTypes = {
  label: any;
  parentLabel?: any;
  path?: any;
  index: number;
  sub?: number;
  total: number;
  active?: number;
  setActive?: any;
};
type GroupTypes = {
  data: any;
  path?: any;
  parentLabel?: any;
  active?: number;
  setActive?: any;
  sub?: number;
};

const handleRotation = (index: number, quantity: number) => {
  const total = 360;
  const base = total / quantity;
  const initial = index * base;
  const double = initial;
  const invert = -double;
  const group = { initial, counter: invert };
  return group;
};

const CenterItem = () => {
  return (
    <Center className="center-item">
      <Button circle>x</Button>
    </Center>
  );
};

const RingItem = ({
  label,
  parentLabel,
  path,
  index,
  total,
  setActive,
  sub,
}: ItemTypes) => {
  const newTotal = sub ? sub : total;
  const { counter } = handleRotation(index, total);
  const baseSpace = 10;
  const differential = (num: number) => {
    if (num > 9) {
      return 2;
    } else if (num > 18) {
      return 1.5;
    } else if (num > 27) {
      return 1;
    }
    return 2.5;
  };
  const newSpace = newTotal / differential(total);
  const spacing = baseSpace * newSpace;
  return (
    <>
      {/* <Line from="center-item" to={label} {...style} /> */}

      {/* {sub && active === index && (
        <Line from={`sub${index}`} to={`base${index}`} {...style} />
      )} */}
      <Line
        from={`${sub ? "sub" : "base"}${index}`}
        to={`${sub ? "sub" : "base"}${index + 1 < total ? index + 1 : 0}`}
        toAnchor="center"
        {...styleB}
      />

      <Item
        spacing={sub ? spacing * 2 : spacing}
        counterRotation={counter}
        index={index}
        className={`${sub ? "sub" : "base"}${label}`}
      >
        {/* <Link to={`/${path}`}> */}
        <Button onClick={() => setActive(index)} circle>
          {label}
        </Button>
        {/* </Link> */}
      </Item>
    </>
  );
};

const RingGroup = ({
  data,
  parentLabel,
  path,
  sub,
  setActive,
  active,
}: GroupTypes) => {
  const showOuter = sub;
  const selectedData = showOuter ? (active || active === 0 ? data : []) : data;

  return (
    <>
      {/* <Group></Group> */}
      <CenterItem />
      {selectedData.map((props: any, index: number) => (
        <Container initialRotation={handleRotation(index, data.length).initial}>
          {/* sub ? data.length * 2 : */}
          <RingItem
            setActive={setActive}
            total={data.length}
            index={index}
            label={index}
            parentLabel={parentLabel}
            path={path}
            sub={sub}
          />
        </Container>
      ))}
    </>
  );
};

const mapForData = "someData";
const mapForLabel = "someLabel";
const mapForKey = "someKey";

const Ring = (props: any) => {
  const { data } = props;
  const [mappedData, setMappedData] = useState<any>([]);
  const [active, setActive] = useState<any>(null);

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
          <>
            <RingGroup data={mappedData} setActive={setActive} />
            {(active || active === 0) && (
              <RingGroup
                data={mappedData[active].data}
                active={active}
                sub={mappedData.length}
              />
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Ring;
