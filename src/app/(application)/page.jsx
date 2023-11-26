import getUser from "@app/api/users/get";
import getPosts from "@app/api/posts/get";

import FormNewPost from "@components/forms/FormNewPost";
import Posts from "@components/posts/Posts";

export const metadata = {
  title: "schcool | główna",
};

export default async function HomePage() {
  const user = await getUser();
  const posts = await getPosts(user.id, true, false, true);

  return (
    <div className="relative w-[full] h-auto px-[15px]">
      <div className="fixed flex items-center text-[22px] w-[720px] h-[70px] pl-[50px] border-[1px] border-t-0 border-gray-300 border-solid transition-shadow rounded-b-2xl backdrop-blur-xl glass-shadow">
        główna
      </div>
      <div className="flex flex-col gap-[20px] w-full py-[90px] px-[5px]">
        <FormNewPost user={user} />
        <Posts user={user} posts={posts} />
      </div>
    </div>
  );
}
