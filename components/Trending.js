import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon } from "@heroicons/react/solid";

export default function Trending() {
  return (
    <div className="flex-col hidden mt-4 lg:flex ml-7">
      <div
        className="flex space-x-3 bg-white bg-opacity-10
            w-[300px] h-[44px] p-3 rounded-3xl
            "
      >
        <SearchIcon className="w-6 text-gray-600" />
        <input
          className="bg-transparent focus:outline-none placeholder:text-gray-600 "
          placeholder="Search Twitter"
        />
      </div>
      <div className="w-[300px] h-[500px] bg-white bg-opacity-10 rounded-3xl mt-3">
        <h1 className="p-3 text-xl font-bold">What's happening</h1>
        <div className="relative p-3">
          <DotsHorizontalIcon className="absolute w-5 text-gray-600 right-4" />
          <p className="text-xs text-gray-500">Trending in US</p>
          <h1 className="text-[15px] font-bold">Aot season 4 part3</h1>
          <p className="text-xs text-gray-500">340K Tweets</p>
        </div>
        <div className="relative p-3">
          <DotsHorizontalIcon className="absolute w-5 text-gray-600 right-4" />
          <p className="text-xs text-gray-500">Trending in US</p>
          <h1 className="text-[15px] font-bold">Chainsawman anime</h1>
          <p className="text-xs text-gray-500">76K Tweets</p>
        </div>
        <div className="relative p-3">
          <DotsHorizontalIcon className="absolute w-5 text-gray-600 right-4" />
          <p className="text-xs text-gray-500">Trending in US</p>
          <h1 className="text-[15px] font-bold">China</h1>
          <p className="text-xs text-gray-500">340K Tweets</p>
        </div>
        <div className="relative p-3">
          <DotsHorizontalIcon className="absolute w-5 text-gray-600 right-4" />
          <p className="text-xs text-gray-500">Trending in US</p>
          <h1 className="text-[15px] font-bold">Eren is back</h1>
          <p className="text-xs text-gray-500">120K Tweets</p>
        </div>
        <div className="relative p-3">
          <DotsHorizontalIcon className="absolute w-5 text-gray-600 right-4" />
          <p className="text-xs text-gray-500">Trending in US</p>
          <h1 className="text-[15px] font-bold">Jujutsu kaisen manga</h1>
          <p className="text-xs text-gray-500">40K Tweets</p>
        </div>
      </div>
      <div className="w-[300px] h-[300px] bg-white bg-opacity-10 rounded-3xl mt-3">
        <h1 className="p-3 text-xl font-bold">Who to follow</h1>

        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              className="object-cover rounded-full w-11 h-11"
              src="/assets/fuji.jpeg"
            />
            <div>
              <div className="flex space-x-1">
                <h1 className="font-bold">Fuji Kaze</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400" />
              </div>
              <h1 className="text-[12px] mt-1 text-gray-500">@fujikaze</h1>
            </div>
          </div>

          <button
            className="w-20 h-8 text-sm font-bold text-black bg-white rounded-3xl"
          >
            Follow
          </button>
        </div>
        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              className="object-cover rounded-full w-11 h-11"
              src="/assets/pfp.png"
            />
            <div>
              <div className="flex space-x-1">
                <h1 className="font-bold">Elon Musk</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400" />
              </div>
              <h1 className="text-[12px] mt-1 text-gray-500">@elonmusk</h1>
            </div>
          </div>

          <button
            className="w-20 h-8 text-sm font-bold text-black bg-white rounded-3xl"
          >
            Follow
          </button>
        </div>
        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              className="object-cover rounded-full w-11 h-11"
              src="/assets/bragg.png"
            />
            <div>
              <div className="flex space-x-1">
                <h1 className="font-bold">Kento Yamazaki</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400" />
              </div>
              <h1 className="text-[12px] mt-1 text-gray-500">@kentoyamazaki29</h1>
            </div>
          </div>

          <button
            className="w-20 h-8 text-sm font-bold text-black bg-white rounded-3xl"
          >
            Follow
          </button>
        </div>

        
      
      </div>


    </div>
  );
}