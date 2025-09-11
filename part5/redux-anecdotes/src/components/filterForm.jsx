import { useDispatch } from "react-redux";
import { filterCreator } from "../reducers/filterReducer";

const FilterForm = ()=>{
    const dispatch = useDispatch()
    const filter = (e)=>{
        e.preventDefault();
        dispatch(filterCreator(e.target.filter.value));
        e.target.filter.value = '';
    }

    return(
        <div>
            <form onSubmit={filter}>
                <input type="text" name="filter"/>
                <button>filter</button>
            </form>
        </div>
    )
}
export default FilterForm