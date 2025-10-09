import { useQuery } from "@tanstack/react-query";
import api from "../helper/api";

const getUserDataAndSettings = async () => {
  const [userData, userSettings] = await Promise.all([
    api.get('/user/detail'),
    api.get('/user/settings')
  ]);

  return { userData: userData.data, userSettings: userSettings.data };
};

export const useGetUserData = () => {
  const query = useQuery({
    queryKey: ['userDataAndSettings'],
    queryFn: getUserDataAndSettings,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};