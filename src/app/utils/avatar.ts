const DEFAULT_AVATAR_URL: string = "http://localhost/avatars/default.png";
const ANONYMOUS_AVATAR_URL: string = "http://localhost/avatars/default.png";
const USER_AVATAR_URL: (id: number) => string = (id: number): string =>
  `http://localhost/avatars/${id}.png`;
export { DEFAULT_AVATAR_URL, ANONYMOUS_AVATAR_URL, USER_AVATAR_URL };

export default async function getAvatar(
  id: number,
  anonymous: boolean
): Promise<string> {
  if (anonymous) {
    return "http://localhost/avatars/anonymous.png";
  }

  return fetch(`http://localhost/avatars/${id}.png`).then((res) => {
    if (res.status === 404) return "http://localhost/avatars/default.png";
    return `http://localhost/avatars/${id}.png`;
  });
}
