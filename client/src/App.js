
function App() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    let myheaders = new Headers();
    myheaders.append('Content-Type', 'application/json')
    try {
    let res = await fetch('/api/book', {
      method: "POST",
      headers: myheaders,
      body: JSON.stringify({
        name: e.target.elements.name.value,
        author: e.target.elements.author.value,
        pages: e.target.elements.pages.value
      })
    });
  let resJson = await res.json();
  if (res.status === 200) {
    console.log(resJson);
  }
  } catch (err) {
    console.log(err);
  }
  };

  return (
    <div>
      <h1> books </h1>
      <form id="form" onSubmit={handleSubmit}>
        Name: <input type="text" name="name" id="name"></input>
        Author <input type="text" name="author" id="author"></input>
        Pages <input type="number" name="pages" id="pages"></input>
        <button type="submit" id="submit"> Submit </button>
      </form>
    </div>
  );
}

export default App;
