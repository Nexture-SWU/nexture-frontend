import { useState, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Button
} from "@mui/material";
import { useParams } from "react-router-dom";

import NavbarComponent from '../../../components/Navbar';

import { useNavigateWithScrollTop } from '../../../hooks/useNavigateWithScrollTop';
import { useReading } from '../../../hooks/useReading';
import LoadingScreen from '../../../components/LoadingScreen';
import MainContainer from "../../../components/MainContainer";
import SideBar from "../../../components/Sidebar"

// 변수 받아와서 버튼 전환
function Reading() {
  const { chatId } = useParams()
  const {
      book,
      loading
    } = useReading(chatId);



  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        height: "auto",
        padding: "0",
        overflowY: "hidden"
      }}
    >
      <NavbarComponent />
      {loading && <LoadingScreen />}

      {!loading && <MainContainer sx={{ pt: "110px", pb: "0px", mb: 0, mt : 0, height: "100vh", overflow: "hidden",  }}>
        <Box sx={{ display: "flex", direction: "row" }}>
          <SideBar chatId={chatId} activeStep={0} />
          <Content book={book} chatId={chatId} />
        </Box>        
      </MainContainer>}
    </Container>
  );
}

export default Reading;

function Content({ book, chatId }) {
  const navigate = useNavigateWithScrollTop();
  const [isReading, setIsReading] = useState(true);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollTop, clientHeight, scrollHeight } = el;

    const ratio = (scrollTop + clientHeight) / scrollHeight;

    // 40% 이상 읽으면 버튼 활성화
    if (ratio >= 0.9 && isReading) setIsReading(false);
    if (ratio < 0.9 && !isReading) setIsReading(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 108px)",
        ml: 2,
      }}
    >
      {/* 🔥 스크롤 영역 */}
      <Box
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "40px 120px 80px 120px",

          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "var(--color-gray-100)",
            borderRadius: "8px",
          },
        }}
      >
        <Typography
          fontSize="18px"
          lineHeight="28px"
          sx={{ whiteSpace: "pre-line", mt: 5, mb: 10 }}
        >
          {book?.contents}
        </Typography>
      </Box>

      {/* 🔥 하단 버튼 */}
      <Box
        sx={{
          position: "sticky",
          bottom: "40px",
          padding: "40px 0",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "var(--background-color)",
        }}
      >
        <Button
          disabled={isReading}
          onClick={() => navigate(`/learning/chat/${chatId}`)}
          sx={{
            width: "100%",
            maxWidth: "1200px",
            color: "#fff",
            bgcolor: "var(--color-blue-500)",
            fontSize: "18px",
            padding: "12px 24px",
            borderRadius: "12px",
            '&:hover': {
                        borderColor: 'var(--color-blue-400)',
                        backgroundColor: 'var(--color-blue-400)',
                      },
            "&.Mui-disabled": {
              backgroundColor: "var(--color-gray-200)",
              color: "var(--color-gray-400)",
            },
          }}
        >
          {isReading ? "책을 읽는 중이에요." : "다음으로"}
        </Button>
      </Box>
    </Box>
  );
}
