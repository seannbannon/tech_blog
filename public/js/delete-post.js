async function deletePost(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  if (window.confirm("Are you sure you want to delete this post?")) {
      const response = await fetch(`/api/post/${id}`, {
          method: 'DELETE',
          body: JSON.stringify({ id }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          alert("Deleted post.")
          document.location.replace('/dashboard');
      } else {
          alert(response.statusText);
      }
  }
  else {
      document.location.reload();
  }
};


document
  .querySelector('.del-post-btn')
  .addEventListener('click', deletePost);