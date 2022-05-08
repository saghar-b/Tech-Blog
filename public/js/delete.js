

const deletePost = async (id) => {
  // event.preventDefault();



    
    const response = await fetch(`/api/users/dashboard/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
      });

    if (response.ok) {
      // console.log(content +""+postID)
      document.location.replace('/dashboard');

    } else {

      
      alert('Failed to log in');
    }
  
};
module.exports = deletePost;
// document.querySelector('#commentBtn').addEventListener('click', newCommentFormHandler);
