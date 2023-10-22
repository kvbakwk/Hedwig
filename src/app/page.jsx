import { loginCheck } from "./utils/login";

export default async function HomePage() {

  await loginCheck(false);

  return (
    <div>

    </div>
  )
}
