



export default function LandingUi(){
 
  
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
     
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/bgvid.mp4" type="video/mp4" />
      </video>

       <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="lg:text-8xl sm:text-2xl font-bold text-gray-300">Welcome to My Music App</h1>
      </div>

     </div>
  );
}
