import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

const useInput = (initValue = '') => {
  const [value, setValue] = useState(initValue);
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setValue(e.target.value);
  }, []);
  const copied = useMemo(() => value, []);
  useEffect(() => {
    console.log('value: ', value, 'copied: ', copied);
  });
  return { value, onChange };
};

export default useInput;
