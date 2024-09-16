import { describe, expect, it } from "vitest";
import { renderWithQueryClient } from "../utils/queryProviderHelper";
import GameScreenshots from './../../src/components/GameScreenshots';
import React from "react";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { simulateDelay, simulateError } from "../utils/serverUtils";
import '@testing-library/jest-dom/vitest'

describe("GameScreenshots", ()=>{

    const renderComponent = () => {
        renderWithQueryClient(<GameScreenshots gameId={1}/>);

        const getSpinner = () => screen.queryByRole('spinner');

        return {
            getSpinner
        }
    }

    it('should show loading spinner when fetching screenshots', () => {
        simulateDelay('/games/1/screenshots');
        
        const {getSpinner} = renderComponent();

        expect(getSpinner()).toBeInTheDocument();
    })

    it('should render screenshots', async() =>{
        renderComponent();

        const imageElements = await screen.findAllByRole('img');

        expect(imageElements.length).toBeGreaterThan(0);
    })

    it('should return no element when there is an error', async () =>{
        simulateError('/games/1/screenshots');

        const {getSpinner} = renderComponent();

        await waitForElementToBeRemoved(getSpinner);

        const imageElements = screen.queryAllByRole('img');

        expect(imageElements.length).toBe(0);
    })
});