import CreatePost from "./components/Mutation/CreatePost";

const createPost = async (newPost) => {
  try {
    const response = await axios(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      body: JSON.stringify(),
      headers: {
        "content-type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

function App() {
  return (
    <>
      <h1>Mutation</h1>
      <CreatePost />
    </>
  );
}

export default App;
