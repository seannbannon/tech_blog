async function editPost(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  const title = document.querySelector('#title').value;
  const body = document.querySelector('#content').value;

    const response = await fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          title,
          body,
      }),
      headers: {
          'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert(response.statusText);
    }
}


document.querySelector('.edit-post-btn').addEventListener('click', editPost);