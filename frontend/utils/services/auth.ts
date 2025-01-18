// Function to check call the backend to check if the user is authenticated, this could probably be moved to server side rendering
export const checkAuth = async () => {
  // Check with backend if the cookie payload is valid
  const res = await fetch("/api/auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });
  // Check the response
  const data = await res.json();
  // Set logged in status based on response 
  return data.loggedIn
};