import { redirect } from 'react-router-dom';
import { getUser } from '../../api/user';

export const loadUser = async () => {
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  return { user };
};
