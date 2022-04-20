import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Owner } from './owner';
import { selectSearchOwners } from '../../../features/search/searchSlide';

export function OwnerList() {
    const owners = useSelector(selectSearchOwners);
    const [sortSelected, setSortSelected] = useState({
        label: 'Default',
        value: null
    });
    const [sortDropdown, setSortDropdown] = useState(false);

    const sortOptions = [
        {
            label: 'Most stars',
            value: 'stars'
        },
        {
            label: 'Most popular',
            value: 'forks'
        },
        {
            label: 'Most popular original work',
            value: 'original'
        }
    ]

    const handleSortSelect = (sortValue) => {
        setSortSelected(sortValue);
        setSortDropdown(false);
    }

    const renderSortOption = () => {
        return (
            <div className='sort-dropdown--options border-2 border-gray-400 w-max mt-2 absolute bg-white'>
                {sortOptions.map((option, index) => (
                    <div className='sort-dropdown--options-item px-2 py-1 hover:bg-cyan-600 cursor-pointer hover:text-white'
                        key={index}
                        onClick={() => { handleSortSelect(option) }}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className='owner'>
            <div className='sort-dropdown relative'>
                <div className='sort-dropdown--header border-2 border-gray-400 p-2 w-max cursor-pointer'
                    onClick={() => setSortDropdown(!sortDropdown)}
                >
                    Sortby: {sortSelected.label ? sortSelected.label : ''}
                </div>
                {sortDropdown && renderSortOption()}
            </div>
            <div className='owner--list mt-10 grid gap-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-20'>
                {owners?.length > 0 && owners.map((item, index) => {
                    return (
                        <Owner owner={{ username: item }} key={index} sortSelected={sortSelected} />
                    )
                })}
            </div>
        </div>
    );
}

export default OwnerList;
