import { useState } from 'react';
import Container from '../components/Container';
import toast from 'react-hot-toast';

interface AdminAuthenticationProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminAuthentication: React.FC<AdminAuthenticationProps> = ({ setIsAuthenticated }) => {
  const [password, setPassword] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
        toast.error('Incorrect password');
    }
  };

  return (
    <Container>
      <h1 className="text-2xl font-semibold text-center pt-16">Enter Password</h1>
      <form onSubmit={handlePasswordSubmit} className="flex justify-center mt-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </form>
    </Container>
  );
};

export default AdminAuthentication;
