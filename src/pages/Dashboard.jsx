import React from "react";
import Grid from "@mui/material/Grid";
import PaperBlock from "../components/PaperBlock";
import BarChartIcon from "@mui/icons-material/BarChart";

function Dashboard() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <PaperBlock icon={<BarChartIcon />} title="Cart">
            <div>This is cart</div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              doloribus nam eius mollitia ipsa. Voluptatum possimus consequatur
              tempore rerum quaerat fugiat doloremque iusto, quas iure autem,
              eius eveniet ipsam accusamus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              doloribus nam eius mollitia ipsa. Voluptatum possimus consequatur
              tempore rerum quaerat fugiat doloremque iusto, quas iure autem,
              eius eveniet ipsam accusamus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              doloribus nam eius mollitia ipsa. Voluptatum possimus consequatur
            </p>
          </PaperBlock>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <PaperBlock icon={<BarChartIcon />} title="Deposito">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              doloribus nam eius mollitia ipsa. Voluptatum possimus consequatur
              tempore rerum quaerat fugiat doloremque iusto, quas iure autem,
              eius eveniet ipsam accusamus.
            </p>
          </PaperBlock>
        </Grid>
        <Grid item xs={12}>
          <PaperBlock icon={<BarChartIcon />} title="Trending">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              doloribus nam eius mollitia ipsa. Voluptatum possimus consequatur
              tempore rerum quaerat fugiat doloremque iusto, quas iure autem,
              eius eveniet ipsam accusamus.
            </p>
          </PaperBlock>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <PaperBlock icon={<BarChartIcon />} title="Deposito">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              doloribus nam eius mollitia ipsa. Voluptatum possimus consequatur
              tempore rerum quaerat fugiat doloremque iusto, quas iure autem,
              eius eveniet ipsam accusamus.
            </p>
          </PaperBlock>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <PaperBlock icon={<BarChartIcon />} title="Deposito">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              doloribus nam eius mollitia ipsa. Voluptatum possimus consequatur
              tempore rerum quaerat fugiat doloremque iusto, quas iure autem,
              eius eveniet ipsam accusamus.
            </p>
          </PaperBlock>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <PaperBlock icon={<BarChartIcon />} title="Deposito">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              doloribus nam eius mollitia ipsa. Voluptatum possimus consequatur
              tempore rerum quaerat fugiat doloremque iusto, quas iure autem,
              eius eveniet ipsam accusamus.
            </p>
          </PaperBlock>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
