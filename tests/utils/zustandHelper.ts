import { vi } from "vitest"

export const mockZustandSelector = (hook:any, state:object) =>{
    (hook as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>{
        return selector(state);
    })
}