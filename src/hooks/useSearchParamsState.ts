import { useSearchParams } from "react-router-dom";

export function useSearchParamsState(
  searchParamName: string,
  defaultValue: string | number,
): readonly [searchParamsState: string | number, setSearchParamsState: (newState: string | number) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const acquiredSearchParam = searchParams.get(searchParamName);

  // Conditionally set the type of searchParamsState based on searchParamName
  const searchParamsState = searchParamName === "page" ?
    (acquiredSearchParam !== null ? parseInt(acquiredSearchParam, 10) : defaultValue) :
    (acquiredSearchParam !== null ? acquiredSearchParam : defaultValue);

  const setSearchParamsState = (newState: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Convert to string if necessary
    const newValue = searchParamName === "page" ? newState.toString() : newState.toString();

    // Add or update the specified search parameter
    newSearchParams.set(searchParamName, newValue);

    setSearchParams(newSearchParams);
  };

  return [searchParamsState, setSearchParamsState];
}
