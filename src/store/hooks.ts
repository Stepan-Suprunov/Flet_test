import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootStateType, AppDispatchType } from './index';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;