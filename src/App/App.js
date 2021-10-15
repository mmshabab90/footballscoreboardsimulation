import "./App.css";
import TopBar from "../Components/Layout/Topbar";
import { Container, CssBaseline, Toolbar } from "@mui/material";
import ScoreDashboard from "../Components/ScoringSystem/ScoreDashboard";

function App() {
  return (
    <div>
      <CssBaseline />
      <TopBar />
      <Toolbar />
      <Container style={{ marginTop: 25 }}>
        <ScoreDashboard />
      </Container>
    </div>
  );
}

export default App;
