import React from "react";
import PaperBlock from "../components/PaperBlock";
import ViewListIcon from "@mui/icons-material/ViewList";
import { TableCell, TableRow } from "@mui/material";
import TableData from "../components/TableData";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Customers() {
  const columns = [
    {
      title: "Dessert (100g serving)",
    },
    {
      title: "Calories",
      align: "right",
    },
    {
      title: "Fat (g)",
      align: "right",
    },
    {
      title: "Carbs (g)",
      align: "right",
    },
    {
      title: "Protein (g)",
      align: "right",
    },
  ];
  return (
    <>
      <PaperBlock
        icon={<ViewListIcon />}
        title="List Customer"
        desc="List data for customer"
        nobgcontent
      >
        <TableData columns={columns}>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableData>
      </PaperBlock>
    </>
  );
}

export default Customers;
