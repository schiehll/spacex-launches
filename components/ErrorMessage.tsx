import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Oops!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;
