import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useLookup from './../../src/hooks/useLookup';
import { platforms } from './../mocks/data';
import { Platform } from '../../src/common.types';

describe('useLookup', () =>{
    it('should return a name when id is specified', () =>{
        const {result} = renderHook(() => useLookup<Platform>(platforms, 1));

        const expectedname = platforms[1].name;
        
        expect(result.current.name).toBeDefined();
        expect(result.current.name).toBe(expectedname);
    })

    it('should return undefined when id is not specified', () =>{
        const {result} = renderHook(() => useLookup<Platform>(platforms));

        expect(result.current.name).toBeUndefined();
    })
})
