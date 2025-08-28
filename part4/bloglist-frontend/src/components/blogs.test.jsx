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

   
})