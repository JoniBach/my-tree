import { motion } from "framer-motion";
import styled from "styled-components";
import React from "react";

type ButtonProps = {
  children?: any;
  circle?: boolean;
  onClick?: any;
};

const ButtonStyled = styled(motion.button)<ButtonProps>`
  font-family: ${(props: any) => props.theme.fonts[0]};
  background: ${({ theme: { colors } }) => colors.blue};
  color: ${({ theme: { colors } }) => colors.white};

  ${(props: any) =>
    props.circle
      ? "border-radius: 100%;"
      : ` border-radius: ${props.theme.spacing.s};`}
  border: none;
  padding: ${({ theme: { spacing } }) => spacing.m};
  margin: ${({ theme: { spacing } }) => spacing.s};
  box-shadow: ${({ theme: { shadow } }) => shadow.medium};
  cursor: pointer;
  text-transform: uppercase;
`;

const Button = ({ circle, children, onClick }: ButtonProps) => {
  return (
    <ButtonStyled onClick={onClick} circle={circle}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
