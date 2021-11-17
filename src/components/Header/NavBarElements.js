import {NavLink as Link} from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
    background: #1C47B4;
    height: 30px;
`;

export const NavLink = styled(Link)`
  color: #ECAB2E;
  align-items: right;
  height: 100%;
  cursor: pointer;
  margin-left: 10px;
  &.active {
    text-decoration: underline;
    cursor: default;
  }
`;

export const LogLink = styled(Link)`
  color: #ECAB2E;
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  verticalAlign: top;
`;

export const NavMenu = styled.div`
  align-items: center;
  padding-top: 5px;
`;