import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";

export function useGetList<T extends object, F extends object>(
  getListApi: (
    page: number,
    size: number,
    sort: string,
    filter: F,
    options?: AxiosRequestConfig<any> | undefined
  ) => Promise<AxiosResponse<T[]>>,
  filter: F
) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<T[]>([]);
  const filterRef = useRef(filter);
  const apiRef = useRef(getListApi);

  const getList = useCallback(() => {
    setLoading(true);
    apiRef
      .current(0, 100, "id,asc", filterRef.current)
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filterChanged = JSON.stringify(filterRef.current) !== JSON.stringify(filter);
    filterRef.current = filter;
    apiRef.current = getListApi;
    if (filterChanged || records.length === 0) {
      getList();
    }
  }, [filter]);

  return [records, loading, getList] as [T[], boolean, () => void];
}

export default useGetList;
