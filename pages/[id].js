import PostFeed from "@/components/Postfeed";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import Tweet from "@/components/Tweet";
import { db } from "@/firebase";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import Moment from "react-moment";
import { useSelector } from "react-redux";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const formattedData = {
    username: data.username,
    name: data.name,
    photoUrl: data.photoUrl,
    text: data.tweet,
    comments: data.comments || null,
    timestamp: JSON.stringify(data.timestamp.toDate()),
    image: data.image || null
  };

  return {
    props: {
      tweetData: formattedData,
    },
  };
}

export default function CommentsPage({ tweetData }) {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div
        className="bg-black min-h-screen text-[#E7E9EA] 
    max-w-[1400px] mx-auto flex

    
    "
      >
        <Sidebar />
        <div
          className="sm:ml-16 xl:ml-[350px] max-w-2xl flex-grow
        border-gray-700 border-x
        "
        >
          <div
            className="sticky top-0 z-50 flex px-3 py-2 space-x-2 text-lg font-bold border-b border-gray-700 sm:text-xl"
          >
            <Link href={"/"}>
              <ArrowLeftIcon className="cursor-pointer w-7" />
            </Link>

            <h1>Tweet</h1>
          </div>

          <div className="border-b border-gray-700">
            <div className="flex p-3 space-x-3 border-gray-700">
              <img
                className="object-cover rounded-full w-11 h-11"
                src={tweetData.photoUrl}
              />
              <div>
                <div className="flex items-center mb-1 space-x-2 text-gray-500">
                  <h1 className="font-bold text-white">{tweetData.name}</h1>
                  <span>@{tweetData.username}</span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <Moment fromNow>{JSON.parse(tweetData.timestamp)}</Moment>
                </div>

                <span className="text-2xl">{tweetData.text}</span>

                {tweetData.image && (
                  <img
                    className="object-cover mt-3 border border-gray-700 rounded-md max-h-80"
                    src={tweetData.image}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 border-b border-gray-700">
            <div className="flex items-center justify-center p-1 space-x-2">
              <img
                className="object-cover w-12 h-12 rounded-full"
                src={user.photoUrl}
              />
              <h1 className="text-2xl text-gray-500">Tweet your reply</h1>
            </div>

            <button
              disabled={true}
              className="bg-[#1d9bf0] rounded-full px-4 py-1.5
          disabled:opacity-50
          "
            >
              Tweet
            </button>
          </div>

          {tweetData.comments?.map((comment) => (
            <div className="border-b border-gray-700">
              <div className="flex p-3 space-x-3 border-gray-700">
                <img
                  className="object-cover rounded-full w-11 h-11"
                  src={comment.photoUrl}
                />
                <div>
                  <div className="flex items-center mb-1 space-x-2 text-gray-500">
                    <h1 className="font-bold text-white">{comment.name}</h1>
                    <span>@{comment.username}</span>
                  </div>

                  <span>{comment.comment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Trending />
      </div>
    </div>
  );
}