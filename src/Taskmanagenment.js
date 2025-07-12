import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  Autocomplete,
  Select,
  MenuItem,
  InputBase,
  Tooltip,
  IconButton,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TaskADdModel from "./TashmanageModule/TaskADdModel";
import UpdateModel from "./UpdateModel";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Token } from "@mui/icons-material";
const Taskmanagenment = () => {
  const [openAddtask, setOpenAddtask] = useState(false);
  const [updatetask, setUpdatetask] = useState(false);
  const [taskList, setTaskList] = useState([]);
  console.log("check data", taskList)
  const [taskId, setTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [searchText, setSearchText] = useState("");
  console.log("check searchtext", searchText)
  const [openlog, setOpenlog] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  console.log("check date ", dueDate)
  const [tasks, setTasks] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [after100, setAfter100] = useState(0);
  const [paginationBatch, setPaginationBatch] = useState({ in_Page_Number: 1, in_Rows: 100 });
  const handlePageChange = (event, newPage) => {
    const isNext = newPage > page;

    if (isNext) {
      setAfter100((prev) => prev + 1);
      setPage(newPage);

      if (rowsPerPage === 10 && after100 === 9) {
        setPaginationBatch((prev) => ({
          ...prev,
          in_Page_Number: prev.in_Page_Number + 1,
          in_Rows: prev.in_Rows + 100,
        }));
        setAfter100(0);
      }

      if (rowsPerPage === 25 && after100 === 3) {
        setPaginationBatch((prev) => ({
          ...prev,
          in_Page_Number: prev.in_Page_Number + 1,
          in_Rows: prev.in_Rows + 100,
        }));
        setAfter100(0);
      }

      if (rowsPerPage === 50 && after100 === 1) {
        setPaginationBatch((prev) => ({
          ...prev,
          in_Page_Number: prev.in_Page_Number + 1,
          in_Rows: prev.in_Rows + 100,
        }));
        setAfter100(0);
      }

      if (rowsPerPage === 100 && after100 === 0) {
        setPaginationBatch((prev) => ({
          ...prev,
          in_Page_Number: prev.in_Page_Number + 1,
          in_Rows: prev.in_Rows + 100,
        }));
        setAfter100(0);
      }
    } else {
      setAfter100((prev) => Math.max(0, prev - 1));
      setPage(newPage);
    }
  };
  const handleRefresh = () => {
    setDueDate(null)
    setSearchText("")

  }
  const handleRowsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
    setAfter100(0);

    setPaginationBatch({
      in_Page_Number: 1,
      in_Rows: 100,
    });
  };

  const handleClickOpenlog = () => {
    setOpenlog(true);
  };
  const handleCloselog = () => {
    setOpenlog(false);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    setOpenlog(false);
    localStorage.removeItem("token");
    navigate("/");
  };
  const AddTaskOpen = () => {
    setOpenAddtask(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const AddTaskmanagement = () => {
    setOpenAddtask(false);
  };
  const UpdateTask = (task) => {
    setSelectedTask(task);
    setUpdatetask(true);
  };
  const UpdateTaskmanagement = () => {
    setUpdatetask(false);
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = (taskId) => {
    setTaskId(taskId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTaskId(null);
  };

  const handleConfirmDelete = (patientId) => {
    setOpen(false);
  };

  const columns = [
    { field: "title", headerName: "Title", width: 200, align: "center" },
    {
      field: "description",
      headerName: "Description",
      minWidth: 130,
      flex: 1,
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      align: "center",
      renderCell: (params) => (
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "15px",
            fontWeight: "bold",
            color:
              params.value.toLowerCase() === "completed"
                ? "#2E7D32"
                : "#D32F2F",
            backgroundColor:
              params.value.toLowerCase() === "completed"
                ? "#E8F5E9"
                : "#FFEBEE",
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      width: 130,
      align: "center",
      renderCell: (params) => (
        <span style={{ textTransform: "capitalize", fontWeight: "600" }}>
          {params.value}
        </span>
      ),
    },
    {
      field: "comments",
      headerName: "Comments",
      minWidth: 250,
      flex: 1,
      align: "left",
      renderCell: (params) => {
        const comments = params.value || [];
        return (
          <div>
            {comments.length == 0 ? (
              <span style={{ color: "gray" }}>No comments</span>
            ) : (
              comments.map((comment, index) => (
                <div
                  key={index}
                  style={{ fontSize: "13px", marginBottom: "4px" }}
                >
                  {comment.text}
                </div>
              ))
            )}
          </div>
        );
      },
    },
    {
      field: "color",
      headerName: "Color",
      width: 100,
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: params.value,
            margin: "20px",
            border: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title={params.value}
        />
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 150,
      align: "center",
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
  
    {
      field: "file",
      headerName: "Attachment",
      width: 180,
      align: "center",
      renderCell: (params) => {
        const file = params.value;
        if (!file || !file.mimeType) {
          return <Typography variant="caption" color="gray">No file</Typography>;
        }

        const fileUrl = `https://backend-8226.onrender.com/api/tasks/${file.path}`;
        const fileName = file.originalName || file.fileName;

        // For images
        if (file.mimeType.startsWith("image/")) {
          return (
            <Tooltip title="Click to view">
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={fileUrl}
                  alt={fileName}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                />
              </a>
            </Tooltip>
          );
        }

        // For PDFs
        return (
          <Tooltip title={fileName || "View PDF"}>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button
                size="small"
                variant="outlined"
                startIcon={
                  <img
                    src="https://www.svgrepo.com/show/512300/pdf-document.svg"
                    alt="PDF"
                    style={{ width: 18, height: 18 }}
                  />
                }
              >
                View
              </Button>
            </a>
          </Tooltip>
        );
      },
    },

    {
      field: "Actions",
      headerName: "Actions",
      sortable: false,
      align: "center",
      width: 160,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            width: "100%",
          }}
        >
          <Tooltip followCursor>
            <IconButton
              onClick={() => UpdateTask(params.row)}
              aria-label="edit"
              size="small"
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip>
            <IconButton
              onClick={() =>
                handleClickOpen(
                  params.row.id || params.row._id || params.row.taskId
                )
              }
              aria-label="delete"
              size="small"
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams({
      page: paginationBatch.in_Page_Number,
      limit: paginationBatch.in_Rows,
      ...(dueDate && { dueDate: dayjs(dueDate).format("MM/DD/YYYY") }),
      ...(searchText && { search: searchText }),
    });

    try {
      const response = await fetch(`https://backend-8226.onrender.com/api/tasks?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await response.json();

      const formatted = data.map((task) => ({
        taskId: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        category: task.category,
        color: task.color,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        comments: task.comments || [],
        file: task.file || null,
      }));

      setTaskList(formatted);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  const handleDeleteTask = async () => {
    const token = localStorage.getItem("token");
    if (!taskId) return;

    try {
      const response = await fetch(
        `https://backend-8226.onrender.com/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setSnackbarMessage("Task deleted successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        fetchTasks(dueDate);
      } else {
        setSnackbarMessage("Failed to delete task.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      setSnackbarMessage("Error deleting task.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }

    handleClose();
  };
  useEffect(() => {
    fetchTasks();
  }, [paginationBatch, searchText, dueDate]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ padding: "10px 10px 10px 10px" }}>
          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ padding: "4px 7px", background: "#EFF2F7", gap: "5px" }}
          >
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{
                background: "white",
                borderRadius: "6px",
                border: "1px solid #CDCDCD",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  sx={{
                    background: "white",
                    borderRadius: "6px",
                    display: "flex",
                    justifyContent: "flex-start",
                    p: 1,
                  }}
                >
                  <Grid
                    item
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                    sx={{
                      padding: "13px 10px 1px 10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        Task Management
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    sx={{
                      padding: "13px 15px 1px 70px",
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "65px",
                      justifyContent: "space-between",
                      gap: "5px"
                    }}
                  >

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "30px",
                      }}
                    >
                      <TextField
                        size="small"
                        label="Search Title & Description"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        fullWidth
                        sx={{ minWidth: "150px" }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={dueDate}
                          onChange={(newValue) => setDueDate(newValue)}
                          format="YYYY-MM-DD"
                          slotProps={{
                            textField: {
                              placeholder: "Search due date",
                              size: "small",
                              variant: "outlined",
                              sx: {
                                width: "100%",
                                minWidth: "150px",
                                "& .MuiInputBase-root": {
                                  height: "40px",
                                  fontSize: "16px",
                                },
                              },
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "10px"
                      }}
                    >
                      <Tooltip title="Refresh">
                        <IconButton
                          onClick={handleRefresh}
                          sx={{
                            backgroundColor: "green",
                            color: "white",
                            borderRadius: "6px",
                            "&:hover": {
                              backgroundColor: "#007d00",
                            },
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <RefreshIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/*  */}

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={3}
                xl={3}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <>
                  <FormControl
                    sx={{ padding: "13px 30px 1px 20px" }}
                    size="small"
                  >
                    <span>
                      <Button
                        sx={{
                          background: "#1A6C71",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        onClick={AddTaskOpen}
                      >
                        <AddCircleTwoToneIcon sx={{ height: "15px" }} />
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "10px",
                              sm: "10px",
                              lg: "10px",
                              xl: "12px",
                              md: "10px",
                            },
                          }}
                        >
                          {" "}
                          Add
                        </Typography>
                      </Button>
                    </span>
                  </FormControl>
                  <FormControl
                    sx={{ padding: "13px 30px 1px 20px" }}
                    size="small"
                  >
                    <span>
                      <Button
                        sx={{
                          background: "#1A6C71",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        onClick={handleClickOpenlog}
                      >
                        <LogoutIcon sx={{ height: "15px" }} />
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "10px",
                              sm: "10px",
                              lg: "10px",
                              xl: "12px",
                              md: "10px",
                            },
                          }}
                        >
                          Logout
                        </Typography>
                      </Button>
                    </span>
                  </FormControl>
                </>
              </Grid>
            </Grid>
            <Box
              sx={{
                height: {
                  xl: "75vh",
                  lg: "100vh",
                  md: "60vh",
                  xs: "80vh",
                  sm: "80vh",
                },
                overflow: "auto",
                width: "100%",
                background: "white",
              }}
            >
              <DataGrid
                rows={taskList}
                columns={columns}
                getRowId={(row) => row.taskId}
                pagination
                page={page}
                pageSize={rowsPerPage}
                paginationMode="client"
                onPageChange={handlePageChange}
                onPageSizeChange={handleRowsPerPageChange}
                pageSizeOptions={[10, 25, 50, 100]}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                      page: 1,
                    },
                  },
                }}
                sx={{
                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#e5f4ff",
                    color: "black",
                    fontWeight: 600,
                    fontSize: "14px",
                    fontFamily: "inter",
                    border: "0.5px solid white",
                    "& .MuiDataGrid-columnHeaderTitleContainer": {
                      justifyContent: "center",
                      textAlign: "center",
                    },
                  },
                  "& .MuiDataGrid-cell": {
                    border: "1px solid #d3d3d3",
                    textAlign: "center",
                    backgroundColor: "white",
                    color: "#585858",
                    fontSize: "12px",
                    fontWeight: 500,
                    fontFamily: "inter",
                  },
                  "& .MuiDataGrid-row": {
                    borderBottom: "1px solid #d3d3d3",
                  },
                  "& .MuiDataGrid-columnSeparator": {
                    display: "block !important",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    justifyContent: "flex-end",
                    height: "40px",
                    backgroundColor: "#e5f4ff",
                    color: "#000",
                    paddingRight: "10px",
                  },
                  "& .MuiTablePagination-root": {
                    justifyContent: "flex-end",
                  },
                  "& .MuiTablePagination-actions": {
                    marginLeft: "auto",
                  },
                  "& .MuiTablePagination-displayedRows": {
                    marginLeft: "10px",
                  },
                  "& .MuiInputBase-root": {
                    width: "57px",
                    height: "20px",
                    borderRadius: "10%",
                    backgroundColor: "white",
                  },
                }}
              />
            </Box>

            {/*  */}
          </Grid>
        </Box>
      </ThemeProvider>

      <Modal
        open={openAddtask}
        keepMounted
        onClose={AddTaskmanagement}
        aria-describedby="alert-dialog-slide-description"
      //
      >
        <Box sx={{ width: "100%" }}>
          <TaskADdModel
            AddTaskClose={AddTaskmanagement}
            Fetchtask={fetchTasks}
          />
        </Box>
      </Modal>
      <Modal
        open={updatetask}
        keepMounted
        onClose={UpdateTaskmanagement}
        aria-describedby="alert-dialog-slide-description"
      //
      >
        <Box sx={{ width: "100%" }}>
          <UpdateModel
            AddTaskClose={UpdateTaskmanagement}
            task={selectedTask}
            Fetchtask={fetchTasks}

          />
        </Box>
      </Modal>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Do you want to delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Button styles */}
          <Button
            onClick={handleClose}
            sx={{ backgroundColor: "#1A6C71", color: "white" }}
          >
            No
          </Button>
          <Button
            onClick={handleDeleteTask}
            sx={{ backgroundColor: "#1A6C71", color: "white" }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      {/* logout model */}
      <Dialog open={openlog} onClose={handleCloselog} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontSize: "16px" }}>
          Are you sure you want to log out?
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
          <Button
            onClick={handleLogout}
            variant="contained"
            size="small"
            sx={{ backgroundColor: "#1A6C71", color: "white" }}
          >
            Yes
          </Button>
          <Button onClick={handleCloselog} variant="outlined" size="small">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {},
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1.5px solid #0E6368",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1.5px solid #0E6368",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          fontSize: "8px",
          height: "25px",
          "@media (min-width:600px)": {
            fontSize: "8px",
            height: "25px",
          },
          "@media (min-width:960px)": {
            fontSize: "8px",
            height: "30px",
          },
          "@media (min-width:1280px)": {
            fontSize: "10px",
            height: "30px",
          },
          "@media (min-width:1920px)": {
            fontSize: "12px",
            height: "35px",
          },
        },
      },
    },
  },
});
const StyledPopper = styled(Popper)({
  "& .MuiAutocomplete-listbox": {
    fontSize: "10px",
    fontFamily: "Inter",
    maxHeight: "20vh",
    overflow: "auto",
  },
});

export default Taskmanagenment;
