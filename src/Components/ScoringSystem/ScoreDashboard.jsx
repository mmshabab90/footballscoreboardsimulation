// Assumptions: since there is no api for the applicaiton
// it was created with the assumption of data in json format
// that would be recevied from the api endpoint
// in
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Scoreboard from "./Scoreboard";
// data that is expected to be recevied from the api
import { games } from "../../Services/data";

const interval = 1000 * 15;

export default function ScoreDashboard() {
  const [homeScore, setHomeScore] = useState(null);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayScore, setAwayScore] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [scoreBoard, setScoreBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    // simulates the game and updates the scoreboard for each games
    // after each game there is an timout for 15 seconds
    // this is done to mimic an api instance for real-time update
    for (let i = 0; i < games.length; i++) {
      setTimeout(() => {
        const scores = games[i].scores;
        for (let j = 0; j < scores.length; j++) {
          const hTeam = games[i].home;
          setHomeTeam(hTeam);
          const aTeam = games[i].away;
          setAwayTeam(aTeam);
          setTimeout(() => {
            const score = scores[j];
            // Home and Away Scores are updated for each pair of scores in live game
            // Game start data is 0-0
            setHomeScore(score[0]);
            setAwayScore(score[1]);

            if (j === scores.length - 1) {
              setGameStatus(false); //indicates game has finished
              // scoreboard array is updated once the game is finished
              // last score is stored in the game data
              setScoreBoard((prevState) => [
                ...prevState,
                {
                  id: i,
                  home: hTeam,
                  away: aTeam,
                  hScore: score[0],
                  aScore: score[1],
                  totalScore: score[0] + score[1],
                },
              ]);
            } else {
              // updating the games status to show if
              // the game is running or over
              setGameStatus(true);
            }
          }, j * 1000);
        }

        // used to update and show loader for waiting period to start the next game
        if (i === games.length - 1) {
          setMessage(false);
        } else {
          setMessage(true);
        }
      }, i * interval);
    }
  }, []);

  function sortData() {
    // sorting data based on same total score
    // and returning in descending order of most recently added items
    return scoreBoard.sort(
      (a, b) => b.totalScore === a.totalScore && b.id - a.id
    );
  }
  sortData();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        component={Paper}
        item
        sm={12}
        style={{ marginTop: 15 }}
        elevation={6}
      >
        <Scoreboard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homeScore={homeScore}
          awayScore={awayScore}
          gameStatus={gameStatus}
          message={message}
        />
      </Grid>
      <Grid
        item
        component={Paper}
        sm={12}
        style={{ marginTop: 15 }}
        elevation={2}
      >
        <List
          sx={{ width: "100%", maxWidth: 850, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="center">
            <ListItemText>
              <Typography variant="h4" style={{ fontFamily: "Tourney" }}>
                Game Summary
              </Typography>
            </ListItemText>
          </ListItem>

          {scoreBoard &&
            scoreBoard.length > 0 &&
            scoreBoard
              .sort((a, b) => b.totalScore - a.totalScore)
              .map((game, idx) => (
                <ListItem key={`item-${idx}`} style={{ width: "100%" }}>
                  <Card
                    component={Paper}
                    elevation={1}
                    sx={{ width: 345, textAlign: "center" }}
                  >
                    <CardContent>
                      <Typography>
                        {game.home} {game.hScore} - {game.away} {game.aScore}
                      </Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
        </List>
      </Grid>
    </Grid>
  );
}
