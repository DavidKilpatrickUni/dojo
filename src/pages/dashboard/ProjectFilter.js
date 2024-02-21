import React from 'react'


const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']



export default function ProjectFilter({ currentFilter, changeFilter }) {



    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }


    return (
        <div className='project-filter'>
            <nav>
                <p>Filter By:</p>
                {filterList.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => handleClick(filter)}
                        className={filter === currentFilter ? 'active' : ''}
                    >
                        {filter}
                    </button>
                ))}
            </nav>
        </div>
    )
}
