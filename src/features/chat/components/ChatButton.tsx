import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ChatButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/chat');
  };

  return (
    <Button onClick={handleClick} style={{margin:10}}>
      Chat
    </Button>
  );
};

export default ChatButton;