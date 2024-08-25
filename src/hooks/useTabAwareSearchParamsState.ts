import { useSearchParams } from "react-router-dom";

export function useTabAwareSearchParamsState(
  searchParamName: string,
  defaultValue: string | number,
  currentTab: string
): readonly [searchParamsState: string | number, setSearchParamsState: (newState: string | number) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabAwareParamName = `${currentTab}-${searchParamName}`;
  const acquiredSearchParam = searchParams.get(tabAwareParamName);

  const searchParamsState = searchParamName === "page" ?
    (acquiredSearchParam !== null ? parseInt(acquiredSearchParam, 10) : defaultValue) :
    (acquiredSearchParam !== null ? acquiredSearchParam : defaultValue);

  const setSearchParamsState = (newState: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const newValue = newState.toString();
    newSearchParams.set(tabAwareParamName, newValue);
    setSearchParams(newSearchParams);
  };

  return [searchParamsState, setSearchParamsState];
}