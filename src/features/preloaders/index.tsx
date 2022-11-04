import styled from "@emotion/styled";

import CircularProgress from '@mui/material/CircularProgress';

import { useAppSelector } from '../../store/hooks';

const PreloaderBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 9000;
`;

export function Preloader() {
  const preloaders = useAppSelector(state => state.preloaders);

  if (!preloaders.length) return null;

  return (
    <PreloaderBackdrop>
      <CircularProgress />
    </PreloaderBackdrop>
  )
}
