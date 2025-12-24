import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { articleList } from "../../data/articleData";

import NavbarComponent from '../../components/Navbar'
import MainContainer from '../../components/MainContainer';
import Footer from '../../components/Footer';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const article = articleList.find((a) => a.id === Number(articleId));

  if (!article) return <div>존재하지 않는 아티클입니다.</div>;

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <NavbarComponent />

      <MainContainer>
        <Box
          sx={{ 
            padding: "16px 400px",
            display: "flex",
            flexDirection: "column",
            gap: 5
           }}
        >
          {/* 제목 및 저자 */}
           <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {/* 제목*/}
            <Typography variant="h3" fontWeight={700} fontSize="28px" lineHeight="42px">
              {article.title}
            </Typography>
            {/* 날짜, 저자 등 */}
            <Typography variant="body2" fontWeight={400} fontSize="16px" lineHeight="24px" color="var(--color-gray-500)">
              {article.title}
            </Typography>
           </Box>

          {/* 이미지 */}
          <img 
            src={article.thumbnail}
            alt={article.title}
            style={{ width: "100%", borderRadius: "16px", mt: 4, mb: 2 }}
          />

           {/* 내용 */}
            <Typography variant="body2" fontWeight={400} fontSize="18px" lineHeight="28px" color="var(--color-gray-700)" whiteSpace={"pre-line"}
              sx={{ mb: 1 }}>
              {article.contents}
            </Typography>
        </Box>

        

      </MainContainer>

      <Footer />
    </Container>
  );
};

export default ArticleDetail;
