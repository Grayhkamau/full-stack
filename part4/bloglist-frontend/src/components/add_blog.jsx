
const AddBlogForm = ({title,author,url,handleBlogFormChange,handleBlogSubmit})=>{
    return(
        <div>
            <form onSubmit={handleBlogSubmit}>
                <label htmlFor="title">Title</label>;
                <input type="text" name="title" value={title} onChange={(e)=>handleBlogFormChange(e)}/>
                <label htmlFor="author">Author</label>;
                <input type="text" name="author" value={author} onChange={(e)=>handleBlogFormChange(e)}/>
                <label htmlFor="url">URL</label>;
                <input type="text" name="url" value={url} onChange={(e)=>handleBlogFormChange(e)}/>
                <input type="submit" value={"submit"}/>
            </form>
        </div>
    )
}

export default AddBlogForm;