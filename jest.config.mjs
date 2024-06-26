// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    // [...]
    transform: {
        // '^.+\\.[tj]sx?$' to process ts,js,tsx,jsx with `ts-jest`
        // '^.+\\.m?[tj]sx?$' to process ts,js,tsx,jsx,mts,mjs,mtsx,mjsx with `ts-jest`
        '^.+\\.tsx?$': ['ts-jest'],
    },
}
