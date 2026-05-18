import styled from "@emotion/styled";
import { Paper, Typography, alpha } from "@mui/material";
import React from "react";

const MyContainer = styled(Paper)(({ theme, nopadding }) => ({
  padding: 20,
  borderRadius: 10,
  ...(nopadding && {
    padding: 1,
  }),
}));

const MyHeader = styled("div")(({ nopadding }) => ({
  marginBottom: 30,
  ...(nopadding && {
    padding: "20px 20px 0px 20px",
  }),
}));

const MyIcon = styled("span")(({ theme }) => ({
  width: 45,
  height: 45,
  backgroundColor: alpha(theme.palette.primary.light, 0.1),
  textAlign: "center",
  lineHeight: 3.5,
  marginRight: 24,
  borderRadius: 8,
  color: theme.palette.primary.main,
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: 16,
  paddingBottom: 8,
  position: "relative",
  textTransform: "capitalize",
  fontSize: 24,
  "&:after": {
    content: '""',
    display: "block",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 50,
    borderBottom: `4px solid ${theme.palette.primary.main}`,
    borderRadius: 8,
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  maxWidth: 960,
  fontSize: 16,
  color: "grey",
}));

const Content = styled("section")(({ theme, nobgcontent = true }) => ({
  ...(nobgcontent && {
    padding: 8,
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
  }),
}));

function PaperBlock(props) {
  const { icon, title, desc, children, nobgcontent, nopadding } = props;
  return (
    <>
      <MyContainer elevation={4} nopadding={nopadding ? "true" : undefined}>
        {title && (
          <MyHeader nopadding={nopadding ? "true" : undefined}>
            <div style={{ display: "flex" }}>
              {icon && <MyIcon>{icon}</MyIcon>}
              <Title variant="title" component="h2">
                {title}
              </Title>
            </div>
            <Subtitle component="p">{desc}</Subtitle>
          </MyHeader>
        )}
        <Content nobgcontent={!nobgcontent}>{children}</Content>
      </MyContainer>
    </>
  );
}

export default PaperBlock;
