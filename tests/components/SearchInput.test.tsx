import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchInput from './../../src/components/SearchInput';
import React from 'react';
import '@testing-library/jest-dom/vitest'

describe('SearchInput', () => {
    it('should render a search input', () => {
        render(<SearchInput/>);

        const searchInput = screen.getByTestId('search-input');

        expect(searchInput).toBeInTheDocument();
    })
})