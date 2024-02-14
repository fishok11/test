import { FC } from "react";
import CalculationForm from "./CalculationForm";
import { Box } from "@mui/material";

const HomePage: FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CalculationForm/>
        </Box>
    )
}

export default HomePage;