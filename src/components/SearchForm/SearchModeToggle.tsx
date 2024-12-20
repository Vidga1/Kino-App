import React from 'react';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

interface SearchModeToggleProps {
  searchMode: 'filters' | 'keyword';
  onModeChange: (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'filters' | 'keyword' | null,
  ) => void;
}

const SearchModeToggle: React.FC<SearchModeToggleProps> = ({
  searchMode,
  onModeChange,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 3,
      }}
    >
      <ToggleButtonGroup
        value={searchMode}
        exclusive
        onChange={onModeChange}
        color="primary"
        sx={{
          '& .MuiToggleButton-root': {
            borderColor: '#ffffff33',
            color: '#ffffffcc',
          },
          '& .MuiToggleButton-root.Mui-selected': {
            backgroundColor: '#ffffff22',
            borderColor: '#ffffff88',
            color: '#ffffff',
          },
          '& .MuiToggleButton-root:hover': {
            backgroundColor: '#ffffff11',
          },
        }}
      >
        <ToggleButton value="filters">Поиск по фильтрам</ToggleButton>
        <ToggleButton value="keyword">Поиск по названию</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default SearchModeToggle;
