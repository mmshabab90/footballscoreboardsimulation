import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Logo from "../../appLogo.png";

export default function TopBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <img alt="logo" src={Logo} width="120" style={{ marginTop: 10 }} />
        <Typography variant="h5" style={{ fontFamily: "Tourney" }}>
          Super Leagues Football
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
