import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {
    const navigate = useNavigate();

    function navigateTo(path) {
        navigate(path)
    }

  return (
    <Menu>
        <SubMenu label="Select an Option" style={{color:"#040C18", fontSize:"16px"}}>
            <MenuItem style={{color:"#040C18", fontSize:"16px"}}>
                <div onClick={() => navigateTo("/master-schedule")}> Sort Master Schedule </div>
            </MenuItem>
            <MenuItem style={{color:"#040C18", fontSize:"16px"}}>
                <div onClick={() => navigateTo("/net-heights")}> Set Net Height </div>
            </MenuItem>
            <MenuItem style={{color:"#040C18", fontSize:"16px"}}>
                <div onClick={() => navigateTo("/game-sheets")}> Create Game Sheets </div>
            </MenuItem>
        </SubMenu>
    </Menu>
  )
}

export default Dropdown