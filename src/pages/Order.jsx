import React, { useState } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaperBlock from "../components/PaperBlock";
import { Button, Stack, TextField } from "@mui/material";
import { UseParam } from "../hooks/UseParam";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    UseParam.setName(value);
    navigate("/report");
  };

  return (
    <>
      <Stack spacing={3}>
        <PaperBlock
          icon={<AccountBalanceIcon />}
          title="Orders"
          desc="This description for content"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sint
            nisi facilis earum incidunt cumque veritatis dolor expedita,
            molestias quis rem, eos ratione nobis. Reprehenderit quaerat ea aut
            molestias. Quas!
          </p>
        </PaperBlock>
        <PaperBlock title="Detail List">
          <div>Testing</div>
          <br />
          <Stack spacing={1} direction="row">
            <TextField
              id="outlined-basic"
              label="Plaintext"
              variant="outlined"
              onChange={(e) => setValue(e.target.value)}
            />
            <Button variant="contained" onClick={handleClick}>
              Submit
            </Button>
          </Stack>
        </PaperBlock>
      </Stack>
    </>
  );
}

export default Orders;
