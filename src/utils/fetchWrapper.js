// fetchWrapper.js
const loggeddata = JSON.parse(localStorage.getItem("userlogged"));
const token = loggeddata?.token;

const fetchWrapper = async (url, options = {}) => {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, finalOptions);

    // Handle HTTP errors
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    // Assume the response is JSON
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw to handle in the calling function
  }
};

export default fetchWrapper;
