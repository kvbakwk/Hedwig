const DEFAULT_AVATAR_URL: string = "/avatars/default.png";
const ANONYMOUS_AVATAR_URL: string = "/avatars/default.png";
const USER_AVATAR_URL: (id: number) => string = (id: number): string =>
  `/${id}.png`;
export { DEFAULT_AVATAR_URL, ANONYMOUS_AVATAR_URL, USER_AVATAR_URL };

export default async function getAvatar(
  id: number,
  anonymous: boolean
): Promise<string> {
  if (anonymous) {
    return "/avatars/anonymous.png";
  }

  return fetch(`https://3000-idx-hedwig-1723209036021.cluster-qtqwjj3wgzff6uxtk26wj7fzq6.cloudworkstations.dev/avatars/${id}.png`).then((res) => {
    if (res.status === 404) return "/avatars/default.png";
    return `/avatars/${id}.png`;
  });
}
