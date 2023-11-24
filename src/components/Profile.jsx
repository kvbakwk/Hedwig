export default function Profile({ user }) {
  return (
    <div>
      profil <br />
      {user.firstname.toLowerCase()} {user.lastname.toLowerCase()} <br />
      {user.email}
    </div>
  );
}
