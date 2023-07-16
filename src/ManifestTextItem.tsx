import TextField from "@mui/material/TextField";

export function ManifestTextItem(props: any) {
  return (
    <TextField
      id={props.id}
      name={props.id}
      type={props.type || "text"}
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      fullWidth
      size="small"
      autoComplete="off"
      variant="outlined"
    />
  );
}
