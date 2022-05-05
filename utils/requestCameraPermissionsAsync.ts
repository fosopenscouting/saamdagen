import { Camera } from 'expo-camera';

const getCameraPermissionsAsync = async (): Promise<boolean> => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  return status === 'granted';
};

export default getCameraPermissionsAsync;
