// Two functions, these are both imported in ./users/columns.tsx

export const updateUser = async (id: any, data: any) => {
  await fetch(`/api/update-user`, {
    method: "put",
    body: JSON.stringify({ id, data }),
  });
};

export const deleteUser = async (id: any) => {
  await fetch(`/api/delete-user`, {
    method: "put",
    body: JSON.stringify({ user_id: id }),
  });
};