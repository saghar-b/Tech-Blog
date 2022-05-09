

const editPostFormHandler = async (event) => {
  event.preventDefault();


  const title = document.querySelector('#title-post').value;
  const content = document.querySelector('#content-post').value;
  const postId = document.querySelector('#id-post').value;

  
    
    const response = await fetch(`/api/users/dashboard/update/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content,
        postId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');

    } else {

      
      alert('Failed to update');
    }
  // }
};
document.querySelector('#updatePost').addEventListener('click', editPostFormHandler);