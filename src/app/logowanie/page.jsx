export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-screen h-screen">
      <input type="text" id="email" placeholder="e-mail" />
      <input type="password" id="password" placeholder="hasło" />
      <label htmlFor="remember">
        <input type="checkbox" id="remember" /> zapamiętaj to urządzenie
      </label>
      <button>zaloguj się</button>
    </div>
  );
}
