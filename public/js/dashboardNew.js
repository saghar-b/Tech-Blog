

const newPostFormHandler = async (event) => {
  event.preventDefault();


  const title = document.querySelector('#title-post').value.trim();
  const content = document.querySelector('#content-post').value.trim();

  if (title && content) {
    
    const response = await fetch('/api/users/dashboard/new', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');

    } else {

      
      alert('Failed to add new post');
    }
  }
};

document
  .querySelector('.post-form')
  .addEventListener('submit', newPostFormHandler);
