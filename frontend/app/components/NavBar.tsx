import Link from "next/link";


const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-xl font-bold">🖋️ Image Signer</h1>
                </Link>
                <div className="flex space-x-6">
                    <Link href="/" className="hover:text-gray-300 transition">Sign Image</Link>
                    <Link href="/retrieve" className="hover:text-gray-300 transition">Retrieve Image</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;