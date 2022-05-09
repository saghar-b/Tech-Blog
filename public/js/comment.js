

const newCommentFormHandler = async (event) => {
  event.preventDefault();


  
  const content = document.querySelector('#commentBody').value.trim();
  const postID = document.querySelector('#postId').value;
 
  if (content) {
    
    const response = await fetch('/api/users/post/comment', {
      method: 'POST',
      body: JSON.stringify({content,postID }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      
      document.location.replace('/post/'+postID);

    } else {

      
      alert('Failed to add comment');
    }
  }
};

document.querySelector('#commentBtn').addEventListener('click', newCommentFormHandler);
