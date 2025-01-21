import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="flex m-6 justify-center">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-black text-2xl font-bold mb-4 text-center">Login</h2>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input id="email" name="email" type="email" required className="text-black mt-1 mb-4 p-2 w-full border border-gray-300 rounded-md" />
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
        <input id="password" name="password" type="password" required className="text-black mt-1 mb-4 p-2 w-full border border-gray-300 rounded-md" />
        <button type="submit" formAction={login} className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Log in</button>
      </form>
    </div>
  );
}
