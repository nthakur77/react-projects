
function Card({image, username="rotdu", id, about}) {
  return (
    <>
    <div className="relative w-full max-w-sm h-[420px] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer m-4">
        
        <img 
            src={image}
            alt="Profile Background" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-500">
            
            <div className="flex items-center gap-3 mb-3">
                <img 
                    src={image}
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <div>
                    <h2 className="text-2xl font-bold tracking-wide">{username}</h2>
                    <p className="text-xs text-gray-300 font-medium tracking-wider uppercase">{id}</p>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-sm text-gray-200 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                    {about}
                </p>
            </div>

            <div className="mt-5 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <button className="flex-1 bg-white text-black py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                    Follow
                </button>
                <button className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                    Message
                </button>
            </div>
            
        </div>
    </div>
    </>
  );
}

export default Card;

