

const deletePost = async (id) => {    
    const response = await fetch(`/api/users/dashboard/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
      });

    if (response.ok) {
      document.location.replace('/dashboard');

    } else {

      
      alert('Failed to delete');
    }
  
};
module.exports = deletePost;
