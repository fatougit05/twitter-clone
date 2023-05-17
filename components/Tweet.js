import { db } from "@/firebase";
import { openCommentModal, openLoginModal, openSignupModal, setCommentTweet } from "@/redux/modalSlice";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  TrashIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/solid";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

export default function Tweet({ data, id }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user);

  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  async function deleteTweet(e){
    e.stopPropagation()
    await deleteDoc(doc(db, "posts", id))


  }

  async function likeComment(e) {
    e.stopPropagation();

    if (!user.username){
      dispatch(openLoginModal())
      return
    }

    if (likes.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayUnion(user.uid),
      });
    }
  }

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(doc(db, "posts", id), (doc) => {
      setLikes(doc.data()?.likes);
      setComments(doc.data()?.comments)
    });

    return unsubscribe;
  }, []);

  return (
    <div
      onClick={() => router.push("/" + id)}
      className="border-b border-gray-700 cursor-pointer"
    >
      <TweetHeader
        username={data?.username}
        name={data?.name}
        timestamp={data?.timestamp?.toDate()}
        text={data?.tweet}
        photoUrl={data?.photoUrl}
        image={data?.image}
      />
      <div className="flex p-3 ml-16 text-gray-500 space-x-14">
        <div
        className="flex items-center justify-center space-x-2"
          onClick={(e) => {
            e.stopPropagation();
            if (!user.username){
              dispatch(openLoginModal())
              return
            }
            dispatch(
              setCommentTweet({
                id: id,
                tweet: data?.tweet,
                photoUrl: data?.photoUrl,
                name: data?.name,
                username: data?.username,
              })
            );
            dispatch(openCommentModal());
          }}
        >
          <ChatIcon className="w-5 cursor-pointer hover:text-green-400" />
          {comments?.length > 0 && <span>{comments.length}</span>}
        </div>

        <div
          className="flex items-center justify-center space-x-2"
          onClick={likeComment}
        >
          {likes.includes(user.uid) ? (
            <FilledHeartIcon className="w-5 text-pink-500" />
          ) : (
            <HeartIcon className="w-5 cursor-pointer hover:text-pink-500" />
          )}
          {likes.length > 0 && <span>{likes.length}</span>}
        </div>
        {user.uid === data?.uid && (<div 
        className="cursor-pointer hover:text-red-600"
        onClick={deleteTweet}
        >

          <TrashIcon className="w-5" />
        </div>)}
        <ChartBarIcon className="w-5 cursor-not-allowed" />
        <UploadIcon className="w-5 cursor-not-allowed" />
      </div>
    </div>
  );
}

export function TweetHeader({ username, name, timestamp, text, photoUrl, image }) {
  return (
    <div className="flex p-3 space-x-3 border-gray-700">
      <img className="object-cover rounded-full w-11 h-11" src={photoUrl} />
      <div>
        <div className="flex items-center mb-1 space-x-2 text-gray-500">
          <h1 className="font-bold text-white">{name}</h1>
          <span>@{username}</span>
          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          <Moment fromNow>{timestamp}</Moment>
        </div>

        <span>{text}</span>

        {image && <img
        className="object-cover mt-3 border border-gray-700 rounded-md max-h-80"
        src={image} />}
      </div>
    </div>
  );
}