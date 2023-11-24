export default function ProfileOwn({ user }) {
  return (
    <div>
      twój profil <br />
      {user.firstname.toLowerCase()} {user.lastname.toLowerCase()} <br />
      {user.email}
    </div>
  );
}
