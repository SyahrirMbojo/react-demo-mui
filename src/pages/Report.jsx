import { ListItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import PaperBlock from "../components/PaperBlock";
import ListView from "../components/ListView";
import { UseParam } from "../hooks/UseParam";

function Report() {
  return (
    <>
      <PaperBlock elevation={4}>
        <Grid container spacing={3}>
          <Grid item xs>
            <div
              style={{
                background: "red",
              }}
            >
              xs
            </div>
          </Grid>
          <Grid item xs>
            <div
              style={{
                background: "red",
              }}
            >
              xs
            </div>
          </Grid>
          <Grid item xs>
            <div
              style={{
                background: "red",
              }}
            >
              xs
            </div>
          </Grid>
        </Grid>
        <ListView direction="row">
          <ListItem>
            <div
              style={{
                width: 400,
                height: 100,
                background: "green",
              }}
            ></div>
          </ListItem>
          <ListItem>
            <div
              style={{
                width: 400,
                height: 100,
                background: "green",
              }}
            ></div>
          </ListItem>
          <ListItem>
            <div
              style={{
                width: 400,
                height: 100,
                background: "green",
              }}
            ></div>
          </ListItem>
        </ListView>
        <br />
        <div>{UseParam.getName()}</div>
      </PaperBlock>
    </>
  );
}

export default Report;
