import { Identity } from "../entities/Identity";

function useLookup<T extends Identity>(args?: T[], id?: number) {
  return {
    name: args?.find((x) => x.id === id)?.name,
  };
}
export default useLookup;
