import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  List,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import i18n from "../lokalisierung/i18n";
import { useTranslation } from "react-i18next";
import { Paths } from "../routes";

function AppBarAll() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDe, setIsDe] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path: string) => {
    handleDrawerToggle();
    navigate(path);
  };

  const handleLanguage = () => {
    if (isDe) {
      i18n.changeLanguage("en");
      setIsDe(false);
    } else {
      i18n.changeLanguage("de");
      setIsDe(true);
    }
  };

  const list = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {[
          { text: "User input mask", path: Paths.UserInputMask },
          { text: "Admin overview", path: Paths.AdminOverview },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const appbar = (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Microservice
        </Typography>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="language"
          sx={{ mr: 2 }}
          onClick={() => handleLanguage()}
        >
          {t("language")}
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {appbar}

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {list}
      </Drawer>
    </Box>
  );
}

export default AppBarAll;
