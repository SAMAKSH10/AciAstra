// Function to edit data
export const editData = async (id, updatedData) => {
    try {
      const res = await fetch((import.meta.env.VITE_COURSE_EDIT_URL+`/${id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Pass the updated data to edit the course
      });
  
      if (!res.ok) {
        throw new Error(`Failed to edit data: ${res.status} ${res.statusText}`);
      }
  
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Error in editing the data:', err.message);
      return undefined;
    }
  };
  
  // Function to delete data
  export const deleteData = async (id) => {
    try {
      const res = await fetch((import.meta.env.VITE_COURSE_DELETE_URL+`/${id}`), {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        throw new Error(`Failed to delete data: ${res.status} ${res.statusText}`);
      }
  
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Error in deleting the data:', err.message);
      return undefined;
    }
  };
  // Function to edit a blog
export const editBlog = async (id, updatedData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BLOG_EDIT_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData), // Pass the updated blog data
    });

    if (!res.ok) {
      throw new Error(`Failed to edit blog: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error in editing the blog:', err.message);
    return undefined;
  }
};

// Function to delete a blog
export const deleteBlog = async (id) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BLOG_DELETE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Failed to delete blog: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error in deleting the blog:', err.message);
    return undefined;
  }
};
