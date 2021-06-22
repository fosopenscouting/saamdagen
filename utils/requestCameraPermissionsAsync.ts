import { Camera } from 'expo-camera';

const getCameraPermissionsAsync = async (): Promise<boolean> => {
  const { status, canAskAgain } = await Camera.requestPermissionsAsync();

  console.log(canAskAgain);
  return status === 'granted';
};

export default getCameraPermissionsAsync;
