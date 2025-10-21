import { useTheme } from "../context/themeContext";

function Contact(){
    const { state: themeState } = useTheme();

    return (
        <div className={themeState.mode === "dark" ? "bg-gray-800 min-h-screen flex items-center justify-center p-4 transition" : "bg-white min-h-screen flex items-center justify-center p-4 transition"}>
<div className={themeState.mode === "dark" ? "w-full max-w-md bg-gray-700 text-white rounded-2xl shadow-lg p-6 text-center" : "w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-6 text-center"}>
<h1 className="text-2xl font-semibold mb-2">Contact Us</h1>
<p className="text-sm text-gray-500 mb-6">Butuh bantuan atau mau ngobrol sama kami? Hubungi lewat kontak di bawah ini ya</p>


<div className="space-y-4 text-left">
<div className="p-3 rounded-lg border border-gray-200 hover:shadow-md transition">
<h2 className="text-sm font-medium">Instagram</h2>
<a
href="https://www.instagram.com/zakk.torr?igsh=MTFzczBucnpucm85Mg=="
target="_blank"
rel="noopener noreferrer"
className="text-indigo-600 hover:underline"
>
@zakk.torr
</a>
</div>


<div className="p-3 rounded-lg border border-gray-200 hover:shadow-md transition">
<h2 className="text-sm font-medium">📞 Nomor Telepon</h2>
<a href="tel:+6281234567890" className="text-indigo-600 hover:underline">
+62 895-3241-20911
</a>
</div>


<div className="p-3 rounded-lg border border-gray-200 hover:shadow-md transition">
<h2 className="text-sm font-medium">✉️ Email</h2>
<a href="zakitoriq1@gmail.com" className="text-indigo-600 hover:underline">
zakitoriq1@gmail.com
</a>
</div>
</div>


<p className="text-xs text-gray-400 mt-6">Kami akan membalas secepat mungkin, jadi sabar ya</p>
</div>
</div>
    )
}

export default Contact;