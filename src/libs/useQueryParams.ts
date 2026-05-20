"use client";

import { useSearchParams } from "next/navigation";

function useQueryParams() {
    const query = useSearchParams();
    const queryParams: { [key: string]: string } = {};
    for (const [key, value] of query.entries()) {
        queryParams[key] = value;
    }

    return queryParams;
}

export default useQueryParams