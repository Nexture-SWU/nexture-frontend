import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import MainContainer from "../../../components/MainContainer";

export default function ReflectionCreateTable({ createReflection }) {
  /* =====================
     입력 상태 관리
  ====================== */
  const [form, setForm] = useState({
    title: "",
    subject: "",
    summary: "",
    book_review: "",
    debate_review: "",
  });

  const handleChange = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    createReflection({
      title: form.title,
      subject: form.subject,
      summary: form.summary,
      book_review: form.book_review,
      debate_review: form.debate_review,
    });
  };

  /* =====================
     입력용 테이블
  ====================== */
  const InfoTable = () => {
    return (
      <Table
        sx={{
          tableLayout: "fixed",
          width: "100%",
          "& td": { fontSize: 16 },
        }}
      >
        <TableBody>
          <TableRow>
            <TableCell
              align="center"
              sx={{ width: 250, bgcolor: "var(--color-gray-100)", fontWeight: 700 }}
            >
              제목
            </TableCell>
            <TableCell colSpan={3}>
              <TextField
                fullWidth
                value={form.title}
                onChange={handleChange("title")}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              align="center"
              sx={{ bgcolor: "var(--color-gray-100)", fontWeight: 700 }}
            >
              주제
            </TableCell>
            <TableCell colSpan={3}>
              <TextField
                fullWidth
                value={form.subject}
                onChange={handleChange("subject")}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              align="center"
              sx={{ bgcolor: "var(--color-gray-100)", fontWeight: 700 }}
            >
              줄거리
            </TableCell>
            <TableCell colSpan={3}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={form.summary}
                onChange={handleChange("summary")}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell
              align="center"
              sx={{ bgcolor: "var(--color-gray-100)", fontWeight: 700 }}
            >
              느낀점
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                multiline
                minRows={4}
                value={form.book_review}
                onChange={handleChange("book_review")}
              />
            </TableCell>

            <TableCell
              align="center"
              sx={{ bgcolor: "var(--color-gray-100)", fontWeight: 700 }}
            >
              토론
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                multiline
                minRows={4}
                value={form.debate_review}
                onChange={handleChange("debate_review")}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  return (
    <MainContainer>
      {/* 헤더 */}
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Typography fontSize={28} fontWeight={700}>
          최종 감상문 작성
        </Typography>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            fontWeight: 700,
            fontSize: 16,
            borderRadius: "8px",
            paddingX: "20px",
            paddingY: "10px",
          }}
        >
          저장하기
        </Button>
      </Stack>

      {/* 입력 테이블 */}
      <Typography
        fontWeight={700}
        mb={2}
        fontSize={20}
        color={"var(--color-gray-600)"}
      >
        감상문 입력
      </Typography>

      <Paper variant="outlined">
        <InfoTable />
      </Paper>
    </MainContainer>
  );
}
