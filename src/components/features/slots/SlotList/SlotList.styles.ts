import styled from "styled-components";

export const SlotListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const SlotButton = styled.button<{ isBooked: boolean }>`
  padding: 10px 15px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${({ isBooked }) => (isBooked ? "#ff6b6b" : "#51cf66")};
  color: white;

  &:hover {
    background-color: ${({ isBooked }) => (isBooked ? "#fa5252" : "#40c057")};
  }
`;
