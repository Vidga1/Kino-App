import React from 'react';
import { Box, Button, TextField } from '@mui/material';

interface KeywordSearchFormProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const KeywordSearchForm: React.FC<KeywordSearchFormProps> = ({
  searchTerm,
  onSearchTermChange,
  onSubmit,
}) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 2,
        mt: 2,
        color: '#ffffff',
      }}
    >
      <TextField
        variant="outlined"
        label="Введите название"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onSearchTermChange(e.target.value)
        }
        size="small"
        sx={{
          minWidth: 200,
          input: { color: '#ffffff' },
          '& .MuiInputLabel-root': { color: '#ffffff' },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff88',
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ minWidth: 80 }}
      >
        Поиск
      </Button>
    </Box>
  );
};

export default KeywordSearchForm;
