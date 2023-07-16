import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

interface ManifestSelectionProps {
  id: string;
  value?: string;
  selections: Array<string>;
  onChange: any;
}

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

export function ManifestRadioGroupItem(props: ManifestSelectionProps) {
  return (
    <RadioGroup
      row
      name={props.id}
      value={props.value}
      onChange={props.onChange}
    >
      {props.selections.map((item: string) => {
        return (
          <MyFormControlLabel
            key={item}
            value={item}
            control={<Radio />}
            label={item}
          />
        );
      })}
    </RadioGroup>
  );
}
