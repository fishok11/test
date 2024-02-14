import { Box, Button, MenuItem, Paper, Stack, TextField } from "@mui/material";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAcademicSubjects, getStudents, mainState } from "../app/mainSlice";
import { Student } from "../app/types";

const HomePage: FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(mainState)
  useEffect(() => {
    dispatch(getStudents());
    dispatch(getAcademicSubjects());
  },)
  // if (state.students === null || state.students === undefined) return null

  return (
    <Stack spacing={2} sx={{ width: '450px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', m: 'auto', height: '100%'}}>
      <TextField id="outlined-select-currency" select label=" Select student" defaultValue="" size="small" fullWidth >
        {/* {state.students?.map((item: Student) => (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        ))} */}
      </TextField>
      <TextField id="outlined-select-currency" select label="Select academic subject" defaultValue="" size="small" fullWidth />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" fullWidth />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" fullWidth/>
      <Button variant="contained"  fullWidth >Calculate</Button>
    </Stack>
  )
}

export default HomePage;