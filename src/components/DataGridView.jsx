import styled from "@emotion/styled";
import { Box, Checkbox, alpha } from "@mui/material";
import MuiPagination from "@mui/material/Pagination";
import {
  DataGrid,
  GridPagination,
  gridPageCountSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import React from "react";
import PIC from "../assets";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";

const MyDataGrid = styled(DataGrid)(({ theme }) => ({
  border: "none",
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-row:hover": {
    boxShadow: theme.shadows[3],
    // background: alpha(theme.palette.primary.light, 0.1),
  },
  "& .MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader:focus": {
    outline: "none",
  },
  "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within":
    {
      outline: "none",
    },
}));

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  marginTop: 60,
  "& img": {
    width: 100,
    height: 100,
  },
}));

const CustomNoRowsOverlay = () => (
  <StyledGridOverlay>
    <img src={PIC.imgEmptyData} alt="empty" />
    <Box sx={{ mt: 1, mb: 10, color: "grey" }}>Data Empty</Box>
  </StyledGridOverlay>
);

const CustomNoResultsOverlay = () => (
  <StyledGridOverlay>
    <img src={PIC.imgEmptyData} alt="empty" />
    <Box sx={{ mt: 1, mb: 10, color: "grey" }}>No Result</Box>
  </StyledGridOverlay>
);

const Pagination = ({ page, onPageChange, className }) => {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
};

const PaginationServer = ({ page, onPageChange, className }) => {
  const apiRef = useGridApiContext();
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const countRow = apiRef.current.getRowsCount();
  const pageCount = Math.ceil(countRow / pageSize);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
};

const CustomPagination = (props) => {
  const { mode } = props;
  return (
    <GridPagination
      ActionsComponent={mode === "server" ? PaginationServer : Pagination}
      labelRowsPerPage={<>Rows per page:</>}
      {...props}
    />
  );
};

const CustomCheckbox = React.forwardRef((props, ref) => {
  return (
    <Checkbox
      icon={<CheckBoxOutlineBlankRoundedIcon />}
      checkedIcon={<CheckBoxRoundedIcon />}
      indeterminateIcon={<IndeterminateCheckBoxRoundedIcon />}
      ref={ref}
      {...props}
    />
  );
});

function DataGridView(props) {
  const {
    columns = [],
    dataSource = [],
    mode = "client",
    slotsCustom,
    slotPropsCustom,
  } = props;
  return (
    <>
      <MyDataGrid
        columns={columns}
        rows={dataSource}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 10,
            },
          },
        }}
        paginationMode={mode}
        hideFooterPagination={dataSource.length < 1 ? true : false}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        slots={{
          pagination: () => <CustomPagination mode={mode} />,
          noRowsOverlay: CustomNoRowsOverlay,
          noResultsOverlay: CustomNoResultsOverlay,
          baseCheckbox: CustomCheckbox,
          ...slotsCustom,
        }}
        slotProps={{
          baseTextField: {
            variant: "outlined",
          },
          ...slotPropsCustom,
        }}
        localeText={{
          footerRowSelected: (count) =>
            `${count.toLocaleString()} rows selected`,
        }}
        checkboxSelection
        disableColumnMenu
        disableRowSelectionOnClick
        autoHeight
        keepNonExistentRowsSelected
        {...props}
      />
    </>
  );
}

export default DataGridView;
