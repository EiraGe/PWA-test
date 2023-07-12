import * as React from "react";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

type ManifestSelectionProps = {
  id: string;
  value: string;
  items: Array<string>;
};

const StyledFormControlLabel = styled((props: FormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

export default function RowRadioButtonsGroup(props: ManifestSelectionProps) {
  let itemList = props.items.map((item: string) => {
    return (
      <MyFormControlLabel
        key={item}
        value={item}
        control={<Radio />}
        label={item}
      />
    );
  });
  return (
    <FormControl>
      <RadioGroup row name={props.id} defaultValue={props.value}>
        {itemList}
      </RadioGroup>
    </FormControl>
  );
}
