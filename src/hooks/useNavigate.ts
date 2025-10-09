import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const redirectTo = (path: string) => {
    navigate(path);
  }

  return { redirectTo };
}

export default useNavigation;