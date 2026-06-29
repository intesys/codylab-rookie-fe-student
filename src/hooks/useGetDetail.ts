import { AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";

export function useGetDetail<T extends object>(
  getDetailApi: (id: number) => Promise<AxiosResponse<T>>,
  newRecord: T,
  id: number
) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<T>(newRecord);
  const apiRef = useRef(getDetailApi);
  const newRecordRef = useRef(newRecord);

  const getDetail = useCallback(() => {
    setLoading(true);
    apiRef
      .current(id)
      .then((response) => {
        setRecord({ ...newRecordRef.current, ...response.data });
      })
      .catch((error) => {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(getDetail, [getDetail]);

  return [record, loading, getDetail] as [T, boolean, () => void];
}

export default useGetDetail;
