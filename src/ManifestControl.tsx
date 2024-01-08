import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { ManifestItemsList } from "./ManifestItemsList";
import { ManifestType, emptyManifest, initManifest } from "./ManifestType";
import { readLSManifest, updateToLS } from "./ManifestLocalStorageMediator";

export function ManifestControl(props: any) {
  const { setManifestHandler } = props;

  const [showResult, setShowResult] = React.useState(false);
  const [manifestValue, setManifestValue] = React.useState<ManifestType>(
    initManifest(window.location.origin)
  );

  const initialManifest = readLSManifest();
  React.useEffect(() => {
    if (initialManifest) {
      setManifestValue(initialManifest);
      SubmitNewManifest(initialManifest);
    }
  }, []);

  const onFormChanged = (newManifest: ManifestType) => {
    setShowResult(false);
    setManifestValue(newManifest);
  };

  const SubmitNewManifest = (manifest: ManifestType) => {
    setShowResult(true);
    updateToLS(manifest);
    setManifestHandler(manifest);
  };

  return (
    <Box>
      <ManifestItemsList manifest={manifestValue} onChange={onFormChanged} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => {
              const newManifest = initManifest(window.location.origin);
              setManifestValue(newManifest);
              SubmitNewManifest(newManifest);
            }}>
            Reset
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => {
              const newManifest = emptyManifest();
              setManifestValue(newManifest);
              SubmitNewManifest(newManifest);
            }}>
            Clear
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => {
              SubmitNewManifest(manifestValue);
            }}>
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} hidden={!showResult}>
          Done!
        </Grid>
      </Grid>
    </Box>
  );
}
