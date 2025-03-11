export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-gray-800">Hello, Tailwind CSS!</h1>
                <p className="text-gray-600 mt-2">Welcome to your Next.js project.</p>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                    Click Me
                </button>
            </div>
        </div>
    );
}
