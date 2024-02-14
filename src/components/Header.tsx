import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)

  return (    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "grey" }}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color={"inherit"}
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => setIsOpen(true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Test
					</Typography>
				</Toolbar>
      </AppBar>

			<Drawer
				anchor={'left'}
				open={isOpen}
				onClose={() => setIsOpen(false)}
				PaperProps={{
					sx: {
						bgcolor: 'grey'
					}
				}}
			>
				<List>
					{['Students', 'About us'].map((text) => (
						<ListItem key={text} sx={{ color: 'white'}}>
							<ListItemButton>
								<ListItemIcon sx={{ color: 'white'}}>
									{text === 'About us' ? <InfoIcon/> : ''}
									{text === 'Students' ? <PeopleIcon/> : ''}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
    </Box>
  )
}

export default Header;