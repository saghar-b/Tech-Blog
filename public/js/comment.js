

const newCommentFormHandler = async (event) => {
  event.preventDefault();


  
  const content = document.querySelector('#commentBody').value.trim();
  const postID = document.querySelector('#postId').value;
  console.log(postID)
  if (content) {
    
    const response = await fetch('/api/users/post/comment', {
      method: 'POST',
      body: JSON.stringify({content,postID }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(content +""+postID)
      document.location.replace('/post/'+postID);

    } else {

      
      alert('Failed to log in');
    }
  }
};

document.querySelector('#commentBtn').addEventListener('click', newCommentFormHandler);
