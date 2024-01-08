import React from "react";
import { Manifest } from "./Manifest";
import { Box, Collapse, FormControlLabel, Switch } from "@mui/material";

function App() {
  const [showManifest, setShowManifest] = React.useState(true);

  const handleChange = () => {
    setShowManifest((prev) => !prev);
  };

  return (
    <Box>
      <FormControlLabel
        control={<Switch checked={showManifest} onChange={handleChange} />}
        label="showManifest"
      />
      <Collapse in={showManifest}>
        <Manifest></Manifest>
      </Collapse>
    </Box>
  );
}

export default App;
