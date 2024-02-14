import { Box, Button, Paper, TextField } from "@mui/material";
import { FC } from "react";

const CalculationForm: FC = () => {
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
          <TextField id="outlined-select-currency" select label=" Select student" defaultValue="" size="small" fullWidth />
          <TextField id="outlined-select-currency" select label="Select academic subject" defaultValue="" size="small" fullWidth />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" fullWidth />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" fullWidth/>
          <Button variant="contained" sx={{ mt: "15", bgcolor: "grey" }} fullWidth >Calculate</Button>
        </Box>
      </Paper>
    )
}

export default CalculationForm;