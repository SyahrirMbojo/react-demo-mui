import styled from "@emotion/styled";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
} from "@mui/material";
import React from "react";

const TableHeadCol = styled(TableHead)(() => ({
  "& .MuiTableCell-root": {
    fontWeight: "bold",
  },
}));

const TableBodyRow = styled(TableBody)(({ theme }) => ({
  "& .MuiTableRow-root": {
    "&:last-child td, &:last-child th": { border: 0 },
    "&:hover": {
      background: alpha(theme.palette.primary.light, 0.1),
      boxShadow: theme.shadows[5],
    },
  },
}));

function TableData(props) {
  const { columns = [], children } = props;
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simpe table">
          <TableHeadCol>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index} {...col}>
                  {col.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHeadCol>
          <TableBodyRow>{children}</TableBodyRow>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableData;
