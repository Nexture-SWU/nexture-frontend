import { Box, Typography, Collapse } from "@mui/material";
import { useReading } from '../hooks/useReading';
import { useGetChatList } from '../hooks/useGetChatList';
import { useState } from "react";

function SideBar({chatId, activeStep}) {  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const {
    book
  } = useReading(chatId);
  const {
    chatList,
  } = useGetChatList(chatId);
  console.log("chatList in Sidebar:", chatList);

  const activeChat = chatList.filter(chat => chat.chat_id === chatId)[0];
  const recentChat = chatList.filter(chat => chat.chat_id !== chatId).slice(-3);

  const Section = ({title, children, collapsible = false, open, onToggle}) => (

    <Box sx={{ 
      mb: 5 
      }}>
      {title &&(
        <Box
          onClick={collapsible ? onToggle : undefined}
          sx={{
            cursor: collapsible ? "pointer" : "default"
          }}>
            <Typography variant="h6" fontWeight={700} fontSize={"18px"} lineHeight={"30px"}
              sx={{ mb: 1 }}>
              {title}
            </Typography>
        </Box>
      )}

      {collapsible ? (
        <Collapse in={open}>
          <Box sx={{display: "flex", flexDirection: "column"}}>
            {children}
          </Box>
        </Collapse>
      ) : (
        <Box sx={{display: "flex", flexDirection: "column"}}>
          {children}
        </Box>
      )}
    </Box>
  );

  const MenuItem = ({children, active = false, indent = false}) => (
    <Box
      sx={{
        padding: "8px",
        mr: "16px",
        paddingLeft: indent ? "24px" : "8px",
        fontSize: "16px",
        lineHeight: "28px",
        fontWeight : active ? 700 : 400,
        borderRadius: 1,
        color : active ? "var(--color-gray-800)" : "var(--color-gray-700)",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "var(--color-gray-200)",
        },
      }}>
        {children}
    </Box>
  );

  return (       
    <Box 
      sx={{
        maxHeight: "80vh",
        width: isCollapsed ? "56px" : "240px", // 🔥 핵심
        padding: isCollapsed ? "0" : "0px 24px",
        pr: "8px",
        bgcolor: isCollapsed ? "var(--color-base-000)" : "var(--color-gray-100)",
        borderRadius: 5,
        transition: "width 0.25s ease, padding 0.25s ease",
        mr: 3,
      }}>

        <Box 
          sx={{
            height: "100%",       
            overflowY: "auto",

            "&::-webkit-scrollbar": {
              width: "8px",
            },

            /* 화살표 제거 */
            "&::-webkit-scrollbar-button": {
              display: "none",
            },

            /* 배경 */
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },

            /* 손잡이 */
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--color-gray-200)",
              borderRadius: "8px",
            },

            /* 손잡이 호버링 */
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "var(--color-gray-300)",
            }
        }}>

          <Box sx={{ display: "flex", justifyContent: "flex-end", px: isCollapsed ?"0px":"24px", pt: isCollapsed ?"0px":"24px", mb: 2, transition: "padding 0.25s ease",}}>
              <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/images/icons/dock_to_right.svg`}
              alt=""
              sx={{ width: 18, height: 18 }}
              onClick={() => setIsCollapsed(prev => !prev)}
              />
          </Box>

          {/* 상단 */}
          {!isCollapsed && (<Box sx={{ mb: 5 }}>
            <Typography variant="h6" fontWeight={700} fontSize={"20px"} lineHeight={"30px"}
              sx={{ mb: "4px" }}>
              {book?.title}
            </Typography>
            <Typography variant="body2" fontWeight={400} fontSize={"14px"} lineHeight={"22px"}>
              {book?.author}
            </Typography>
          </Box>)}

          {/* 독서 토론 */}
          {!isCollapsed && recentChat.length > 0 && (<Section title="최근 학습 기록">
            {recentChat.map((chat) => (
              <MenuItem key={chat.chat_id}>{chat.title}</MenuItem>
            ))}
          </Section>)}

          {/* 독서 토론 */}
          {!isCollapsed && (<Section title="독서 토론">
            <MenuItem active={activeStep === 0} >책 읽기</MenuItem>
            <MenuItem active={activeStep === 1}>토론 하기</MenuItem>
          </Section>)}

          {/* 감상문 */}
          {!isCollapsed && (<Section title="감상문 쓰기">
            <MenuItem active={activeStep === 2}>감상문 쓰기</MenuItem>
          </Section>)}

          {!isCollapsed && (<Section title="평가 보고서">
            <MenuItem active={activeStep === 3}>보고서 확인</MenuItem>
          </Section>)}
        </Box>
    </Box>
  );
}

export default SideBar;