import { useContext } from 'react';
import { DeviceContext } from 'components/detect-device';

export default function useDetectDevice() {
  return useContext(DeviceContext);
}
