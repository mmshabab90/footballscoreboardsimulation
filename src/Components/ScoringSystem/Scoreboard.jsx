import React from "react";
import { CircularProgress, Grid, Paper, Typography } from "@mui/material";

export default function Scoreboard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  gameStatus,
  message,
}) {
  return (
    <Paper style={{ width: "70vh", padding: 15 }}>
      <Typography variant="h4" style={{ fontFamily: "Tourney" }}>
        SCORE BOARD
      </Typography>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h1" style={{ fontFamily: "Tourney" }}>
            {homeScore}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h1"
            style={{ marginLeft: 15, marginRight: 15, fontFamily: "Tourney" }}
          >
            -
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h1" style={{ fontFamily: "Tourney" }}>
            {awayScore}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h6">
        {homeTeam} <span style={{ marginLeft: 15, marginRight: 15 }}>-</span>{" "}
        {awayTeam}
      </Typography>

      <Typography variant="h6">
        <span style={{ marginRight: 15 }}>Game Status: </span>
        {gameStatus ? (
          <span style={{ color: "green" }}>Running</span>
        ) : (
          <span style={{ color: "red" }}>Game Over</span>
        )}
      </Typography>

      {!gameStatus && message && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item sm={12}>
            <em style={{ color: "orange" }}>
              New game starts soon. Please wait...
            </em>
          </Grid>
          <Grid item sm={12}>
            <CircularProgress color="secondary" />
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}
