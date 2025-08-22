
const AddBlogForm = ({title,author,URL,handleBlogFormChange,handleBlogSubmit})=>{
    return(
        <div>
            <form onSubmit={handleBlogSubmit}>
                <label for="title">Title</label>;
                <input type="text" name="title" value={title} onChange={(e)=>handleBlogFormChange(e)}/>
                <label for="author">Author</label>;
                <input type="text" name="author" value={author} onChange={(e)=>handleBlogFormChange(e)}/>
                <label for="url">URL</label>;
                <input type="text" name="url" value={URL} onChange={(e)=>handleBlogFormChange(e)}/>
                <input type="submit">Submit</input>
            </form>
        </div>
    )
}

export default AddBlogForm;