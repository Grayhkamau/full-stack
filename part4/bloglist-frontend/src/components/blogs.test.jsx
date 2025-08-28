import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import AddBlogForm from './add_blog';

const blog = {
            title:'react testing',
            author:'doe',
            url:'https://fullstackopen.com/en/part5/testing_react_apps#tests-for-the-togglable-component',
            likes:10,
            creator:'jdjdajdi29322j'
}
describe('blogs', ()=>{

    test('blog renders only title and author at first', ()=>{
       
        let {container} = render(<Blog blog={blog}/>)
        
        let author = screen.getByText('doe');
        let title = screen.getByText('react testing');

        expect(author).toBeDefined();
        expect(title).toBeDefined();

        let likes = container.querySelector('#likes');
        let url = container.querySelector('#url');

        expect(likes).toBeNull();
        expect(url).toBeNull()
    })

    test('likes and url are shown when button is clicked', async()=>{

        const user = userEvent.setup();

        let {container} = render(<Blog blog={blog} user={{_id:'hdshdshds'}}/>)

        let showBtn = screen.getByText('view');

        await user.click(showBtn);

        let likes = container.querySelector('#likes');
        let url = container.querySelector('#url');

        expect(likes).toBeDefined()
        expect(url).toBeDefined()
    })

    test('likes functions is called when button is clicked', async()=>{
        const user = userEvent.setup();

        const blog = {
            title:'react testing',
            author:'doe',
            url:'https://fullstackopen.com/en/part5/testing_react_apps#tests-for-the-togglable-component',
            likes:10,
            creator:'jdjdajdi29322j'
        }
        let mockFunc = vi.fn();

        render(<Blog blog={blog} handleUpdateLike={mockFunc} user={{_id:'hdshdshds'}}/>);

        let showBtn = screen.getByText("view");

        await user.click(showBtn);

        let likeBtn = screen.getByText('like');

        console.log('this is a like button->', likeBtn);

        await user.click(likeBtn)
        await user.click(likeBtn)

        expect(mockFunc.mock.calls).toHaveLength(2);
    })


    test('adding a blog handler is called with called arguments', async()=>{
        const user = userEvent.setup();

        const mockFunc = vi.fn();

        render(<AddBlogForm submitBlog={mockFunc} />);

        let author = screen.getByPlaceholderText('author');
        let title = screen.getByPlaceholderText('title');
        let url = screen.getByPlaceholderText('url');
        let submitBtn =  screen.getByText('submit')

        
        await user.type(title,'react testing');
        await user.type(author,'doe');
        await user.type(url,'https://fullstackopen.com/en/part5/testing_react_apps#tests-for-the-togglable-component');

        await user.click(submitBtn);
        console.log(author)

        console.log('this is the object->', mockFunc.mock.calls[0][0])
        expect(mockFunc.mock.calls).toHaveLength(1);
        expect(mockFunc.mock.calls[0][0]).toMatchObject(
            {author:'doe',title:'react testing', url:'https://fullstackopen.com/en/part5/testing_react_apps#tests-for-the-togglable-component'}
        )
    })
})