import { motion } from "framer-motion";
import styled from "styled-components";
import React from "react";

type ButtonProps = {
  children?: any;
};

const ButtonStyled = styled(motion.button)`
  font-family: ${(props: any) => props.theme.fonts[0]};
  background: ${({ theme: { colors } }) => colors.blue};
  color: ${({ theme: { colors } }) => colors.white};
  border-radius: ${({ theme: { spacing } }) => spacing.s};
  border: none;
  padding: ${({ theme: { spacing } }) => spacing.m};
  margin: ${({ theme: { spacing } }) => spacing.s};
  box-shadow: ${({ theme: { shadow } }) => shadow.medium};
  cursor: pointer;
  text-transform: uppercase;
`;

const Button = (props: any) => {
  return <ButtonStyled>{props.children}</ButtonStyled>;
};

export default Button;
