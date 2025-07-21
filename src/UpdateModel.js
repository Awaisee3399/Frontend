import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Grid,
  Box,
  FormLabel,
  Typography,
  Modal,
  ThemeProvider,
  MenuItem,
  Select,
  FormControl,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import { createTheme } from "@mui/material/styles";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#0E6368",
            },
            "&.Mui-focused fieldset": {
              border: "1.5px solid #0E6368",
            },
            "& .MuiOutlinedInput-input": {
              height: "18px",
              padding: "6px 14px",
              fontSize: "11px",
            },
            background: "#F2F2F2",
            height: {
              xl: "40px",
              lg: "35px",
              md: "30px",
              xs: "30px",
              sm: "30px",
            },
            fontSize: {
              xl: "12px",
              lg: "10px",
              md: "10px",
              xs: "9px",
              sm: "9px",
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: {
              xl: "12px",
              lg: "10px",
              md: "10px",
              xs: "9px",
              sm: "9px",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            fontSize: {
              xl: "12px",
              lg: "10px",
              md: "10px",
              xs: "9px",
              sm: "9px",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiSelect-select": {
            fontSize: "11px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1.5px solid #0E6368",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1.5px solid #0E6368",
          },
        },
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: {
          "@media (max-width: 600px)": {
            width: "100%",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        noOptions: {
          fontSize: "10px",
          color: "black",
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
const UpdateModel = ({ AddTaskClose, task, Fetchtask }) => {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleOpen = () => setOpen(true);
  const handleClose = () => AddTaskClose();
  const [status, setStatus] = useState("");
<<<<<<< HEAD
  console.log("check status", status);
  const [category, setCategory] = useState("");
  console.log("check category", category);
=======
  console.log("check status", status)
  const [category, setCategory] = useState("");
  console.log("check category", category)
>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
  const [dueDate, setDueDate] = useState(null);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [file, setFile] = useState(null);
  console.log("check data", comment);
  console.log("check status", status);

  const [title, setTtitle] = useState("");
  const [description, setDescription] = useState("");

<<<<<<< HEAD
=======

>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
  useEffect(() => {
    if (task) {
      setStatus(task.status);
      setCategory(task.category);
      setTtitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate ? new Date(task.dueDate) : null);

      if (task.comments && task.comments.length > 0) {
        setComment(task.comments[0].text);
        setCommentId(task.comments[0]._id);
      } else {
        setComment("");
        setCommentId(null);
      }
      if (task.file) {
        setFile(task.file);
      }

      console.log("status from task:", task.status);
    }
  }, [task]);

  const handleUpdate = async () => {
<<<<<<< HEAD
=======

>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status.toLowerCase());
    formData.append("category", category.toLowerCase());
    formData.append("dueDate", dueDate ? new Date(dueDate).toISOString() : "");

    if (comment) {
<<<<<<< HEAD
      formData.append(
        "comments",
        JSON.stringify([{ _id: commentId, text: comment }])
      );
=======
      formData.append("comments", JSON.stringify([{ _id: commentId, text: comment }]));
>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
    }

    if (file instanceof File) {
      formData.append("file", file);
    }

    try {
<<<<<<< HEAD
      const res = await fetch(
        `https://backend-8226.onrender.com/api/tasks/${task.taskId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
=======
      const res = await fetch(`https://backend-8226.onrender.com/api/tasks/${task.taskId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81

      const data = await res.json();
      if (res.ok) {
        setSnackbarMessage("Task updated successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          AddTaskClose();
          Fetchtask();
        }, 2000);
      } else {
        setSnackbarMessage("Update failed: " + data.message);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setSnackbarMessage("An error occurred while updating the task.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "30%",
            margin: "auto",
<<<<<<< HEAD
            marginTop: "12%",
=======
            marginTop: "8%",
>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
            backgroundColor: "#fff",
            boxShadow: 24,
            borderRadius: "10px",
            outline: "none",
          }}
        >
<<<<<<< HEAD
          <Box
            sx={{
              width: "99.5%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#1A6C71",
              padding: "2px",
              borderRadius: "8px 8px 0px 0px ",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "Inter",
                color: "#fff",
                fontSize: "14px",
                paddingLeft: "10px",
                fontWeight: "600",
              }}
            >
              Update Task
            </Typography>
            <GridCloseIcon
              fontSize="small"
              onClick={handleClose}
              sx={{ color: "white", cursor: "pointer" }}
            />
          </Box>
          <Grid
            container
            spacing={0.5}
            sx={{ padding: "10px", height: "auto", overflow: "auto" }}
          >
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel
                  sx={{ fontSize: "13px", fontWeight: 600, color: "#333" }}
                >
                  Title
                </FormLabel>
                <TextField
                  sx={{
                    background: "#F2F2F2",
                  }}
                  type="title"
                  size="small"
                  name="title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTtitle(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={4} md={4} sm={4} xl={4}>
              <FormControl fullWidth size="small">
                <FormLabel
                  sx={{
                    fontSize: {
                      xl: "13px",
                      lg: "11px",
                      md: "8px",
                    },
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  Status
                </FormLabel>
                <Select
                  value={status}
                  name="Status"
                  // onChange={handlestatus}

                  onChange={(e) => setStatus(e.target.value)}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  size="small"
                  // onChange={handleChange}
                  sx={{
                    height: {
                      xl: "30px",
                      lg: "30px",
                      md: "30px",
                      sm: "30px",
                      xs: "30px",
                    },
                    background: "#F2F2F2",
                    fontSize: {
                      xl: "16px",
                      lg: "13px",
                      md: "13px",
                      xs: "11px",
                      sm: "11px",
                    },
                  }}
                >
                  <MenuItem value="pending" sx={{ fontSize: "10px" }}>
                    Pending
                  </MenuItem>
                  <MenuItem value="completed" sx={{ fontSize: "10px" }}>
                    Completed
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={8} md={8} sm={8} xl={8}>
              <FormControl fullWidth>
                <FormLabel
                  sx={{
                    fontSize: {
                      xl: "13px",
                      lg: "11px",
                      md: "8px",
                    },
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  Description
                </FormLabel>
                <TextField
                  type="text"
                  size="small"
                  name="description"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  // onChange={handleFieldsChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <FormControl fullWidth size="small">
                <FormLabel
                  sx={{
                    fontSize: { xl: "13px", lg: "11px", md: "8px" },
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  Category
                </FormLabel>
                <Select
                  value={category}
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                  sx={{
                    height: "30px",
                    background: "#F2F2F2",
                    fontSize: {
                      xl: "16px",
                      lg: "13px",
                      md: "13px",
                      xs: "11px",
                      sm: "11px",
                    },
                  }}
                >
                  <MenuItem value="high" sx={{ fontSize: "10px" }}>
                    High
                  </MenuItem>
                  <MenuItem value="medium" sx={{ fontSize: "10px" }}>
                    Medium
                  </MenuItem>
                  <MenuItem value="low" sx={{ fontSize: "10px" }}>
                    Low
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
              <FormControl fullWidth size="small">
                <FormLabel
                  sx={{
                    fontSize: { xl: "13px", lg: "11px", md: "8px" },
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  Due Date
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={dueDate}
                    onChange={(newValue) => setDueDate(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        sx={{
                          background: "#F2F2F2",
                          fontSize: { xl: "16px", lg: "13px", md: "13px" },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel
                  sx={{ fontSize: "13px", fontWeight: 600, color: "#333" }}
                >
                  Upload File (Image or PDF)
                </FormLabel>

                <Button
                  variant="outlined"
                  component="label"
                  size="small"
                  sx={{ textTransform: "none", mt: 1 }}
                >
                  Choose File
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*,.pdf"
                  />
                </Button>

                {file && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {file.originalName || file.name}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel
                  sx={{ fontSize: "13px", fontWeight: 600, color: "#333" }}
                >
                  Comment
                </FormLabel>
                <TextField
                  multiline
                  rows={1}
                  type="text"
                  size="small"
                  fullWidth
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid
=======
          <Grid
            container
            xs={12}
            lg={12}
            md={12}
            sm={12}
            xl={12}
            sx={{ width: "100%" }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#1A6C71",
                padding: "5px",
                borderRadius: "8px 8px 0px 0px ",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Inter",
                  color: "#fff",
                  fontSize: "14px",
                  paddingLeft: "10px",
                  fontWeight: "600",
                }}
              >
                Update Task
              </Typography>
              <GridCloseIcon
                fontSize="small"
                onClick={handleClose}
                sx={{ color: "white", cursor: "pointer" }}
              />
            </Box>
            <Grid
              container
>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
              item
              xs={12}
              lg={12}
              md={12}
              sm={12}
              xl={12}
<<<<<<< HEAD
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button
                onClick={handleClose}
                sx={{
                  color: "#15232B",
                  background: "#D7D7D7",
                  "&:hover": { background: "#D7D7D7" },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                sx={{
                  color: "#fff",
                  background: "#1A6C71",
                  "&:hover": { background: "#1A6C71" },
                }}
              >
                Update
              </Button>
=======
              spacing={0.5}
              sx={{
                padding: "10px",
                height: {
                  xl: "50vh",
                  lg: "30vh",
                  md: "25vh",
                  sm: "250vh",
                  xs: "25vh",
                },
                overflow: "auto",
              }}
            >
              <Grid item xs={12} lg={12} md={12} sm={12} xl={12}>
                <FormControl fullWidth>
                  <FormLabel
                    sx={{
                      fontSize: {
                        xl: "13px",
                        lg: "11px",
                        md: "8px",
                      },
                      fontWeight: 600,
                      color: "#333",
                    }}
                  >
                    Title
                  </FormLabel>
                  <TextField
                    sx={{
                      background: "#F2F2F2",
                    }}
                    type="title"
                    size="small"
                    name="title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTtitle(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={4} md={4} sm={4} xl={4}>
                <FormControl fullWidth size="small">
                  <FormLabel
                    sx={{
                      fontSize: {
                        xl: "13px",
                        lg: "11px",
                        md: "8px",
                      },
                      fontWeight: 600,
                      color: "#333",
                    }}
                  >
                    Status
                  </FormLabel>
                  <Select
                    value={status}
                    name="Status"
                    // onChange={handlestatus}

                    onChange={(e) => setStatus(e.target.value)}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    size="small"
                    // onChange={handleChange}
                    sx={{
                      height: {
                        xl: "30px",
                        lg: "30px",
                        md: "30px",
                        sm: "30px",
                        xs: "30px",
                      },
                      background: "#F2F2F2",
                      fontSize: {
                        xl: "16px",
                        lg: "13px",
                        md: "13px",
                        xs: "11px",
                        sm: "11px",
                      },
                      padding: "2px",
                    }}
                  >
                    <MenuItem value="pending" sx={{ fontSize: "10px" }}>
                      Pending
                    </MenuItem>
                    <MenuItem value="completed" sx={{ fontSize: "10px" }}>
                      Completed
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} lg={8} md={8} sm={8} xl={8}>
                <FormControl fullWidth>
                  <FormLabel
                    sx={{
                      fontSize: {
                        xl: "13px",
                        lg: "11px",
                        md: "8px",
                      },
                      fontWeight: 600,
                      color: "#333",
                    }}
                  >
                    Description
                  </FormLabel>
                  <TextField
                    type="text"
                    size="small"
                    name="description"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  // onChange={handleFieldsChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
                <FormControl fullWidth size="small">
                  <FormLabel
                    sx={{
                      fontSize: { xl: "13px", lg: "11px", md: "8px" },
                      fontWeight: 600,
                      color: "#333",
                    }}
                  >
                    Category
                  </FormLabel>
                  <Select
                    value={category}
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    size="small"
                    sx={{
                      height: "30px",
                      background: "#F2F2F2",
                      fontSize: {
                        xl: "16px",
                        lg: "13px",
                        md: "13px",
                        xs: "11px",
                        sm: "11px",
                      },
                      padding: "2px",
                    }}
                  >
                    <MenuItem value="high" sx={{ fontSize: "10px" }}>
                      High
                    </MenuItem>
                    <MenuItem value="medium" sx={{ fontSize: "10px" }}>
                      Medium
                    </MenuItem>
                    <MenuItem value="low" sx={{ fontSize: "10px" }}>
                      Low
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
                <FormControl fullWidth size="small">
                  <FormLabel
                    sx={{
                      fontSize: { xl: "13px", lg: "11px", md: "8px" },
                      fontWeight: 600,
                      color: "#333",
                    }}
                  >
                    Due Date
                  </FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={dueDate}
                      onChange={(newValue) => setDueDate(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          sx={{
                            background: "#F2F2F2",
                            fontSize: { xl: "16px", lg: "13px", md: "13px" },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel sx={{ fontSize: "13px", fontWeight: 600, color: "#333" }}>
                    Upload File (Image or PDF)
                  </FormLabel>

                  <Button
                    variant="outlined"
                    component="label"
                    size="small"
                    sx={{ textTransform: "none", mt: 1 }}
                  >
                    Choose File
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setFile(e.target.files[0])}
                      accept="image/*,.pdf"
                    />
                  </Button>

                  {file && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {file.originalName || file.name}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel
                    sx={{ fontSize: "13px", fontWeight: 600, color: "#333" }}
                  >
                    Comment
                  </FormLabel>
                  <TextField
                    multiline
                    rows={1}
                    type="text"
                    size="small"
                    fullWidth
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                md={12}
                sm={12}
                xl={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <Button
                  onClick={handleClose}
                  sx={{
                    color: "#15232B",
                    background: "#D7D7D7",
                    "&:hover": { background: "#D7D7D7" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  sx={{
                    color: "#fff",
                    background: "#1A6C71",
                    "&:hover": { background: "#1A6C71" },
                  }}
                >
                  Update
                </Button>
              </Grid>
>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateModel;
