import type { Mock } from "vitest";

interface StorageMock {
    getItem: Mock<Storage["getItem"]>;
    setItem: Mock<Storage["setItem"]>;
    clear: Mock<Storage["clear"]>;
}

export const createStorageMock = () => {
    let mockStorage: Record<string, string> = {};
    const localStorageMock: StorageMock = {
        getItem: vi.fn((key: string) => mockStorage[key] ?? null),
        setItem: vi.fn((key: string, value: string) => {
            mockStorage[key] = value;
        }),
        clear: vi.fn(() => {
            mockStorage = {};
        }),
    };
    return localStorageMock;
};