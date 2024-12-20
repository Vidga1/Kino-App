import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
      }}
    >
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#fff',
            borderColor: '#ffffff44',
          },
          '& .Mui-selected': {
            backgroundColor: '#2f855a !important',
            borderColor: '#2f855a',
            color: '#ffffff',
          },
          '& .MuiPaginationItem-ellipsis': {
            borderColor: 'transparent',
          },
        }}
      />
    </Box>
  );
};

export default Pagination;
