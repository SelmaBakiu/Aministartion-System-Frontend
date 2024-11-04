import React from "react";
import { Box, TextField, InputAdornment, Paper, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBarProps } from "../../department/types/employee";
import { colors } from "../../../styles/colors";

export const SearchBar: React.FC<SearchBarProps> = ({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onClearSearch,
  onCreateClick,
}) => {
  return (
    <Paper sx={{ p: 2, mb: 2, bgcolor: colors.background }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            size="small"
            label="First Name"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: colors.primary,
                },
              },
            }}
          />
          <TextField
            size="small"
            label="Last Name"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: colors.primary }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: colors.primary,
                },
              },
            }}
          />
          {(firstName || lastName) && (
            <Button
              variant="outlined"
              onClick={onClearSearch}
              sx={{
                color: colors.secondary,
                borderColor: colors.secondary,
                "&:hover": {
                  borderColor: colors.secondary,
                  backgroundColor: `${colors.secondary}10`,
                },
              }}
            >
              Clear
            </Button>
          )}
        </Box>
        <Button
          variant="contained"
          onClick={onCreateClick}
          sx={{
            bgcolor: colors.primary,
            "&:hover": {
              bgcolor: colors.primary + "dd",
            },
          }}
        >
          Create Employee
        </Button>
      </Box>
    </Paper>
  );
};
