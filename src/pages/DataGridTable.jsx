import React, { useCallback } from "react";
import PaperBlock from "../components/PaperBlock";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  GridActionsCellItem,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  Avatar,
  Button,
  Chip,
  Collapse,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  debounce,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DataGridView from "../components/DataGridView";
import SearchView from "../components/SearchView";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DialogView from "../components/DialogView";
import PIC from "../assets";
import * as global from "../utils/Global";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import BtnHideColumn from "../components/BtnHideColumn";

const dataSource = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: "Ad", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 11, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 12, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 13, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 14, lastName: "Targaryen", firstName: "Daenerys", age: "ada" },
  { id: 15, lastName: "Melisandre", firstName: "adad", age: 150 },
  { id: 16, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 17, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 18, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 19, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 20, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const CustomToolbarHeader = ({ setFilterButtonEl }) => (
  <GridToolbarContainer sx={{ pb: 2, pl: 2, pr: 2 }}>
    <Button variant="contained" startIcon={<AddIcon />}>
      Add New
    </Button>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
    <GridToolbarExport />
    <Box sx={{ flexGrow: 1 }} />
    <GridToolbarQuickFilter />
  </GridToolbarContainer>
);

function DataGridTable() {
  const [filterButtonEl, setFilterButtonEl] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [disabledBtn, setDisabledBtn] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [clickedIndex, setClickedIndex] = React.useState(-1);

  const apiRef = useGridApiRef();
  const updateSearchValue = React.useMemo(() => {
    return debounce((newValue) => {
      apiRef.current.setQuickFilterValues(
        newValue.split(" ").filter((word) => word !== "")
      );
    }, 100);
  }, [apiRef]);

  function handleSearchValueChange(event) {
    const newValue = event.target.value;
    setSearchValue(newValue);
    updateSearchValue(newValue);
  }

  const clearTextInput = (event) => {
    setSearchValue("");
    updateSearchValue("");
  };

  const onRowsSelectionHandler = (ids) => {
    // console.log("selected id: ", ids);
    if (ids.length > 0) {
      setDisabledBtn(false);
      const selectedRowsData = ids.map((id) =>
        dataSource.find((row) => row.id === id)
      );
      // console.log(selectedRowsData);
      setSelectedRows(selectedRowsData);
    } else {
      setDisabledBtn(true);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNew = (event) => {
    global.toastInfo("Please contact Administrator");
  };

  const handleDeleteRow = useCallback((id) => () => {
    global.toastWarning("Do you want to delete this ID = " + id + " ?");
  });

  const showFilterPanel = () => {
    apiRef.current.showFilterPanel();
  };

  const handleCollapse = useCallback((value) => () => {
    if (clickedIndex === value) {
      setClickedIndex(-1);
    } else {
      setClickedIndex(value);
    }
  });

  const renderColAge = (params) => {
    const iscolor = params.value > 60 ? "error" : "success";
    return params.value !== null ? (
      <Chip
        size="small"
        label={params.value}
        color={iscolor}
        variant="contained"
      />
    ) : (
      ""
    );
  };

  const renderRow = (params) => {
    return (
      <Box
        sx={{
          pt: 2,
          pb: 2,
        }}
      >
        {params.id === clickedIndex ? (
          <Stack direction="row" spacing={10}>
            <Box>
              <div>FirstName: {params.value}</div>
              <div>LastName: {params.row.lastName}</div>
            </Box>
            <Box>
              <div>Age: {params.row.age}</div>
              <div>
                FullName: {params.row.firstName} {params.row.lastName}
              </div>
            </Box>
          </Stack>
        ) : (
          <div>{params.value}</div>
        )}

        <Collapse in={params.id === clickedIndex}>
          <Box
            sx={{
              // borderTop: "2px solid",
              // borderTopColor: "primary.main",
              pt: 2,
            }}
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              dicta odit aspernatur suscipit labore quam adipisci! Sequi, quas
              neque vel modi necessitatibus molestiae vero earum maxime,
              inventore dolorem, mollitia harum.
            </p>
          </Box>
        </Collapse>
      </Box>
    );
  };

  const columns = [
    {
      sortable: false,
      filterable: false,
      headerName: "No",
      flex: 0.2,
      minWidth: 50,
      renderCell: (params) =>
        apiRef.current.getSortedRowIds().indexOf(params.row.id) + 1,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Edit" placement="top">
              <EditIcon />
            </Tooltip>
          }
          label="Edit"
          color="warning"
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete" placement="top">
              <ClearIcon />
            </Tooltip>
          }
          label="Delete"
          color="error"
          onClick={handleDeleteRow(params.id)}
        />,
        <GridActionsCellItem
          icon={
            params.id === clickedIndex ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )
          }
          label="Expand"
          color="primary"
          onClick={handleCollapse(params.id)}
        />,
      ],
    },
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
      minWidth: 100,
      renderCell: renderRow,
      colSpan: ({ row }) => {
        return row.id === clickedIndex ? 4 : 1;
      },
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 0.5,
      minWidth: 50,
      renderCell: renderColAge,
    },
    {
      field: "fullName",
      headerName: "Full name",
      flex: 1,
      minWidth: 150,
      sortable: false,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  return (
    <>
      <PaperBlock
        icon={<ViewListIcon />}
        title="Data Grid Client"
        desc="List data for data grid client side"
        nobgcontent
        nopadding
      >
        <Stack
          spacing={1}
          direction={{
            sm: "row",
            xs: "column",
          }}
          sx={{ pb: 2, pl: 2, pr: 2 }}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddNew}
            >
              Add New
            </Button>
            <IconButton
              disabled={disabledBtn}
              color="primary"
              onClick={handleOpen}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton color="primary" onClick={showFilterPanel}>
              <FilterListRoundedIcon />
            </IconButton>
            <BtnHideColumn apiref={apiRef} />
          </Stack>
          <SearchView
            value={searchValue}
            onChangeValue={handleSearchValueChange}
            onClearValue={clearTextInput}
            label="Search"
            placeholder="Find data here..."
          />
        </Stack>

        <DataGridView
          apiRef={apiRef}
          columns={columns}
          dataSource={dataSource}
          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
          getRowHeight={({ id, densityFactor }) => {
            if (id === clickedIndex) {
              // return 100 * densityFactor;
              return "auto";
            }

            return null;
          }}
          // slotsCustom={{
          //   toolbar: CustomToolbarHeader,
          // }}
          // slotPropsCustom={{
          //   panel: {
          //     anchorEl: filterButtonEl,
          //   },
          //   toolbar: {
          //     setFilterButtonEl,
          //   },
          // }}
        />
      </PaperBlock>

      <DialogView
        title="Confirmation"
        desc="Are you sure want to delete this user?"
        open={open}
        onClose={handleClose}
        closedialog={handleClose}
        actions={
          <>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </>
        }
      >
        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" flexWrap="wrap">
          {selectedRows.map((item) => (
            <Chip
              avatar={<Avatar alt="Natacha" src={PIC.imgUser} />}
              label={`${item.firstName} ${item.lastName}`}
              variant="outlined"
            />
          ))}
        </Stack>
      </DialogView>
    </>
  );
}

export default DataGridTable;
