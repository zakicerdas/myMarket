import { useTheme } from "../context/themeContext";
import { useAuth } from "../context/AuthContext";

function Home(){
  const { state: themeState } = useTheme();
  const { isAuthenticated, username } = useAuth();
     const ppUrl = 'https://genshinlab.com/wp-content/uploads/Miyabi.png'; 
  const quote = "I will sacrifice myself to save the world. — Kiana Kaslana";

  return (
    <div className={themeState.mode === "dark" ? "min-h-screen bg-gray-800 text-white shadow p-8 flex flex-col items-center gap-6 transition" : "bg-white text-gray-900  shadow p-8 flex flex-col items-center gap-6 transition"}>
        <h1 className='text-center mt-5 text-2xl font-semibold'>contoh router apikasi</h1>
      <img
        src={ppUrl}
        alt="Profile"
        className="w-40 h-40 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
      />

      <div className="text-center">
          {isAuthenticated ? (
        <p className="text-xl">
        <span className="font-semibold">{username}</span>
        </p>
      ) : (
        <p className="text-lg">Guest</p>
      )}
        <p className="mt-3 text-slate-600 max-w-lg">{quote}</p>
      </div>
    </div>
  );

}

export default Home;