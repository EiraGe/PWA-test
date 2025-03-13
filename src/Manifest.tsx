import React from "react";
import {
  Button,
  Collapse,
  Divider,
  FormControlLabel,
  Paper,
  Switch,
} from "@mui/material";
import { ManifestControl } from "./ManifestControl";
import { ManifestContent } from "./ManifestContent";
import { ManifestType } from "./ManifestType";
import { generateManifestText, setManifestLink } from "./ManifestMediator";
import { updateToLS } from "./ManifestLocalStorageMediator";

export interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}
export type PromptCtx = {
  deferredEvt: IBeforeInstallPromptEvent | null;
  hidePrompt?: () => void;
};
export type Children = {
  children: React.ReactElement | React.ReactElement[] | string | null;
};

export function Manifest() {
  const [hasManifest, setHasManifest] = React.useState(true);
  const [stringManifest, setStringManifest] = React.useState<string>("");
  const [installPrompt, setInstallPrompt] = React.useState<any>(null);

  React.useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      console.info("got beforeinstallprompt", e);
      setInstallPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', ready as any);

    return () => {
      window.removeEventListener('beforeinstallprompt', ready as any);
    }
  }, []);

  const handleShowManifestChange = () => {
    setHasManifest((prev) => !prev);
    if (!hasManifest) {
      updateToLS(undefined);
      setManifestLink(undefined);
    }
  };

  const handleSetManifest = (newManifest: ManifestType) => {
    setHasManifest(true);
    const stringManifest = generateManifestText(newManifest);
    setStringManifest(stringManifest);
  };

  const onStringManifestChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setStringManifest(e.target.value);
  };

  const onStringManifestCommit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setManifestLink(stringManifest);
  };

  return (
    <Paper elevation={3} sx={{ marginRight: "0%", marginLeft: "0%" }}>
      <FormControlLabel
        control={
          <Switch checked={hasManifest} onChange={handleShowManifestChange} />
        }
        label="Add Manifest"
      />
      {
        installPrompt !== null ?
          <Button>
            Install
          </Button> : null
      }
      <Collapse in={hasManifest}>
        <ManifestControl
          setManifestHandler={handleSetManifest}></ManifestControl>
        <Divider />
        <ManifestContent
          stringManifest={stringManifest}
          onStringManifestChange={onStringManifestChange}
          onStringManifestCommit={onStringManifestCommit}></ManifestContent>
      </Collapse>
    </Paper>
  );
}
