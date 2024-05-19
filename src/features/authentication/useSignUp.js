import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      navigate("/login");
      toast.success("Account successfully created! Please verify your email address")
    },
  });

  return { signup, isLoading };
}