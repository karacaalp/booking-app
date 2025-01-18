import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem;
  margin-bottom: 2rem;
  background-color: #ffffff;
  box-shadow: 0 3px 3px -3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Title>Booking App</Title>
    </StyledHeader>
  );
};

export default Header;
