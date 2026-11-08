import { useQuery } from "@tanstack/react-query";
import { getManagers } from "../api/managers";
export function useManagers() {
  return useQuery({
    queryKey: ["studio-managers"],
    queryFn: ({ signal }) => getManagers(signal),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
