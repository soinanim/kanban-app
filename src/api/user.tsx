export async function getUser() {
  const user = localStorage.getItem('username');

  if (user) return user;
}

export async function updateUser(username: string) {
  return localStorage.setItem('username', username);
}

export async function deleteUser() {
  return localStorage.removeItem('username');
}
