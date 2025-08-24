
const AddBlogForm = ({title,author,url,handleBlogFormChange,handleBlogSubmit})=>{
    return(
        <div>
            <form onSubmit={handleBlogSubmit}>
                <label htmlFor="title">Title</label>;
                <br/>
                <input type="text" name="title" value={title} onChange={(e)=>handleBlogFormChange(e)}/>
                <br/>
                <label htmlFor="author">Author</label>;
                <br/>
                <input type="text" name="author" value={author} onChange={(e)=>handleBlogFormChange(e)}/>
                <br/>
                <label htmlFor="url">URL</label>;
                <br/>
                <input type="text" name="url" value={url} onChange={(e)=>handleBlogFormChange(e)}/>
                <br/>
                <input type="submit" value={"submit"}/>
            </form>
        </div>
    )
}

export default AddBlogForm;