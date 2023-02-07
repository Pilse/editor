import styled, { css } from "styled-components";
import { Tool } from "../../helpers";

const ToolsWrapper = styled("div")``;

const ToolButton = styled("button")<{ isActive: boolean }>`
  border: none;
  outline: none;
  background-color: inherit;
  padding: 10px;
  cursor: pointer;

  ${({ isActive }) =>
    !isActive &&
    css`
      opacity: 30%;
    `};
`;

type ToolsProps = { tools: Tool[] };

const Tools = ({ tools }: ToolsProps) => {
  return (
    <ToolsWrapper>
      {tools.map(({ type, icon, isActive, onMouseDown }) => (
        <ToolButton key={type} isActive={isActive()} onMouseDown={onMouseDown}>
          {icon}
        </ToolButton>
      ))}
    </ToolsWrapper>
  );
};

export default Tools;
