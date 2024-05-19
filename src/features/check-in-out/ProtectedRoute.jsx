import { useEffect } from "react";
import { useUser } from "../authentication/useUser"
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Spinner from './../../ui/Spinner';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isRegistered } = useUser();

  console.log(isRegistered);

  useEffect(() => {
    if (!isRegistered && !isLoading) navigate("/login");
  }, [isRegistered, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>);

  if (isRegistered) return children;
}

export default ProtectedRoute
