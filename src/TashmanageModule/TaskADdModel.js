import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Box,
  FormLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Snackbar,
  Alert,
  Typography,
  FormHelperText,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { GridCloseIcon } from "@mui/x-data-grid";


const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": { borderColor: "#0E6368" },
            "&.Mui-focused fieldset": { border: "1.5px solid #0E6368" },
            "& .MuiOutlinedInput-input": {
              height: "18px",
              padding: "6px 14px",
              fontSize: "11px",
            },
            background: "#F2F2F2",
          },
        },
      },
    },
  },
});

const TaskADdModel = ({ AddTaskClose, Fetchtask }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [comment, setComment] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [category, setCategory] = React.useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    status: "",
    category: "",
    dueDate: "",
  });
  const validateFields = () => {
    const newErrors = {
      title: title.trim() ? "" : "Title is required",
      description: description.trim() ? "" : "Description is required",
      status: status ? "" : "Status is required",
      category: category ? "" : "Category is required",
      dueDate: dueDate ? "" : "Due date is required",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((val) => val === "");
  };
  const navigate = useNavigate();
  const handlerefresh = () => {
    setTitle("")
    setDescription("")
    setStatus("")
    setComment("")
    setDueDate(null)
    setCategory("")
    setFile(null)
  }

  const handleClose = () => {
    handlerefresh();
    setOpen(false);
    if (AddTaskClose) {
      AddTaskClose();
    }
  };
  useEffect(() => {
    if (open) {
      handlerefresh();

    }
  }, [open]);
  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };
  const addTask = async () => {

    if (!validateFields()) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status.toLowerCase());
    formData.append("category", category.toLowerCase());
    formData.append("dueDate", dueDate ? new Date(dueDate).toISOString() : "");
    if (comment) {
      formData.append("comments", JSON.stringify([{ text: comment }]));
    }
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("https://backend-8226.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log("check data from data", responseData)

      if (response.ok) {

        setSnackbar({
          open: true,
          message: "Task added successfully!",
          severity: "success",
        });
        handlerefresh()
        if (typeof Fetchtask === "function") Fetchtask();

        setTimeout(() => {
          if (AddTaskClose) AddTaskClose();
        }, 1000);
      } else {
        setSnackbar({
          open: true,
          message: `Failed to add task! ${responseData.message || ""}`,
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setSnackbar({
        open: true,
        message: `Error adding task! ${error.message}`,
        severity: "error",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "30%",
          margin: "auto",
          marginTop: "12%",
          backgroundColor: "#fff",
          boxShadow: 24,
          borderRadius: "10px",
          outline: "none",
        }}
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
            Add Task
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
                type="text"
                size="small"
                fullWidth
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) {
                    setErrors((prev) => ({ ...prev, title: "" }));
                  }
                }}

                error={Boolean(errors.title)}
                helperText={errors.title}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={4}>
            <FormControl fullWidth size="small">
              <FormLabel
                sx={{
                  fontSize: {
                    xl: "13px",
                    lg: "12.5px",
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
                onChange={(e) => {
                  setStatus(e.target.value);
                  if (errors.status) {
                    setErrors((prev) => ({ ...prev, status: "" }));
                  }
                }}
                error={Boolean(errors.status)}

                size="small"
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
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
              {errors.status && <FormHelperText error>{errors.status}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={8}>
            <FormControl fullWidth>
              <FormLabel
                sx={{ fontSize: "13px", fontWeight: 600, color: "#333" }}
              >
                Description
              </FormLabel>
              <TextField
                type="text"
                size="small"
                fullWidth
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) {
                    setErrors((prev) => ({ ...prev, description: "" }));
                  }
                }}

                error={Boolean(errors.description)}
                helperText={errors.description}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={6} md={6} sm={6} xl={6}>
            <FormControl fullWidth size="small">
              <FormLabel
                sx={{
                  fontSize: {
                    xl: "13px",
                    lg: "12.5px",
                    md: "8px",
                  },
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                Category
              </FormLabel>
              <Select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (errors.category) {
                    setErrors((prev) => ({ ...prev, category: "" }));
                  }
                }}
                size="small"
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
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
              {errors.category && (
                <FormHelperText error>{errors.category}</FormHelperText>
              )}
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
                  onChange={(newValue) => {
                    setDueDate(newValue);
                    if (errors.dueDate) {
                      setErrors((prev) => ({ ...prev, dueDate: "" }));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      error={Boolean(errors.dueDate)}
                      helperText={errors.dueDate}
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
                  accept="image/*,.pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Button>
              {file && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected: {file.name}
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
            sx={{
              padding: "7px 10px",
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
              onClick={addTask}
              sx={{
                color: "#fff",
                background: "#1A6C71",
                "&:hover": { background: "#1A6C71" },
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default TaskADdModel;
