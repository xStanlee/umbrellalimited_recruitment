import { describe, it, expect, beforeAll } from 'vitest';
import { storeHeaders } from '../stores/storeHeaders';

describe('storeHeaders', () => {
    beforeAll(async() => {
        storeHeaders.setHeaders('row', 'column');
        storeHeaders.setErrorId(1);
    }); 

    it('should have row property', () => {
        expect(storeHeaders.row).toBe('row');
    });

    it('should have column property', () => {
        expect(storeHeaders.column).toBe('column');
    });

    it('should have errorId property', () => {
        expect(storeHeaders.errorId).toBe(1);
    });

    it('should reset row property', () => {
        storeHeaders.resetHeaders();
        expect(storeHeaders.row).toBe('');
    });

    it('should reset column property', () => {
        storeHeaders.resetHeaders();
        expect(storeHeaders.column).toBe('');
    });

    it('should reset errorId property', () => {
        storeHeaders.resetErrorId();
        expect(storeHeaders.errorId).toBe(null);
    });
});