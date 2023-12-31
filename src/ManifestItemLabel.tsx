import InputLabel from "@mui/material/InputLabel";

export function ManifestItemLabel(props: any) {
  return (
    <InputLabel
      sx={{
        display: "flex",
        justifyContent: "center",
        fontWeight: 700,
      }}
    >
      {props.name}
    </InputLabel>
  );
}
