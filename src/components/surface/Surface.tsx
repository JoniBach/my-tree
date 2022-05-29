import { motion } from "framer-motion";
import styled from "styled-components";
import React from "react";

type SurfaceProps = {
  children?: any;
};

const SurfaceStyled = styled(motion.div)`
  font-family: ${(props: any) => props.theme.fonts[0]};
  background: ${({ theme: { colors } }) => colors.white};
  color: ${({ theme: { colors } }) => colors.blue};
//   border-radius: ${({ theme: { spacing } }) => spacing.s};
  border: none;
//   padding: ${({ theme: { spacing } }) => spacing.l};
//   margin: ${({ theme: { spacing } }) => spacing.s};
//   box-shadow: ${({ theme: { shadow } }) => shadow.medium};
//   cursor: pointer;
//   text-transform: uppercase;
width: 100vw;
height: 100vh;
display: flex;

display: flex;
align-items: center;
justify-content: center;
flex-direction: column; 
width: 100%; 
text-align: center; 
min-height: 200px; 
align-items: center;


`;

const Surface = (props: any) => {
  return <SurfaceStyled>{props.children}</SurfaceStyled>;
};

export default Surface;
