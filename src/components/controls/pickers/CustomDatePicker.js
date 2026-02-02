import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DateRange from "@mui/icons-material/DateRange";
import { withStyles } from "@mui/styles";

const styles = theme => ({
  textField: {
    [theme.breakpoints.up("xs")]: {
      width: 250
    },
    [theme.breakpoints.up("sm")]: {
      width: 300
    },
    [theme.breakpoints.up("md")]: {
      width: 500
    },
    marginRight: 10,
    marginTop: 20
  },
  textFieldFormLabel: {
    fontSize: "1.05rem"
  }
});

const CustomDatePicker = props => {
  const { handleDateChange, classes, name, value, label, ...rest } = props;

  const onDateChange = date => {
    if (!date) return;
    const target = {
      name: name,
      value: date.toDate() // adapter-moment provides moment object, toDate() returns JS Date
    };
    handleDateChange({ target });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label={label}
        value={value ? value : null}
        format="DD/MM/YYYY"
        onChange={onDateChange}
        slots={{
          openPickerIcon: DateRange,
          leftArrowIcon: KeyboardArrowLeft,
          rightArrowIcon: KeyboardArrowRight,
        }}
        slotProps={{
          textField: {
            className: classes.textField,
            placeholder: "dd/mm/yyyy",
            InputLabelProps: {
              shrink: true,
              className: classes.textFieldFormLabel
            }
          }
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default withStyles(styles, { withTheme: true })(CustomDatePicker);
