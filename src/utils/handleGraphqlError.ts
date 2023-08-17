import { GraphQLErrors } from '@apollo/client/errors';
import { showToast } from './toast';

interface IHandleGraphqlErrorProps {
  graphQLErrors?: GraphQLErrors;
}

const handleGraphqlError = (errors: IHandleGraphqlErrorProps) => {
  errors?.graphQLErrors?.map(({ message }: { message: string }) => showToast(message, 'error'));
};
export default handleGraphqlError;
