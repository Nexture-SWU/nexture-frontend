import {
  Box,
  Typography,
} from "@mui/material";
import MainContainer from "../../components/MainContainer";

export default function ServiceInfo({onNavigate}){

    return (
        <MainContainer sx={{height: '80vh'}}>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%'}}>
            <Typography sx={{fontSize: '28px', fontWeight: 400, color: 'var(--color-gray-600)'}}>AI와 함께 추론하고, 책을 읽어요</Typography>
            <Typography sx={{fontSize: '64px', fontWeight: 700, color: 'var(--color-blue-500)'}}>독서아이</Typography>
          </Box>
        </MainContainer>
    );
};