import { Box, Button, MenuItem, Paper, TextField } from "@mui/material";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAcademicSubjects, getStudents, mainState } from "../app/mainSlice";

const CalculationForm: FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(mainState)
  useEffect(() => {
    dispatch(getStudents());
    dispatch(getAcademicSubjects());
  },)
  if (state.students === null || state.students === undefined) return null

  return (
    <Paper elevation={3}>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '30ch' },
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
        padding: '7px', 
      }}
      noValidate
      autoComplete="off"
      >
        <TextField id="outlined-select-currency" select label=" Select student" defaultValue="" size="small" fullWidth >
          {state.students?.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField id="outlined-select-currency" select label="Select academic subject" defaultValue="" size="small" fullWidth />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" fullWidth />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" fullWidth/>
        <Button variant="contained" sx={{ mt: "15", bgcolor: "grey" }} fullWidth >Calculate</Button>
      </Box>
    </Paper>
  )
}

export default CalculationForm;