import React from 'react';
import {Sidebar, Item, Logo, LogoText} from 'react-sidebar-ui';
import { Link, useHistory } from 'react-router-dom';
import 'react-sidebar-ui/dist/index.css';
import './design.css';
function SideBarUser()

  {
    let history = useHistory();
      return (
      <div className='SideBarUser'>
          <Sidebar bgColor='black' isCollapsed={false}>
        <Logo
          image='/image/react-icon.png'
          imageName='react logo'/>
        <LogoText>나만의 가계부</LogoText>
        <div className="item-margin">
        <Item bgColor='black'>
          <Link className="nav-link" to={"/list"}>수입/지출내역</Link>
        </Item>
        <Item bgColor='black'>
          <Link className="nav-link" to={"/category"}>카테고리</Link>
        </Item>
          <Item bgColor='black'>
          <Link className="nav-link" to={"/logout"}>로그아웃</Link>
          </Item>
        </div>

      </Sidebar>

      </div>
      
      );
  }

  export default SideBarUser;