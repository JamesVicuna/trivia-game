import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Slider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { saveOptions } from "../redux/features/options/optionsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Options = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const defaultOptions = useAppSelector((state) => state.options);
  const [options, setOptions] = useState(defaultOptions);

  const setOption = (option: any, value: any) => {
    setOptions((state) => {
      return {
        ...state,
        [option]: value,
      };
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch(saveOptions(options));
    setOpen(false);
  };

  return (
    <>
      <button className="app-button" onClick={handleOpen}>
        Options
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Amount</Typography>
          <Slider
            name="amount"
            defaultValue={10}
            step={1}
            min={5}
            max={15}
            valueLabelDisplay="on"
            value={options.amount}
            onChange={(e: any) => setOption(e.target.name, e.target.value)}
          />

          <Typography variant="h6">Question Type</Typography>
          <RadioGroup
            name="type"
            value={options.type}
            onChange={(e) => setOption(e.target.name, e.target.value)}
          >
            <FormControlLabel
              control={<Radio />}
              label="Multiple Choice"
              value="multiple"
            />
            <FormControlLabel
              control={<Radio />}
              label="True/False"
              value="boolean"
            />
          </RadioGroup>

          <Typography variant="h6">Difficulty</Typography>
          <RadioGroup
            name="difficulty"
            value={options.difficulty}
            onChange={(e) => setOption(e.target.name, e.target.value)}
          >
            <FormControlLabel
              control={<Radio />}
              label="Easy"
              value="easy"
            />
            <FormControlLabel
              control={<Radio />}
              label="Medium"
              value="medium"
            />
            <FormControlLabel
              control={<Radio />}
              label="Hard"
              value="hard"
            />
          </RadioGroup>
        </Box>
      </Modal>
    </>
  );
};
