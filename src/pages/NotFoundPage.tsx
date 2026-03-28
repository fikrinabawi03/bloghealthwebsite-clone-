import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
            <p className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</p>
            <p className="text-gray-500 max-w-md mb-8">
                The page you are looking for doesn't exist or has been moved. 
                If you just signed in, please try returning to the home page.
            </p>
            <Link 
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition duration-300"
            >
                Return to Home
            </Link>
        </div>
    );
};
