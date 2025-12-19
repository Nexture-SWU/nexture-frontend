import { useRef } from "react";
import {
  Button,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import MainContainer from "../../../components/MainContainer";
import ImeSafeTextField from "../../../components/ImeSafeTextField";

export default function ReflectionCreateTable({ book, createReflection }) {
  /* =====================
     ref로 값 관리
  ====================== */
  const subjectRef = useRef();
  const summaryRef = useRef();
  const bookReviewRef = useRef();
  const debateReviewRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    

    createReflection({
      subject: subjectRef.current.value,
      summary: summaryRef.current.value,
      book_review: bookReviewRef.current.value,
      debate_review: debateReviewRef.current.value,
    });
  };

  const noBorderTextField = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { border: "none" },
      "&:hover fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "none" },
      padding: 0,
    },
  };

  return (
    <MainContainer>
      {/* 헤더 */}
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography fontSize={28} fontWeight={700}>
          최종 감상문 작성
        </Typography>
        <Button variant="outlined" 
          onClick={handleSubmit}
          sx={{
            borderColor: 'var(--color-blue-200)',
            color: 'var(--color-blue-500)',
            backgroundColor: 'var(--color-blue-050)',
            fontWeight: 700,
            fontSize: 16,
            borderRadius: '8px',
            paddingX: "20px",
            paddingY: "10px",
            '&:hover': {
            borderColor: 'var(--color-blue-200)',
            backgroundColor: 'var(--color-blue-100)',
                      },}}>
          저장하기
        </Button>
      </Stack>

      <Typography fontWeight={700} mb={2} fontSize={20} color="var(--color-gray-600)">
        감상문 입력
      </Typography>

      <Paper variant="outlined">
        <Table sx={{ tableLayout: "fixed", width: "100%", "& td": { fontSize: 18 } }}>
          <TableBody>
            <TableRow>
              <TableCell align="center" sx={{ width: 125, bgcolor: "var(--color-gray-100)", fontWeight: 700 }}>
                제목
              </TableCell>
              <TableCell colSpan={3}>
                <Typography fontSize={18}>{book.title}</Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center" sx={{ bgcolor: "var(--color-gray-100)", fontWeight: 700 }}>
                주제
              </TableCell>
              <TableCell colSpan={3}>
                <ImeSafeTextField
                  fullWidth
                  multiline
                  ref={subjectRef}
                  sx={noBorderTextField}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center" sx={{ bgcolor: "var(--color-gray-100)", fontWeight: 700 }}>
                줄거리
              </TableCell>
              <TableCell colSpan={3}>
                <ImeSafeTextField
                  fullWidth
                  multiline
                  rows={3}
                  ref={summaryRef}
                  sx={noBorderTextField}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center" sx={{ bgcolor: "var(--color-gray-100)", fontWeight: 700 }}>
                느낀점
              </TableCell>
              <TableCell colSpan={3}>
                <ImeSafeTextField
                  fullWidth
                  multiline
                  rows={4}
                  ref={bookReviewRef}
                  sx={noBorderTextField}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center" sx={{ bgcolor: "var(--color-gray-100)", fontWeight: 700 }}>
                토론
              </TableCell>
              <TableCell colSpan={3}>
                <ImeSafeTextField
                  fullWidth
                  multiline
                  rows={4}
                  ref={debateReviewRef}
                  sx={noBorderTextField}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </MainContainer>
  );
}
