import React, { useEffect, useState } from "react";
import PaperBlock from "../components/PaperBlock";
import PersonIcon from "@mui/icons-material/Person";
import * as baseapi from "../utils/Baseapi";
import DataGridView from "../components/DataGridView";
import { Avatar, Box, Button, Chip, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchView from "../components/SearchView";
import PIC from "../assets";
import DialogView from "../components/DialogView";
import { stringAvatar } from "../utils/Global";
import { useGet } from "../hooks/UseHooks";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import BtnHideColumn from "../components/BtnHideColumn";

function Users() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchtext, setSearchtext] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [limitPage, setLimitPage] = useState(10);
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [selectedRowsTemp, setSelectedRowsTemp] = React.useState([]);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [open, setOpen] = React.useState(false);

  const apiRef = useGridApiRef();

  useEffect(() => {
    getDataUser(currentPage, limitPage, searchtext);
  }, [currentPage, limitPage, searchtext]);

  const getDataUser = async (page, limit, search) => {
    setLoading(true);
    let url = baseapi.apiListUser(page, limit, search);
    let { data, isloading } = await useGet(url);
    let resdata = data && data.pagination;
    setDataSource(resdata !== null ? resdata.data : []);
    setTotal(resdata !== null ? resdata.total : 0);
    setLoading(isloading);
  };

  const renderColNumberRow = (params) => {
    let indexpage = currentPage !== 0 ? currentPage - 1 : currentPage;
    let indexrow = apiRef.current.getSortedRowIds().indexOf(params.row.id);
    return indexpage * limitPage + 1 + indexrow;
  };

  const renderColName = (params) => {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          alt={params.value}
          {...stringAvatar(params.value)}
          src={params.row.profile_image}
        />
        {params.value}
      </Stack>
    );
  };

  const renderColStatus = (params) => {
    const statusname = params.value == "1" ? "Active" : "Non Active";
    const statuscolor = params.value == "1" ? "success" : "error";
    return (
      <Chip
        label={statusname}
        color={statuscolor}
        variant="outlined"
        size="small"
      />
    );
  };

  const columns = [
    {
      sortable: false,
      headerName: "No",
      flex: 0.2,
      minWidth: 50,
      renderCell: renderColNumberRow,
    },
    {
      field: "nama",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      renderCell: renderColName,
    },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 150 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 70 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      minWidth: 50,
      renderCell: renderColStatus,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 70,
      sortable: false,
      valueGetter: (params) => `${params.row.role.role_name || ""}`,
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.2,
      minWidth: 20,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          color="warning"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<ClearIcon />}
          label="Delete"
          color="error"
          showInMenu
        />,
      ],
    },
  ];

  const searchDataPress = (event) => {
    if (event.key === "Enter") {
      setSearchtext(event.target.value);
    }
  };

  const clearTextInput = (event) => {
    setSearchtext("");
  };

  const onRowsSelectionHandler = (ids) => {
    // console.log("selected id: ", ids);
    if (ids.length > 0) {
      setDisabledBtn(false);

      setSelectedIds(ids);

      ids.map((id) => {
        if (id !== undefined) {
          dataSource.find((row) => {
            if (row.id === id) {
              setSelectedRowsTemp((oldArray) => [...oldArray, row]);
            }
          });
        }
      });
    } else {
      setDisabledBtn(true);
      clearSelected();
    }
  };

  const handleMultiDelete = (event) => {
    setSelectedRows([]);
    const selectedData = selectedIds.map((id) =>
      selectedRowsTemp.find((row) => row.id === id)
    );
    setSelectedRows(selectedData);
    setOpen(true);
  };

  const clearSelected = () => {
    setSelectedIds([]);
    setSelectedRowsTemp([]);
    setSelectedRows([]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PaperBlock
        icon={<PersonIcon />}
        title="List Users"
        desc="List data for management users with server side"
        nobgcontent
        nopadding
      >
        <Stack
          spacing={1}
          direction={{
            sm: "row",
            xs: "column",
          }}
          justifyContent="space-between"
          sx={{ pb: 2, pl: 2, pr: 2 }}
        >
          <Stack spacing={1} direction="row">
            <Button variant="contained" startIcon={<AddIcon />}>
              Add User
            </Button>
            <IconButton color="primary">
              <FileDownloadIcon />
            </IconButton>
            <IconButton color="primary">
              <FileUploadIcon />
            </IconButton>
            <IconButton
              disabled={disabledBtn}
              color="primary"
              onClick={handleMultiDelete}
            >
              <DeleteIcon />
            </IconButton>
            <BtnHideColumn apiref={apiRef} />
          </Stack>
          <SearchView
            placeholder="Press ENTER for searching..."
            onKeyDown={searchDataPress}
            onClearValue={clearTextInput}
          />
        </Stack>
        <DataGridView
          apiRef={apiRef}
          mode="server"
          columns={columns}
          dataSource={dataSource}
          rowCount={total}
          loading={loading}
          onPaginationModelChange={(model) => {
            setCurrentPage(model.page + 1);
            setLimitPage(model.pageSize);
            getDataUser(model.page + 1, model.pageSize, searchtext);
          }}
          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        />
      </PaperBlock>

      <DialogView
        title="Confirmation"
        desc="Are you sure want to delete this user?"
        open={open}
        onClose={handleClose}
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
              label={item.nama}
              variant="outlined"
            />
          ))}
        </Stack>
      </DialogView>
    </>
  );
}

export default Users;
