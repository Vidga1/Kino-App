import React from 'react';

interface ResetFiltersArgs {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const resetFilters = ({ setSearchTerm }: ResetFiltersArgs) => {
  const inputsToReset = [
    'countrySelect',
    'genreSelect',
    'orderSelect',
    'typeSelect',
    'ratingFrom',
    'ratingTo',
    'yearFrom',
    'yearTo',
  ];

  inputsToReset.forEach((inputId) => {
    const inputElement = document.getElementById(inputId) as
      | HTMLInputElement
      | HTMLSelectElement
      | null;
    if (inputElement) {
      inputElement.value = '';
    }
  });

  setSearchTerm('');
};
